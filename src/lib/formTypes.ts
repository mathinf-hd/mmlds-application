export type FormTopic = string;
export type FormSubtopic = string;
export type FormQuestion = string;
export type FormQuestions = Array<FormQuestion>;
export type FormField = string | number | boolean;
export type FormTopics = Record<FormTopic, { weight: number; subtopics: Array<FormSubtopic> }>;
export type FormFields = Record<string, FormField>;
export type FormDataTopics = Record<
	FormTopic,
	{ weight: number; subtopics: Record<FormSubtopic, FormFields> }
>;
export type FormDataQuestions = Record<FormQuestion, { answer: string }>;
export type FormData = { topics: FormDataTopics; questions: FormDataQuestions };
