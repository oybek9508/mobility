import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Button, TextField, FormHelperText } from "@mui/material";
import Container from "@mui/material/Container";
import Layout from "src/components/Layout";
// import LoginLogo from "src/components/auth/login/LoginLogo";
import PassAuthForm from "src/components/auth/signup/PassAuthForm";

const NftPassAuth = () => {
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
					{/*   <LoginLogo /> */}
					<PassAuthForm />
				</Box>
			</Container>
		</Layout>
	);
};

export default NftPassAuth;
