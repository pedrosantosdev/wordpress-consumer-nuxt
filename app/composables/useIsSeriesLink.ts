export default function (text: string) {
	return /\.((s|t)\d+){1}(\.|(e\d+\.)){0,1}/gim.test(text)
}
