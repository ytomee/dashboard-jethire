import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface InviteEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
}

const baseUrl = "https://dashboard.jethire.pt";

export const InviteEmail = ({
  username,
  invitedByUsername,
  invitedByEmail,
  teamName,
  inviteLink,
}: InviteEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/images/logo/logo.png`}
                height="37"
                alt="Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Junte-se á <strong>{teamName}</strong> na <strong>Jet Hire</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) convidou-o para se juntar á equipa <strong>{teamName}</strong> na{' '}
              <strong>Jet Hire</strong>.
            </Text>
            <Section className="mt-[12px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >   
                Junte-se a nós
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copie e cole este link no URL do seu browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Este convite foi enviado para{' '}
              <span className="text-black">{username}</span>. Este convite foi enviado por{' '} 
              <span className="text-black">{invitedByEmail}</span>{' '}
              Se não estava á espera de receber este convite, pode ignorar este email. Se estiver preocupado 
              com a segurança da sua conta, por favor responda a este email para entrar em contacto connosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteEmail.PreviewProps = {
  username: 'alanturing',
  userImage: `${baseUrl}/static/vercel-user.png`,
  invitedByUsername: 'Alan',
  invitedByEmail: 'alan.turing@example.com',
  teamName: 'Enigma',
  teamImage: `${baseUrl}/static/vercel-team.png`,
  inviteLink: 'https://vercel.com',
  inviteFrom: '204.13.186.218',
} as InviteEmailProps;

export default InviteEmail;