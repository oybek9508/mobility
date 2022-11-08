import React from 'react'
import { Box } from '@mui/material'

const MaleBox = (props) => {
	const { children, isSelected, onClick, error } = props

	const border = () => {
		if (isSelected) return '1px solid #037dd6'
		if (error) return '1px solid #fa375a !important'

		return 'none'
	}

	const backgroundColor = () => {
		if (isSelected) return '#f6fbff'
		if (error) return '#fff0f2'

		return '#f4f4f4'
	}

	const color = () => {
		if (isSelected) return '#037dd6'
		if (error) return '#fa375a'

		return '#808080'
	}

	return (
		<Box
			sx={{
				minHeight: '48px',
				width: '50%',
				border: border(),
				backgroundColor: backgroundColor(),
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'start',
				borderRadius: '6px',
				flexDirection: 'column',
				pl: 3,

				color: color(),
				fontWeight: '400',
				fontFamily: 'Noto Sans',
				cursor: 'pointer',
			}}
			onClick={onClick}
		>
			{children}
		</Box>
	)
}

export default MaleBox
