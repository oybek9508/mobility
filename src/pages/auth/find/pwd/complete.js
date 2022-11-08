import Layout from "src/components/Layout";
import { Container, Box } from "@mui/material";
// import FindPwdPassComplete from "src/components/nft-auth/find/FindPwdPassComplete";
import FindPwdByAuthEmailComplete from "src/components/auth/find/FindPwdByAuthEmailComplete";

const NftFindPwdComplete = () => {
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
          {/* <FindPwdPassComplete /> */}
          <FindPwdByAuthEmailComplete />
        </Box>
      </Container>
    </Layout>
  );
};

export default NftFindPwdComplete;
