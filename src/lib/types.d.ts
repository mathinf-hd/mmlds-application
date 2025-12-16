type TimeSlot = { name: string; };
type TimeSlots = Array<TimeSlot>;

interface Field { name: string; }
type Fields = Array<Field>;
interface FormDataField {
	// mandatory input
	bachelorName: string; 
	fieldsSelected: Array<string>;
	// not mandatory input
	comparableField?: string; 
}

type Topics = Array<Topic>;
interface Topic {
	name: string,
	subtopics: Array<string>,
	module: Array<string>
}

type Lectures = Array<MathLecture>;
interface MathLecture {
	lectureName: string;
	skills: Array<string>;
	moduleDescription: string;
}
interface MathematicsData {
	area: Array<string>,
	lectures: Record<Area, Lectures>
}

interface ProgrammingLecture {
	name: string;
	moduleDescription: string;
}

interface OpenSourceProject {
	projectName: string;
	publicRepoLink: string;
	personalIdentifier: string;
}

interface ProgrammingCourse {
	courseName: string;
	moduleDescription: string;
}

interface ProgrammingData {
	lectures: Array<ProgrammingLecture>;
	openSourceProjects: Array<OpenSourceProject>;
	extraCourses: Array<ProgrammingCourse>;
	lecturesEnabled: boolean;
	openSourceProjectsEnabled: boolean;
	extraCoursesEnabled: boolean;
}

type Question = string;
type Questions = Array<Question>;
type MotivationAnswers = Record<Question, string>;

// Top-Level Data Structure
interface Data {
	// mandatory input
	timeSlots: Array<string>;         
	fieldDetails: FormDataField;
	mathematics: MathematicsData;
	// not mandatory input
	programming: ProgrammingData;  
	// mandatory input
	questions: MotivationAnswers;
  }
