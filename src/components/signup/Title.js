import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const Title = (props) => {
	const { color, text, fontSize, minHeight, subTitle } = props
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				// minHeight: minHeight || '19.44vh',
				minHeight: 210,
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<Box sx={{}}>
				<Typography
					align='center'
					sx={{
						color: color || '#fff',
						fontSize: fontSize || 44,
						fontWeight: 700,
						fontFamily: 'Noto Sans',
						'@media (max-height: 400px)': {
							fontSize: 32,
						},
					}}
				>
					{text}
				</Typography>
			</Box>
			{subTitle && (
				<Box sx={{}}>
					<Typography
						align='center'
						sx={{
							mt: 1,
							mb: -6,
							color: color || '#fff',
							fontSize: 24,
							fontWeight: 500,
							fontFamily: 'Noto Sans',
						}}
					>
						{subTitle}
					</Typography>
				</Box>
			)}
		</Box>
	)
}

export default Title
