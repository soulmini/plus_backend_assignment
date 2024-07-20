import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// Create an employee
router.post('/create', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, departmentId, dateOfJoining, position, salary } = req.body;

  // Validate input data
  if (!firstName || !lastName || !email || !phoneNumber || isNaN(Number(departmentId)) || !dateOfJoining || !position || isNaN(Number(salary))) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

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
        departmentId: parseInt(departmentId, 10)
      }
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});

// Get all employees with pagination, filtering, and sorting
router.get('/getAllData', async (req: Request, res: Response) => {
  const {
    page = '1',
    pageSize = '10',
    sortBy = 'id',
    sortOrder = 'asc',
    position,
    departmentId,
    dateOfJoining
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);
  // @ts-ignore
  if (isNaN(pageNumber) || isNaN(pageSizeNumber) || !['asc', 'desc'].includes(sortOrder)) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const skip = (pageNumber - 1) * pageSizeNumber;
  const take = pageSizeNumber;

  const filters: any = {};

  if (position) filters.position = position;
  if (departmentId) filters.departmentId = Number(departmentId);
  if (dateOfJoining) filters.dateOfJoining = new Date(dateOfJoining as string);

  try {
    const employees = await prisma.employee.findMany({
      skip,
      take,
      where: filters,
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc'
      }
    });

    const totalEmployees = await prisma.employee.count({ where: filters });

    res.status(200).json({
      data: employees,
      pagination: {
        total: totalEmployees,
        page: pageNumber,
        pageSize: pageSizeNumber
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// Get a single employee by ID
router.get('/getData/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id, 10) }
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

  if (isNaN(Number(id)) || !firstName || !lastName || !email || !phoneNumber || isNaN(Number(departmentId)) || !dateOfJoining || !position || isNaN(Number(salary))) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id, 10) },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfJoining: new Date(dateOfJoining),
        position,
        salary: parseFloat(salary),
        departmentId: parseInt(departmentId, 10)
      }
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    // @ts-ignore
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Delete an employee by ID
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    await prisma.employee.delete({
      where: { id: parseInt(id, 10) }
    });

    res.status(204).send();
  } catch (error) {
    // @ts-ignore
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

export default router;
