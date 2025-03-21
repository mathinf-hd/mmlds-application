type Topic = {name: string, description: string, subtopics: Skills};
type Topics = Array<Topic>;
type Skill = string;
type Skills = Array<Skill>

type ExtentDetail = string;
type ExtentDetails = Array<ExtentDetail> ;
type FormDataExtentDetails = Record<ExtentDetail, number | null>;

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

type Subject = string
type SubjectArea = { subject: Subject, cp: number }
type SubjectAreas = Array<SubjectArea>
type FormDataLectures = Array<Lecture>;

type Data = { extentDetails: FormDataExtentDetails, topics: Topics, lectures: FormDataLectures, questions: FormDataQuestions};