import {
	type FormTopics,
	type FormFields,
	type FormQuestions,
	type FormDataTopics,
	type FormDataQuestions,
	type FormData
} from '$lib/formTypes';

export function downloadFormAsJsonFile(filename: string, data: FormData) {
	const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

export function makeFormData(topics: FormTopics, fields: FormFields, questions: FormQuestions) {
	const formData: FormData = { topics: {} as FormDataTopics, questions: {} as FormDataQuestions };
	for (const question of questions) {
		formData['questions'][question] = { answer: '' };
	}
	for (const topic in topics) {
		formData['topics'][topic] = { weight: topics[topic].weight, subtopics: {} };
		for (const subtopic of topics[topic].subtopics) {
			const subtopicFields: FormFields = {
				selected: false
			};
			for (const field in fields) {
				subtopicFields[field] = fields[field];
			}
			formData['topics'][topic].subtopics[subtopic] = subtopicFields;
		}
	}
	return formData;
}
