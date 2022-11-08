import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import Logo from "src/components/Logo";
import SignupAgreementForm from "src/components/auth/signup/SignupAgreementForm";
import SignupInfoForm from "src/components/auth/signup/SignupInfoForm";
import SignupCompleteMetaMask from "src/components/auth/signup/SignupCompleteMetaMask";
import SignupCompleteEnd from "src/components/auth/signup/SignupCompleteEnd";

const NftSignup = () => {
  const router = useRouter();
  const { target } = router.query;
  console.log("target", target);
  return (
    <Layout>
      <Container component="main" maxWidth="xs" sx={{ mb: 10 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Logo />
          {
            {
              agreement: <SignupAgreementForm />,
              userinfo: <SignupInfoForm />,
              metamask: <SignupCompleteMetaMask />,
              complete: <SignupCompleteEnd />,
            }[target]
          }
        </Box>
      </Container>
    </Layout>
  );
};

export default NftSignup;
