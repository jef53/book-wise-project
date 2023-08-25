import { RatingStars } from '@/components/RatingStars'
import { api } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import styles from './styles.module.scss'

type WriteRatingProps = {
  handleRateStatus: () => void,
  bookId?: string,
  canRate: boolean | undefined,
}

export function WriteRating({ handleRateStatus, bookId, canRate }: WriteRatingProps) {
  const [reviewText, setReviewText] = useState('')
  const [currentRate, setCurrentRate] = useState(0)

  const { data: session } = useSession();

  const user = session?.user;

  const isDisabled = !reviewText.trim() || currentRate === 0 || !canRate;


  const { mutateAsync: handleRate } = useMutation(async () => {
    await api.post(`/books/${bookId}/rate`, {
      reviewText,
      currentRate
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["book", bookId])
      queryClient.invalidateQueries(['books'])
    }


  })

  async function handleSubmit() {
    if (isDisabled) return;
    await handleRate();
  }



  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsHeader}>
        <img src={user?.avatar_url} alt={user?.name} />
        <div>
          <h3>{user?.name}</h3>
          <h4>Hoje</h4>
        </div>
        <RatingStars rating={currentRate} className={styles.ratingStars} setRating={setCurrentRate} />
      </div>
      <div className={styles.writeYourReview}>
        <textarea placeholder="Escreva sua avaliação" className={styles.reviewInput} value={reviewText} onChange={(e) => { setReviewText(e.target.value) }} />
        <div className={styles.myReviewComment}>
          <button onClick={() => handleRateStatus()}><img src="images/icons/X.svg" alt="x" /></button>
          <button onClick={handleSubmit} disabled={isDisabled} ><img src="images/icons/check.svg" alt="check" /></button>
        </div>
      </div>
    </div>
  )
}