import { BookWithAvgRating } from "@/pages/explore"
import { RatingStars } from "../RatingStars"
import styles from "./styles.module.scss"

interface BookProps {
  book: BookWithAvgRating,
}

export const BookCard = ({ book }: BookProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.bookMain}>
        <img src={book.cover_url} alt="livro2" />
        <div className={styles.bookInfo}>
          <h2>{book.name}</h2>
          <h3>{book.author}</h3>

          <div className={styles.rating}>
            <RatingStars rating={book.avgRating} />
          </div>
        </div>
      </div>
    </div>
  )
}