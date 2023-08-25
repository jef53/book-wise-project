import { RatingStars } from '@/components/RatingStars'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString';
import { Rating, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import styles from './styles.module.scss'

export type RatingWithAuthor = Rating & {
  user: User,
}

type UserRatingProps = {
  rating: RatingWithAuthor,
}



export function UserRating({ rating }: UserRatingProps) {

  const { data: session } = useSession();
  const distance = getRelativeTimeString(new Date(rating.created_at), "pt-BR")
  const user = session?.user;
  const isOwner = rating?.user.id === user?.id;
  return (
    <div className={`${styles.reviews} ${isOwner ? styles.highlight : ''}`}>
      <div className={styles.reviewsHeader}>
        <img src={rating.user?.avatar_url!} alt={rating.user.name} />
        <div>
          <h3>{rating.user.name}</h3>
          <h4>{distance}</h4>
        </div>
        <RatingStars rating={rating.rate} className={styles.ratingStars} />
      </div>
      <p >
        {rating.description}
      </p>

    </div>
  )
}