
import { useToggleShowMore } from "@/hooks/useToggleShowMore";
import { getRelativeTimeString } from "@/utils/getRelativeTimeString";
import { Rating } from "@prisma/client"
import { RatingWithAuthorAndBook } from "../LatestRatings";
import { RatingStars } from "../RatingStars";
import styles from "./styles.module.scss"

interface RatingProps {
  rating: RatingWithAuthorAndBook;
}

const MAX_LENGTH = 100;

export const RatingCard = ({ rating }: RatingProps) => {

  const { toggleShowMore, showMore: isShowingMore, text: summaryText } = useToggleShowMore(rating.book.summary, MAX_LENGTH);
  const time = getRelativeTimeString(new Date(rating.created_at), "pt-BR")

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div ><img src={rating.user.avatar_url!} alt="avatar" /></div>
          <div className={styles.nameAndDate}>
            <h2>{rating.user.name}</h2>
            <h3>{time}</h3>
          </div>
        </div>
        <div className={styles.rightHeader}><RatingStars rating={rating.rate} /></div>


      </div>
      <div className={styles.bookMain}>
        <img src={rating.book.cover_url} alt="livro" />
        <div>
          <div className={styles.bookInfo}>
            <h5>{rating?.book.name}</h5>
            <h6>{rating.book.author}</h6>
            <p>
              {summaryText}
              {summaryText.length >= MAX_LENGTH && <button onClick={toggleShowMore}>
                {isShowingMore ? " Mostrar menos" : " Mostrar mais"}
              </button>}
            </p>
          </div>
          <p>

          </p>
        </div>
      </div>

    </div>
  )
}