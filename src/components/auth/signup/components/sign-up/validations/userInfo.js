const userInfoValidations = {
	id: async (value) => {
		if (!value) return '아이디가 비어있습니다.'
		if (value.length < 5)
			return '5~20자의 영문, 숫자, 특수기호 (-),(_)만 사용 가능합니다.'
		if (value.length > 20)
			return '5~20자의 영문, 숫자, 특수기호 (-),(_)만 사용 가능합니다.'
		if (!/^[-a-zA-Z0-9_]{5,20}$/.test(value))
			return '5~20자의 영문, 숫자, 특수기호 (-),(_)만 사용 가능합니다.'

		return ''
	},
	password: (value) => {
		if (!value) return '아이디가 비어있습니다.'
		if (value.length < 8)
			return '영어, 숫자, 특수문자가 각 1개 이상 포함한 8~20자로 입력해주세요.'
		if (value.length > 20)
			return '영어, 숫자, 특수문자가 각 1개 이상 포함한 8~20자로 입력해주세요.'
		if (
			!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/.test(
				value,
			)
		)
			return '5~20자의 영문, 숫자, 특수기호 (-),(_)만 사용 가능합니다.'
		return ''
	},
}

export default userInfoValidations
