import { BookWithAvgRating } from "@/pages/explore"
import { RatingsDialog } from "../RatingsDialog"
import { RatingStars } from "../RatingStars"
import styles from "./styles.module.scss"

export interface BookProps {
  book: BookWithAvgRating,
}

export const Book = ({ book }: BookProps) => {
  return (
    <RatingsDialog bookId={book.id}>
      <div className={styles.main}>
        {book.alreadyRead && <div className={styles.read}>LIDO</div>}
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
    </RatingsDialog>
  )
}