import { ReactNode, useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog'
import styles from './styles.module.scss'
import { X } from "@phosphor-icons/react";
import { RatingStars } from "../RatingStars";
import { Input } from "../Input";
import { RatingWithAuthor, UserRating } from "./UserRating";
import { WriteRating } from "./WriteRating";
import { useQuery } from "@tanstack/react-query";
import { BookWithAvgRating } from "@/pages/explore";
import { api } from "@/lib/axios";
import { CategoriesOnBooks, Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type BookDetails = BookWithAvgRating & {
  ratings: RatingWithAuthor[],
  categories: (CategoriesOnBooks & {
    category: Category
  })[],
}

type RatingsDialogProps = {
  bookId: string,
  children: ReactNode;
}

export const RatingsDialog = ({ children, bookId }: RatingsDialogProps) => {

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (open) {
      router.push(`/explore?book=${bookId}`)
    } else {
      router.push(`/explore`)
    }
    setOpen(open);
  }

  const { data: book } = useQuery<BookDetails>(["book", bookId], async () => {
    const { data } = await api.get(`/books/details/${bookId}`);
    return data.book ?? {};
  }, {
    enabled: open,
  })

  const categories = book?.categories.map(c => c.category.name).join(', ')
  const ratingLength = book?.ratings.length;
  const canRate = book?.ratings.every(r => r.user.id !== user?.id)
  const sortedRatingsByDate = book?.ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })
  const paramBookId = router.query.book as string;

  useEffect(() => {
    if (paramBookId === bookId) {
      setOpen(true)
    }
  }, [bookId, paramBookId])

  const handleRate = () => {
    if (!session) {
      return router.push('/login');
    }
    setShowForm(state => !state)
  }

  return (

    < Dialog.Root open={open} onOpenChange={onOpenChange} >
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal >
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content} >
          <Dialog.Close className={styles.Close} >
            <X size={24} />
          </Dialog.Close>

          <div className={styles.main}>
            <div className={styles.bookContainer}>
              <div className={styles.upperInfo}>
                <img src={book?.cover_url} alt={book?.name} className={styles.bookCover} />
                <div>
                  <h2>{book?.name}</h2>
                  <h3>{book?.author}</h3>
                  <RatingStars rating={book?.avgRating!} />
                  <h6>{ratingLength}{ratingLength! > 1 ? ' avaliações' : ' avaliação'}</h6>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.footerContainer}>
                  <img src="/images/icons/bookmark.svg" />
                  <div className={styles.footerContainerInfo}>
                    <h4>Categoria</h4>
                    <p>{categories}</p>
                  </div>
                </div>
                <div className={styles.footerContainer}>
                  <img src="/images/icons/pages.svg" />
                  <div className={styles.footerContainerInfo}>
                    <h4>Páginas</h4>
                    <p>{book?.total_pages}</p>
                  </div>
                </div>
              </div>
            </div>
            <div >
              <div className={styles.reviewSection}>
                <h6>Avaliações</h6>
                {canRate && <button onClick={handleRate} className={styles.reviewButton}>
                  Avaliar</button>}
              </div>
              <section>
                {showForm && <WriteRating bookId={book?.id} handleRateStatus={handleRate} canRate={canRate} />}

                {sortedRatingsByDate?.map(rating =>
                  <UserRating key={rating?.id} rating={rating}

                  />)}

              </section>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >


  )
}