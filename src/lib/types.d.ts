type TimeSlot = {name: string};
type TimeSlots = Array<TimeSlot>;
type SelectedTimeSlot = string;

type Field = {name: string};
type Fields = Array<Field>;
type FormDataFieldOfStudy = {
	bachelorField: string;
	selectedFields: Array<string>;
	comparableField: string;
}


type Topic = {name: string, subtopics: Skills, modul: mSkills};
type Topics = Array<Topic>;
type Skill = string;
type Skills = Array<Skill>
type mSkill = string;
type mSkills = Array<mSkill>


type Question = string;
type Questions = Array<Question>;
type FormDataQuestions = Record<Question, string>;

type Lecture = {
	name: string;
	points: number;
	description: string;
	subject: Subject | null;
	skills: Record<Skill, boolean>
};

type Subject = string;
type SubjectArea = { subject: Subject, cp: number };
type SubjectAreas = Array<SubjectArea>;
type FormDataLectures = Array<Lecture>;

type Data = { timeSlot: SelectedTimeSlot, fieldOfStudy: FormDataFieldOfStudy, topics: Topics, lectures: FormDataLectures, questions: FormDataQuestions };