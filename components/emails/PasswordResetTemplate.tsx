import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface PasswordResetProps {
  firstName: string;
  lastName: string;
  passwordToken: string;
  email: string;
}

export const PasswordResetTemplate: React.FC<PasswordResetProps> = ({
  firstName,
  lastName,
  passwordToken,
  email,
}) => (
  <Html lang="en">
    <Head />
    <Preview>Reset Password Link</Preview>
    <Body>
      <Container style={container}>
        <Heading style={h1}>Hi {firstName + " " + lastName},</Heading>
        <Text style={{ ...text, marginBottom: "0", paddingBottom: "0" }}>
          This is your request to reset your password!
          <br />
          <br />
          Not to worry, just click the link below to reset your password for
          Data Dive Homes
          <br />
          <br />
        </Text>
        <Button
          href={`${process.env.NEXTAUTH_URL}auth/forgot-password/${passwordToken}/${email}`}
          style={{ color: "#9353d3", padding: "10px 20px" }}
        >
          Reset Password Link
        </Button>
        <Text
          style={{
            ...text,
            color: "#ababab",
            fontSize: "10px",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          This reset password request is from datadivehomes.com. The link is
          valid for 15 minutes only.
        </Text>
        <Text
          style={{
            ...text,
            color: "#ababab",
            fontSize: "10px",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          If you did not request a password change, please ignore this email.
        </Text>
        <Img
          src="https://datadivehomes.com/logo_color_transparent.png"
          width="38"
          height="52"
          alt="Data Dive Homes's Logo"
        />
        <Text style={footer}>
          <Link
            href="https://datadivehomes.com"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            datadivehomes.com
          </Link>
          , the smart all-in-one-solution
          <br />
          for analyzing your mls data.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetTemplate;

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  marginbottom: "30px",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};
