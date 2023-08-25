import { AuthButtons } from "@/components/AuthButtons";
import { Heading, Text } from "@/components/Typography";
import { LoginContainer, LogoSection, WelcomeSection } from "@/styles/pages/login";

export default function Login() {
  return (
    <LoginContainer>
      <LogoSection>
        <img src="/images/logo.svg" alt="Logo" />
      </LogoSection>

      <WelcomeSection>
        <Heading color={"gray-100"} size={"lg"}> Boas vindas! </Heading>
        <Text color={"gray-300"} size={"sm"}> Faça seu login ou acesse como visitante. </Text>

        <AuthButtons />
      </WelcomeSection>




    </LoginContainer>
  )
}