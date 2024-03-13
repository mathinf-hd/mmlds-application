export type FormTopic = string;
export type FormSubtopic = string;
export type FormField = string | number | boolean;
export type FormTopics = Record<FormTopic, Array<FormSubtopic>>;
export type FormFields = Record<string, FormField>;
export type FormData = Record<FormTopic, Record<FormSubtopic, FormFields>>;
