import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import FindIdByEmail from "src/components/auth/find/FindIdByEmail";
import Layout from "src/components/Layout";

const index = () => {
  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ mt: 12, mb: 12, bgColor: "#fff" }}
      >
        <Paper sx={{ my: 8, p: "64px 24px 24px" }}>
          <FindIdByEmail />
        </Paper>
      </Container>
    </Layout>
  );
};

export default index;
