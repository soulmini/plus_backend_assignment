import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';


router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
});

export default router;
