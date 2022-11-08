import React from 'react'
import { CardMedia, Box } from '@mui/material'

const CheckBox = (props) => {
	const { value, onChange, onClick } = props

	return (
		<>
			<Box onClick={onClick} sx={{ cursor: 'pointer' }}>
				{value ? (
					<CardMedia
						src='/assets/images/nft-signup/btn_check_active.svg'
						alt='activate'
						component='img'
						sx={{
							width: '2rem',
							height: '2rem',
						}}
					/>
				) : (
					<CardMedia
						src='/assets/images/nft-signup/btn_check_deactive.svg'
						alt='deactivated'
						component='img'
						sx={{
							width: '2rem',
							height: '2rem',
						}}
					/>
				)}
			</Box>
		</>
	)
}

export default CheckBox
