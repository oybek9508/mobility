import { styled } from '@mui/styles'
import InputBase from '@mui/material/InputBase'

const StyledSelectField = styled(InputBase)({
	// 'label + &': {},
	'& .MuiInputBase-input': {
		borderRadius: 6,
		backgroundColor: '#fbfbfb',
		height: '40px',
		border: 'solid 1px #f1f1f1',
		padding: '1px 8px 8px 8px',
		fontFamily: 'Noto Sans',
		lineHeight: '2.9rem',
		paddingLeft: '19px',
		'&:focus': {
			borderColor: '#037dd6 !important',
			backgroundColor: '#f6fbff !important',
		},
		'&:hover': {
			borderColor: '#037dd6 !important',
		},
	},
	// Label 일반 상태
	'& label': {
		fontFamily: 'Noto Sans',
		fontSize: 16,
		color: 'black',
		fontWeight: '300',
	},
	'&.Mui-error .MuiSelect-select': {
		backgroundColor: '#fff0f2 !important',
		border: '1px solid #fa375a !important',
	},
	'& option [disabled]': {
		display: 'none',
	},
})

export default StyledSelectField
