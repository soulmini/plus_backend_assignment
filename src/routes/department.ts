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
    res.status(500).json({ error: 'Error creating department' });
  }
});

// Get all departments
router.get('/getAll', async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany();
    res.status(200).json(departments);
  } catch (error) {
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
    res.status(500).json({ error: 'Error deleting department' });
  }
});

export default router;
