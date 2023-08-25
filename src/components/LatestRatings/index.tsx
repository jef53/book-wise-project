import { useQuery } from "@tanstack/react-query"
import { RatingCard } from "../RatingCard"
import styles from './styles.module.scss'
import { Book, Rating, User } from "@prisma/client";
import { api } from "@/lib/axios";
import { Spinner } from "../Spinner";

export type RatingWithAuthorAndBook = Rating & {
  user: User,
  book: Book,
}

export const LatestRatings = () => {

  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(["latest-ratings"], async () => {
    const { data } = await api.get("/ratings/latest");
    return data.ratings ?? [];
  })

  return (
    <div className={styles.main}>
      <h1>Avaliações mais recentes</h1>
      <div>
        {!ratings && <Spinner />}
        {ratings?.map(rating => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  )
}