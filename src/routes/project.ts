import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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

// Get all projects
router.get('/getAll', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      // Include the related department and employees for each project
      include: { 
        department: true, 
        employeeProjects: { include: { employee: true } } 
      },
    });
    res.status(200).json(projects);
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
      // Include the related department and employees for the project
      include: { 
        department: true, 
        employeeProjects: { include: { employee: true } } 
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
        // Update the project's department connection
        department: {
          connect: { id: departmentId },
        },
        // Delete existing associations and create new ones
        employeeProjects: {
          deleteMany: {}, // Remove all current associations
          create: employeeIds.map((id: number) => ({ employeeId: id })), // Create new associations
        },
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
