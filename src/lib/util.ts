export function downloadAsJsonFile(filename: string, data: object) {
	const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

export function makeJsonFormData(topics: object, fields: object) {
	const jsonFormData = {};
	for (const topic in topics) {
		jsonFormData[topic] = {};
		for (const subtopic of topics[topic]) {
			const subtopic_data = {
				selected: false
			};
			for (const field in fields) {
				subtopic_data[field] = fields[field];
			}
			jsonFormData[topic][subtopic] = subtopic_data;
		}
	}
	return jsonFormData;
}
