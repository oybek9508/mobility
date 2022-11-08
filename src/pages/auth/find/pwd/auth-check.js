import FindPwdByAuthEmail from "src/components/auth/find/FindPwdByAuthEmail";
import Layout from "src/components/Layout";
import { Container, Box } from "@mui/material";

// 비밀번호 찾기 - 이메일 인증번호 전송, 인증번호 입력 페이지
const AuthCheck = () => {
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
          <FindPwdByAuthEmail />
        </Box>
      </Container>
    </Layout>
  );
};

export default AuthCheck;
