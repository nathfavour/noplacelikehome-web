import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const passwords = await prisma.password.findMany();
        res.status(200).json(passwords);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch passwords' });
      }
      break;
    case 'POST':
      try {
        const { title, username, password, userId } = req.body;
        const newPassword = await prisma.password.create({
          data: {
            title,
            username,
            password,
            userId,
          },
        });
        res.status(201).json(newPassword);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create password' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
