import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  confirmUrl: string;
}

export default function ConfirmationEmail({ confirmUrl }: Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Confirma tu email para reservar tu plaza en Quest Club</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Casi dentro.</Heading>
          <Text style={text}>
            Confirma tu email para reservar tu plaza en la lista de espera de
            Quest Club. Cuando lancemos el Pack Verano (1 jul 2026) te llega el
            código gratis al email.
          </Text>
          <Button href={confirmUrl} style={button}>
            Confirmar email
          </Button>
          <Text style={smallText}>
            O copia este enlace en tu navegador:
            <br />
            <a href={confirmUrl} style={link}>
              {confirmUrl}
            </a>
          </Text>
          <Text style={footer}>
            Si no fuiste tú, ignora este email. El enlace caduca en 24 horas.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0a",
  color: "#fafafa",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const container = {
  padding: "40px 24px",
  maxWidth: "560px",
  margin: "0 auto",
};

const h1 = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#fafafa",
  margin: "0 0 24px 0",
  letterSpacing: "-0.02em",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#a3a3a3",
  margin: "0 0 24px 0",
};

const button = {
  backgroundColor: "#84cc16",
  color: "#0a0a0a",
  fontWeight: 700,
  fontSize: "16px",
  padding: "14px 28px",
  borderRadius: "9999px",
  textDecoration: "none",
  display: "inline-block",
};

const smallText = {
  fontSize: "13px",
  color: "#a3a3a3",
  marginTop: "32px",
  lineHeight: "20px",
};

const link = {
  color: "#84cc16",
  wordBreak: "break-all" as const,
};

const footer = {
  fontSize: "13px",
  color: "#525252",
  marginTop: "40px",
  borderTop: "1px solid #262626",
  paddingTop: "24px",
};
