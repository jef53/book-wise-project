
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'
import { getMostFrequentString } from "@/utils/getMostFrequentString";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const userId = String(req.query.userId);

  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                }
              }
            }
          }
        },
        orderBy: {
          created_at: "desc",
        }
      }
    }

  })

  const readPages = profile?.ratings.reduce((acc, rating) => acc + rating.book.total_pages, 0)
  const ratedBooks = profile?.ratings.length;
  const arrayReadAuthors = profile?.ratings.map(authors => {
    let allAuthors = '';
    if (allAuthors.includes(authors.book.author)) return '';
    else return allAuthors = authors.book.author
  })

  const mostReadCategories = profile?.ratings.flatMap(c => c.book.categories.flatMap(c => c.category.name))
  const mostReadCategory = getMostFrequentString(mostReadCategories ?? []);




  const profileData = {
    ratings: profile?.ratings,
    readPages,
    ratedBooks,
    arrayReadAuthors,
    mostReadCategory,
    profile: {
      memberSince: profile?.created_at,
    }
  }
  return res.json({ profile: profileData })
}

