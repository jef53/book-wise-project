import { api } from '@/lib/axios'
import { BookWithAvgRating } from '@/pages/explore'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { RatingWithAuthorAndBook } from '../LatestRatings'
import { RatingStars } from '../RatingStars'
import styles from './styles.module.scss'

interface LastReadingProps {
  last?: RatingWithAuthorAndBook,
}

export const LastReading = ({ last }: LastReadingProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;




  const distance = last && getRelativeTimeString(new Date(last.created_at), 'pt-BR')


  return (

    <div className={styles.main}>
      <div className={styles.header}>
        <p>Sua última leitura</p>
        <Link className={styles.link} href={`/profile/${userId}`}> Ver todas </Link>
      </div>

      <div className={styles.bookMain}>

        <img className={styles.bookPic} src={last?.book.cover_url} alt="livro" />

        <div className={styles.inside}>
          <div className={styles.dateAndRating}>
            <h3>{distance}</h3>
            <div className={styles.rating}>
              {last && <RatingStars rating={last.rate} />}
            </div>
          </div>

          <div className={styles.bookInfo}>
            <h2>{last?.book.name}</h2>
            <h3>{last?.book.author}</h3>
            <p>
              {last?.book.summary}

            </p>
          </div>
        </div>
      </div>
    </div >
  )
}