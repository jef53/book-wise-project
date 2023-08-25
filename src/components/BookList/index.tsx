import { BookWithAvgRating } from '@/pages/explore'
import { Book } from '../Book'
import styles from './styles.module.scss'

export interface BooksProps {
  books: BookWithAvgRating[] | undefined,
}



export const BookList = ({ books }: BooksProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.bookBlock}>
        {books?.map(book => (
          <Book key={book.id} book={book} />
        ))


        }
      </div>


    </div>

  )
}