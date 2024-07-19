
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// Create an employee
router.post('/create', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, departmentId, dateOfJoining, position, salary } = req.body;
  //console.log(req.body);
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfJoining: new Date(dateOfJoining),
        position,
        salary: parseFloat(salary),
        departmentId
      }
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

// Get all employees
router.get('/getAllData', async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

// Get a single employee by ID
router.get('/getData/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

// Update an employee by ID
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, departmentId, dateOfJoining, position, salary } = req.body;

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfJoining: new Date(dateOfJoining),
        position,
        salary: parseFloat(salary),
        departmentId
      }
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Delete an employee by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

export default router;
