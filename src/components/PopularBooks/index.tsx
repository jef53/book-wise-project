import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { BookCard } from "../BookCard"
import styles from './styles.module.scss'
import { BookWithAvgRating } from "@/pages/explore";
import { useSession } from "next-auth/react";
import { useState } from "react";


export const PopularBooks = () => {
  const { data: session } = useSession();
  const [toggleSeeMore, setToggleSeeMore] = useState(false)

  const { data: popularBooks } = useQuery<BookWithAvgRating[]>(["popular-books"], async () => {
    const { data } = await api.get("/books/popular");
    return data?.books ?? [];
  })
  const limitedPopularBooks = toggleSeeMore ? popularBooks : popularBooks?.slice(0, 4);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Livros populares</h1>
        <p onClick={() => { setToggleSeeMore(state => !state) }}>{toggleSeeMore ? 'Ver menos' : 'Ver todos'} </p>
      </div>
      <div>

        {limitedPopularBooks?.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}