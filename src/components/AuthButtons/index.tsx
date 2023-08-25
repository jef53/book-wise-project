import { AuthButton, Container } from "./styles"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"

type AuthButtonsProps = {
  callbackUrl?: string,
}


export const AuthButtons = ({ callbackUrl = "/" }: AuthButtonsProps) => {
  const router = useRouter();

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      router.push(callbackUrl)
      return;
    }
    signIn(provider, {
      callbackUrl
    })
  }

  return (
    <Container>
      <AuthButton onClick={() => handleSignIn("google")}><img src="/images/icons/google.svg" alt="google" /> Entrar com Google</AuthButton>
      <AuthButton onClick={() => handleSignIn("github")}><img src="/images/icons/github.svg" alt="github" /> Entrar com Github</AuthButton>
      <AuthButton ><img src="/images/icons/rocket.svg" alt="visitante" /> Entrar como visitante</AuthButton>

    </Container>
  )
}