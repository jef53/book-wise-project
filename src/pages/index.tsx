import { DefaultLayout } from "@/layouts/DefaultLayout"
import { signOut, useSession } from "next-auth/react"
import { NextPageWithLayout } from "./_app"
import styles from "../styles/Home.module.scss"
import { LatestRatings, RatingWithAuthorAndBook } from "@/components/LatestRatings"
import { PopularBooks } from "@/components/PopularBooks"
import { LastReading } from "@/components/LastReading"
import { PageTitle } from "@/components/PageTitle"
import { ChartLineUp } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"




const HomePage: NextPageWithLayout = () => {
  const { data, status } = useSession();

  const { data: last } = useQuery<RatingWithAuthorAndBook>(["last-reading"], async () => {
    const { data } = await api.get("/ratings/reading-latest");
    return data.rating ?? null;
  })

  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <PageTitle icon={<ChartLineUp />} title="Início" />
        {last && <LastReading last={last} />}
        <LatestRatings />
      </div>

      <PopularBooks />
    </div>
  )
}

HomePage.getLayout = (page) => {
  return (
    <div>
      <DefaultLayout title="Início">
        {page}
      </DefaultLayout>
    </div >
  )
}

export default HomePage;