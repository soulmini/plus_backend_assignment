import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Create a department
router.post('/create', async (req: Request, res: Response) => {
  const { name, description, location } = req.body;

  try {
    const newDepartment = await prisma.department.create({
      data: {
        name,
        description,
        location,
      },
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating department' });
  }
});

// Get all departments with pagination, filtering, and sorting
router.get('/getAll', async (req: Request, res: Response) => {
  const {
    page = '1',
    pageSize = '10',
    sortBy = 'id',
    sortOrder = 'asc',
    name,
    location,
  } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const filters: any = {};

  if (name) filters.name = { contains: name as string };
  if (location) filters.location = { contains: location as string };

  try {
    const departments = await prisma.department.findMany({
      skip,
      take,
      where: filters,
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc',
      },
    });

    const totalDepartments = await prisma.department.count({ where: filters });

    res.status(200).json({
      data: departments,
      pagination: {
        total: totalDepartments,
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error fetching departments' });
  }
});

// Get a single department by ID
router.get('/get/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json(department);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error fetching department' });
  }
});

// Update a department by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, location } = req.body;

  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        location,
      },
    });

    res.status(200).json(updatedDepartment);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Error updating department' });
  }
});

// Delete a department by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.department.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Error deleting department' });
  }
});

export default router;
