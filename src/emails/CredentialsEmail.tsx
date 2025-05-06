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

interface CredentialsEmailProps {
  companyName: string;
  username: string;
  password: string;
}

const baseUrl = "https://dashboard.jethire.pt";

export const CredentialsEmail = ({ companyName, username, password }: CredentialsEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>A conta da empresa {companyName} foi criada com sucesso!</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/images/logo/logo.png`}
            width="120"
            height="36"
            alt="Jet Hire"
          />
        </Section>

        <Heading style={h1}>Bem-vindo à Jet Hire, {companyName}!</Heading>
        <Text style={heroText}>
          A sua empresa foi registada com sucesso na nossa plataforma. Pode agora aceder à sua conta com os seguintes dados:
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}><strong>Utilizador:</strong> {username}</Text>
          <Text style={confirmationCodeText}><strong>Palavra-passe:</strong> {password}</Text>
        </Section>

        <Section>
          <Text style={text}>
            Aceda à sua conta através do seguinte link:{' '}
            <Link style={inlineLink} href={`${baseUrl}/signin`}>
              {baseUrl}/signin
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
            ©2025 Jet Hire. Todos os direitos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

CredentialsEmail.PreviewProps = {
  companyName: 'Empresa Exemplo',
  username: 'empresaexemplo',
  password: 'senhaSegura123',
} as CredentialsEmailProps;

export default CredentialsEmail;

// Estilos
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
  fontSize: '28px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '36px',
};

const heroText = {
  fontSize: '18px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '20px 10px',
};

const confirmationCodeText = {
  fontSize: '18px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
  margin: '8px 0',
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