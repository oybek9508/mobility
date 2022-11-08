import React from 'react'
import { Grid } from '@mui/material'
import AuthTextField from 'src/components/AuthTextField'

const InputForm = ({ values, errors, toucheds, handleChange }) => {
	return (
		<Grid container item sx={12} display='flex' justifyContent='center'>
			<Grid xs={12} item py={1}>
				<AuthTextField
					type='text'
					variant='outlined'
					sx={{ width: '100%' }}
					label='아이디를 입력해주세요'
					title='아이디'
					name='id'
					value={values.id}
					onChange={handleChange}
				/>
			</Grid>
			<Grid xs={12} item py={1}>
				<AuthTextField
					type='password'
					variant='outlined'
					sx={{ width: '100%' }}
					label='비밀번호를 입력해주세요'
					title='비밀번호'
					name='password'
					value={values.password}
					onChange={handleChange}
				/>
			</Grid>
		</Grid>
	)
}

export default InputForm
