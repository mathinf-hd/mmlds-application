import { type FormTopics, type FormFields, type FormData } from '$lib/formTypes';

export function downloadFormAsJsonFile(filename: string, data: FormData) {
	const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

export function makeFormData(topics: FormTopics, fields: FormFields) {
	const formData: FormData = {};
	for (const topic in topics) {
		formData[topic] = {};
		for (const subtopic of topics[topic]) {
			const subtopicFields: FormFields = {
				selected: false
			};
			for (const field in fields) {
				subtopicFields[field] = fields[field];
			}
			formData[topic][subtopic] = subtopicFields;
		}
	}
	return formData;
}
