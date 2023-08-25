import { RatingWithAuthorAndBook } from "@/components/LatestRatings";
import { RatingStars } from "@/components/RatingStars"
import { getRelativeTimeString } from "@/utils/getRelativeTimeString";
import { Book, CategoriesOnBooks, Category, Rating } from "@prisma/client"
import styles from './styles.module.scss';

export type ProfileRating = Rating & {
  book: Book & {
    categories: CategoriesOnBooks & {
      category: Category
    }[],
  }
}

type ProfileRatingCardProps = {
  profile: ProfileRating,
}

export function ProfileRatingCard({ profile }: ProfileRatingCardProps) {
  const distanceDate = getRelativeTimeString(new Date(profile.book.created_at), "pt-BR");

  return (

    <>
      <h4 className={styles.reviewDate}>{distanceDate}</h4>
      <div className={styles.bookMain}>
        <div className={styles.upperSection}>
          <img src={profile.book.cover_url} alt="livro2" />
          <div className={styles.bookInfo}>
            <h2>{profile?.book.name}</h2>
            <h3>{profile?.book.author}</h3>

            <div className={styles.rating}>
              <RatingStars rating={profile.rate} />
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p>
            {profile?.book.summary}
          </p>
        </div>

      </div>
    </>
  )
}