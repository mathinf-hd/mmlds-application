export function downloadAsJsonFile(filename: string, data: object) {
	const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

export function makeEmptyRow() {
	return {
		'Course Name': '',
		'Credit Points': 0,
		A: false,
		B: false,
		C: false,
		D: false,
		E: false,
		F: false,
		G: false
	};
}
