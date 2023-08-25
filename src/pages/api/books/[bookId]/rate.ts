import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { buildNextAuthOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )

  if (!session) return res.status(401).end();

  try {
    const userId = String(session?.user?.id)
    const bookId = String(req.query.bookId)

    const bodySchema = z.object({
      reviewText: z.string().max(450),
      currentRate: z.number().min(1).max(5),
    })
    const { reviewText, currentRate } = bodySchema.parse(req.body)

    const userAlreadyRated = await prisma.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      }
    })

    if (userAlreadyRated) {
      return res.status(400).json({
        error: "You already rated this book",
      })
    }

    await prisma.rating.create({
      data: {
        book_id: bookId,
        user_id: userId,
        description: reviewText,
        rate: currentRate
      }
    })

    return res.status(201).end()

  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }

}
