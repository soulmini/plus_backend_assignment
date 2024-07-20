import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from './../middleware/authMiddleware';

const prisma = new PrismaClient();
const router = express.Router();

// Create a project
router.post('/create', async (req: Request, res: Response) => {
  const { name, description, startDate, endDate, departmentId, employeeIds } = req.body;

  try {
    // Check if all employee IDs exist
    const employees = await prisma.employee.findMany({
      where: {
        id: {
          in: employeeIds,
        },
      },
    });

    if (employees.length !== employeeIds.length) {
      return res.status(400).json({ error: 'One or more employee IDs do not exist' });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        department: {
          connect: { id: departmentId },
        },
        employeeProjects: {
          create: employeeIds.map((id: number) => ({ employeeId: id })),
        },
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Get all projects with pagination, sorting, and filtering
router.get('/getAll', async (req: Request, res: Response) => {
  const {
    page = '1',
    pageSize = '10',
    sortBy = 'id',
    sortOrder = 'asc',
    name,
    departmentId,
    startDate,
    endDate,
  } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const filters: any = {};

  // Apply filtering based on query parameters
  if (name) filters.name = { contains: name as string };
  if (departmentId) filters.departmentId = Number(departmentId);
  if (startDate) filters.startDate = { gte: new Date(startDate as string) };
  if (endDate) filters.endDate = { lte: new Date(endDate as string) };

  try {
    const projects = await prisma.project.findMany({
      skip,
      take,
      where: filters,
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc',
      },
      include: {
        department: true,
        employeeProjects: { include: { employee: true } },
      },
    });

    const totalProjects = await prisma.project.count({ where: filters });

    res.status(200).json({
      data: projects,
      pagination: {
        total: totalProjects,
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Get a single project by ID
router.get('/get/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        department: true,
        employeeProjects: { include: { employee: true } },
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// Update a project by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, departmentId, employeeIds } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        department: {
          connect: { id: departmentId },
        },
        employeeProjects: {
          deleteMany: {}, // Remove all current associations
          create: employeeIds.map((id: number) => ({ employeeId: id })), // Create new associations
        },
      },
      include: {
        department: true,
        employeeProjects: { include: { employee: true } },
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete a project by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

export default router;
