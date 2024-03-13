import { type Topics, type Fields } from './form_types';

export function downloadAsJsonFile(filename: string, data: object) {
	const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

type JsonFormData = Record<string, Record<string, Fields>>;

export function makeJsonFormData(topics: Topics, fields: Fields) {
	const jsonFormData: JsonFormData = {};
	for (const topic in topics) {
		jsonFormData[topic] = {};
		for (const subtopic of topics[topic]) {
			const subtopicFields: Fields = {
				selected: false
			};
			for (const field in fields) {
				subtopicFields[field] = fields[field];
			}
			jsonFormData[topic][subtopic] = subtopicFields;
		}
	}
	return jsonFormData;
}
