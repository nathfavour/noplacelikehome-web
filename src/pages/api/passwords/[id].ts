import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const password = await prisma.password.findUnique({
          where: { id: Number(id) },
        });
        if (!password) {
          return res.status(404).json({ error: 'Password not found' });
        }
        res.status(200).json(password);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch password' });
      }
      break;
    case 'PUT':
      try {
        const { title, username, password } = req.body;
        const updatedPassword = await prisma.password.update({
          where: { id: Number(id) },
          data: { title, username, password },
        });
        res.status(200).json(updatedPassword);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update password' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.password.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete password' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
