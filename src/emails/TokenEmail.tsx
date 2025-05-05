import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface TokenEmailProps {
  token?: string;
}

const baseUrl = "https://dashboard.jethire.pt";

export const TokenEmail = ({ token }: TokenEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>O seu token de acesso!</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/images/logo/logo.png`}
            width="120"
            height="36"
            alt="Jet Hire"
          />
        </Section>
        <Heading style={h1}>Aqui está o seu token!</Heading>
        <Text style={heroText}>
          A empresa que registou foi validada por um administrador. Utilize o seguinte token para a registar na nossa dashboard.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{token}</Text>
        </Section>

        <Section>
          <Text style={text}>
            Pode utilizar o token neste link:{' '}
            <Link style={inlineLink} href="https://dashboard.jethire.pt/signup/">
              https://dashboard.jethire.pt/signup/
            </Link>
          </Text>
        </Section>

        <Text style={text}>
          Se não tentou registar nenhuma empresa, pode ignorar este email ou contactar-nos para perceber o que aconteceu.
        </Text>

        <Section>
          <Link
            style={footerLink}
            href="https://jethire.pt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jet Hire
          </Link>
          <Text style={footerText}>
            ©2025 Jet Hire.
            Todos os direitos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

TokenEmail.PreviewProps = {
  token: 'DJZ-TLX',
} as TokenEmailProps;

export default TokenEmail;

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLink = {
  color: '#b7b7b7',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '0px 20px',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '40px 10px',
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};

const inlineLink = {
  fontSize: '14px',
  color: '#0a84ff',
  textDecoration: 'underline',
};