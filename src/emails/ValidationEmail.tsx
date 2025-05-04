import { Html, Text, Head } from '@react-email/components';

interface ValidationEmailProps {
  companyName: string;
  token: string;
}

export default function ValidationEmail({ companyName, token }: ValidationEmailProps) {
  const validationUrl = `https://dashboard.jethire.pt/signup/`;

  return (
    <Html>
      <Head />
      <Text>Olá,</Text>
      <Text>
        A sua empresa <strong>{companyName}</strong> foi validada com sucesso!
      </Text>
      <Text>
        Aqui está o seu token de acesso: <strong>{token}</strong>
      </Text>
      <Text>
        Pode utilizar este token para terminar o registo da sua empresa clicando no link abaixo:
      </Text>
      <Text>
        Utilize o seguinte link:
        <br />
        {validationUrl}
      </Text>
      <Text>Obrigado,<br />Equipa JetHire</Text>
    </Html>
  );
}
