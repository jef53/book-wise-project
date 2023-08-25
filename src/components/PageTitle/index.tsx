import { ReactHTMLElement, ReactNode } from "react";
import styles from './styles.module.scss'

type PageTitleProps = {
  icon: ReactNode,
  title: string,
}

export const PageTitle = ({ title, icon, ...props }: PageTitleProps) => {
  return (
    <div className={styles.main} {...props}>
      <span>{icon}</span>
      <p>{title}</p>
    </div>
  )
}