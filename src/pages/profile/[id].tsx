import { DefaultLayout } from "@/layouts/DefaultLayout"
import { BookmarkSimple, BookOpen, Books, MagnifyingGlass, User, UserList } from "@phosphor-icons/react"
import { NextPageWithLayout } from "../_app"
import styles from '../../styles/pages/profile/styles.module.scss'
import { PageTitle } from "@/components/PageTitle"
import { Input } from "@/components/Input"
import { RatingStars } from "@/components/RatingStars"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { useRouter } from "next/router"
import { RatingWithAuthorAndBook } from "@/components/LatestRatings"
import { ProfileRating, ProfileRatingCard } from "@/components/ProfileRatingCard"
import { getRelativeTimeString } from "@/utils/getRelativeTimeString"

type profileProps = {
  ratings: ProfileRating[],
  readPages: number,
  ratedBooks: number,
  arrayReadAuthors: [],
  mostReadCategory: string,
  profile: {
    memberSince: Date,
  },
}



const ProfilePage: NextPageWithLayout = () => {
  const session = useSession();
  const router = useRouter();
  const userId = router.query.id as string;
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login')
    }
  }, [session])



  const { data: profile } = useQuery<profileProps>(["profile", userId], async () => {
    const { data } = await api.get(`/profile/${userId}`)
    return data?.profile ?? {};
  }, {
    enabled: !!userId,
  }
  )
  const distanceDate = profile && getRelativeTimeString(new Date(profile.profile.memberSince), 'pt-BR')
  const filteredRatings = profile?.ratings.filter(book => book?.book.name.toLowerCase().includes(search.toLowerCase()))

  return (


    <div className={styles.main}>
      <div className={styles.mainCenter}>
        <div className={styles.mainTitle}>
          <PageTitle title="Perfil" icon={<User />} />
        </div>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar livro avaliado" className={styles.inputSearchInProfile} icon={<MagnifyingGlass />} />

        {filteredRatings?.map(profile =>
          <ProfileRatingCard profile={profile} key={profile.book.id} />
        )}
      </div>

      <div className={styles.rightMain}>

        <img className={styles.profilePicture} src={session.data?.user.avatar_url} alt="profile" />
        <h1>{session.data?.user.name}</h1>
        <h2>{distanceDate}</h2>
        <img className={styles.rectangle} src="/images/rectangle15.png" alt="rectangle" />

        <div className={styles.infoContainer}>
          <BookOpen size={28} color={'#50B2C0'} />
          <div>
            <h5>{profile?.readPages || '0'}</h5>
            <h6>Páginas lidas</h6>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <Books size={28} color={'#50B2C0'} />
          <div>
            <h5>{profile?.ratedBooks || '0'}</h5>
            <h6>Livros avaliados</h6>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <UserList size={28} color={'#50B2C0'} />
          <div>
            <h5>{profile?.arrayReadAuthors.length || '0'}</h5>
            <h6>Autores lidos</h6>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <BookmarkSimple size={28} color={'#50B2C0'} />
          <div>
            <h5>{profile?.mostReadCategory || 'Nenhuma'}</h5>
            <h6>Categoria mais lida</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

ProfilePage.getLayout = (page) => {
  return (
    <div>
      <DefaultLayout title="Explorar">
        {page}
      </DefaultLayout>
    </div >
  )
}

export default ProfilePage;