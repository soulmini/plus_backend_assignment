import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();
import { authenticate } from './../middleware/authMiddleware';

// Create a timesheet
router.post('/create', async (req: Request, res: Response) => {
  const { employeeId, projectId, date, hoursWorked, description } = req.body;

  try {
    // Check if employee and project exist
    const employeeExists = await prisma.employee.findUnique({ where: { id: employeeId } });
    const projectExists = await prisma.project.findUnique({ where: { id: projectId } });

    if (!employeeExists || !projectExists) {
      return res.status(400).json({ error: 'Employee or Project does not exist' });
    }

    const newTimesheet = await prisma.timesheet.create({
      data: {
        employee: { connect: { id: employeeId } },
        project: { connect: { id: projectId } },
        date: new Date(date),
        hoursWorked,
        description,
      },
    });
    res.status(201).json(newTimesheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating timesheet' });
  }
});

// Get all timesheets with pagination, sorting, and filtering
router.get('/getAll', async (req: Request, res: Response) => {
  const {
    page = '1',
    pageSize = '10',
    sortBy = 'date',
    sortOrder = 'asc',
    employeeId,
    projectId,
    startDate,
    endDate,
    minHours,
    maxHours,
  } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const filters: any = {};

  // Apply filtering based on query parameters
  if (employeeId) filters.employeeId = Number(employeeId);
  if (projectId) filters.projectId = Number(projectId);
  if (startDate) filters.date = { gte: new Date(startDate as string) };
  if (endDate) filters.date = { ...filters.date, lte: new Date(endDate as string) };
  if (minHours) filters.hoursWorked = { gte: Number(minHours) };
  if (maxHours) filters.hoursWorked = { ...filters.hoursWorked, lte: Number(maxHours) };

  try {
    const timesheets = await prisma.timesheet.findMany({
      skip,
      take,
      where: filters,
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc',
      },
      include: { employee: true, project: true },
    });

    const totalTimesheets = await prisma.timesheet.count({ where: filters });

    res.status(200).json({
      data: timesheets,
      pagination: {
        total: totalTimesheets,
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching timesheets' });
  }
});

// Get a single timesheet by ID
router.get('/get/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const timesheet = await prisma.timesheet.findUnique({
      where: { id: parseInt(id) },
      include: { employee: true, project: true },
    });

    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    res.status(200).json(timesheet);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error fetching timesheet' });
  }
});

// Update a timesheet by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { employeeId, projectId, date, hoursWorked, description } = req.body;

  try {
    // Check if employee and project exist
    const employeeExists = await prisma.employee.findUnique({ where: { id: employeeId } });
    const projectExists = await prisma.project.findUnique({ where: { id: projectId } });

    if (!employeeExists || !projectExists) {
      return res.status(400).json({ error: 'Employee or Project does not exist' });
    }

    const updatedTimesheet = await prisma.timesheet.update({
      where: { id: parseInt(id) },
      data: {
        employee: { connect: { id: employeeId } },
        project: { connect: { id: projectId } },
        date: new Date(date),
        hoursWorked,
        description,
      },
    });

    res.status(200).json(updatedTimesheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating timesheet' });
  }
});

// Delete a timesheet by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.timesheet.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error deleting timesheet' });
  }
});

export default router;
