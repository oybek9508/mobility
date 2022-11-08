import Layout from "src/components/Layout";
import FindIdPassComplete from "src/components/auth/find/FindIdPassComplete";
import FindIdByEmailComplete from "src/components/auth/find/FindIdByEmailComplete";
import { Container, Box } from "@mui/material";

const NftFindIdPassComplete = () => {
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
          {/* <FindIdPassComplete /> */}
          <FindIdByEmailComplete />
        </Box>
      </Container>
    </Layout>
  );
};

export default NftFindIdPassComplete;
