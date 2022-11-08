import Layout from "src/components/Layout";
import { Container, Box } from "@mui/material";
// import FindPwdPass from "src/components/nft-auth/find/FindPwdPass";
import FindPwdByEmail from "src/components/auth/find/FindPwdByEmail";

const NftFindPwdPass = () => {
  return (
    <Layout>
      <Container component="main" maxWidth="xs" sx={{ mb: 10 }}>
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            borderRadius: 2,
            padding: 3,
          }}
        >
          {/* <FindPwdPass /> */}
          <FindPwdByEmail />
        </Box>
      </Container>
    </Layout>
  );
};

export default NftFindPwdPass;
