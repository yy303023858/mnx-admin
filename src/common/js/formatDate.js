export function formatDate(str){
	if (str) {
		const arr = str.split('')
		arr.splice(8, 6)
		arr.splice(4, 0, '-')
		arr.splice(7, 0, '-')
		const dateStr = arr.join('')
		return dateStr
	}
}