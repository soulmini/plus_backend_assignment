import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// Create a timesheet
router.post('/create', async (req: Request, res: Response) => {
  const { employeeId, projectId, date, hoursWorked, description } = req.body;

  try {
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

// Get all timesheets
router.get('/getAll', async (req: Request, res: Response) => {
  try {
    const timesheets = await prisma.timesheet.findMany({
      include: { employee: true, project: true },
    });
    res.status(200).json(timesheets);
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
    console.error(error);
    res.status(500).json({ error: 'Error fetching timesheet' });
  }
});

// Update a timesheet by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { employeeId, projectId, date, hoursWorked, description } = req.body;

  try {
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
    console.error(error);
    res.status(500).json({ error: 'Error deleting timesheet' });
  }
});

export default router;
