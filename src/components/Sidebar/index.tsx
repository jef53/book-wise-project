import { Binoculars, ChartLineUp, User } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link"
import { useRouter, } from "next/router"
import styles from "./styles.module.scss"


export const Sidebar = () => {
  const router = useRouter();


  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className={styles.Container}>
      <div className={styles.block}>
        <img src="/images/logo.svg" alt="logo" className={styles.logo} />
        <Link href='/' className={router.pathname === '/' ? styles.activeLink : ""}><ChartLineUp size={24} /><p>Início</p></Link>
        <Link href='/explore' className={router.pathname === '/explore' ? styles.activeLink : ""}> <Binoculars size={24} /><p>Explorar</p></Link>
        {session && <Link href={`/profile/${user?.id}`} className={router.pathname === '/profile/[id]' ? styles.activeLink : ""}><User size={24} /> Perfil</Link>}
      </div>

      {user ?
        (<div onClick={() => { signOut() }} className={styles.loginAndLogout}><img src={user?.avatar_url} referrerPolicy="no-referrer" />{user?.name}<img className={styles.sessionIcon} src='/images/sidebar/logout.svg' /></div>)
        : (<div onClick={() => { router.push('/login') }} className={styles.loginAndLogout}>Fazer login  <img src='/images/sidebar/login.svg' className={styles.sessionIcon} /></div>)}

    </div>
  )
}