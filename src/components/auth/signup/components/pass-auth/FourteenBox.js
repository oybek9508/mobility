import React from 'react'
import { Box } from '@mui/material'

const FourteenBox = (props) => {
	const { children, isSelected, onClick } = props

	return (
		<Box
			sx={{
				minHeight: '60px',
				width: '50%',
				border: isSelected ? '1px solid #037dd6' : 'none',
				backgroundColor: isSelected ? '#f6fbff' : '#f4f4f4',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '6px',
				flexDirection: 'column',

				color: isSelected ? '#037dd6' : '#333333',
				fontWeight: 'bold',
				fontFamily: 'Noto Sans',
				cursor: 'pointer',
				textAlign: 'center',
			}}
			onClick={onClick}
		>
			{children}
		</Box>
	)
}

export default FourteenBox
