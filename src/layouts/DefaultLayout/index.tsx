import { Sidebar } from "@/components/Sidebar"
import Head from "next/head"
import { ReactNode } from "react"
import { MainContainer, Content } from "./styles"


type DefaultLayoutProps = {
  children: ReactNode,
  title: string,
}


export const DefaultLayout = ({ children, title }: DefaultLayoutProps) => {
  return (
    <MainContainer>
      <Head>
        <title>{`${title} | BookWise`}</title>
      </Head>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </MainContainer>
  )
}