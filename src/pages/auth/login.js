import { Container, Box } from "@mui/material";
import React from "react";
import LoginForm from "src/components/auth/login/LoginForm";
import Layout from "src/components/Layout";

const Login = () => {
	return (
		<Layout>
			<Container
				component="main"
				maxWidth="xs"
				sx={{ mt: 12, mb: 12, bgColor: "#fff" }}
			>
				<Box>
					<LoginForm />
				</Box>
			</Container>
		</Layout>
	);
};

export default Login;
