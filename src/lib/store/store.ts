import { writable } from "svelte/store";
import { formTopics } from "$lib/topics";
import { formQuestions } from "$lib/questions";

export const data = writable<Data>(loadData())
data.subscribe((value) => localStorage.data = JSON.stringify(value))

function loadData(){ 
    /* load data from localStorage */  
    try {
        const data: Data = JSON.parse(localStorage.data);
        // if (!isValidDataFormat(data)) {
        //     throw new Error('Discarding old data because DataFormat is invalid or changed')
        // }       
        return data;
    } catch {
        return generateEmptyDataObject(formQuestions);
    }
}

export async function loadEvalData(filename: string){
    
    let url = import.meta.env.VITE_BUILD_URL ? import.meta.env.VITE_BUILD_URL : /* "http://localhost:8080/" */ "https://dacs-informatik.iwr.uni-heidelberg.de"

    const file = `${url}/data/${filename}`

    if (file !== null) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Unable to load file`);
            }
            let data = await response.json();

            /* if (!isValidDataFormat(data)) {
                throw new Error('Discarding old data because DataFormat is invalid or changed')
            } */ 
           
            // data = expandSkills(data);
            return data;

        } catch (error) {
            console.error('Error loading file:', error);
            return generateEmptyDataObject(formQuestions);
        }
    }
}

function isEqual(obj1: any, obj2: any){
    /* quick check */
    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    
    /* check if every key is defined and the value is equal*/
    return JSON.stringify(obj1) == JSON.stringify(obj2)
};

function generateEmptyDataObject(questions: Questions) {
    
    /* create empty data object */
	const data: Data = {
        // mandatory input
        timeSlot: '',
        fieldDetails: {
          bachelorName: '',
          fieldsSelected: [],
          comparableField: ''
        } as FormDataField,
        mathematics: {
          area: [],
          lectures: Object.fromEntries(formTopics.map(topic => [topic.name, [{ lectureName: '', skills: [], moduleDescription: ''}]])) as Record<string, Lectures>
        } as MathematicsData,
        // not mandatory input
        programming: {
          lectures: [{ name: '', moduleDescription: '' }],
          openSourceProjects: [{ projectName: '', publicRepoLink: '', personalIdentifier: '' }],
          extraCourses: [{ courseName: '', moduleDescription: '' }],    
          lecturesEnabled: false,
          openSourceProjectsEnabled: false,
          extraCoursesEnabled: false
        } as ProgrammingData,
        // mandatory input
        questions: {} as MotivationAnswers
    };

    for (const question of questions) {
		data['questions'][question] = '';
	}

	return data;
}

export function toggleStudyField(field: string, isChecked: boolean){
    data.update((d) => {
        if (isChecked) {
            // Add field if not present
            if (!d.fieldDetails.fieldsSelected.some((f) => f === field)) {
                d.fieldDetails.fieldsSelected.push(field);
            }
        } else {
            d.fieldDetails.fieldsSelected = d.fieldDetails.fieldsSelected.filter((f) => f !== field);
        }
        return d;
    });
}

export function ensureLectureExist(areaName: string){
    data.update(d => {
        if(!d.mathematics.lectures[areaName]){
            d.mathematics.lectures[areaName] = []
        }
        return d;
    });
}

export function selectArea(areaName: string){
    data.update(d => {
        // Add the area if not already chosen
        if (!d.mathematics.area.includes(areaName)) {
            d.mathematics.area.push(areaName);
        }
        return d;
    });
}

export function addLecture(areaName: string){
    ensureLectureExist(areaName);
    data.update(d => {
        d.mathematics.lectures[areaName].push({
            lectureName: '',
            skills: [],
            moduleDescription: ''
        });
        return d;
    });
}

export function removeLecture(areaName: string, lectureIdx: number) {
    data.update(d => {
      d.mathematics.lectures[areaName].splice(lectureIdx, 1);
      return d;
    });
  }
  
  export function toggleSkill(areaName: string, lectureIdx: number, skill: string, checked: boolean) {
    data.update(d => {
      const lecture = d.mathematics.lectures[areaName]?.[lectureIdx];
      if (lecture) {
        if (checked) {
            if (!lecture.skills.includes(skill)) lecture.skills.push(skill);
        } else {
            lecture.skills = lecture.skills.filter(s => s !== skill);
        }
      }
      return d;
    });
  }
  
export function toggleProgrammingCategory(category: 'lectures' | 'openSourceProjects' | 'extraCourses', checked: boolean) {
    data.update(d => {
        if (!d.programming) {
            d.programming = { lecture: [], openSourceProjects: [], extraCourses: [] };
        }
        d.programming[`${category}Enabled`] = checked;
        return d;
    });
}

export function addProgrammingLecture() {
    data.update(d => {
      if (!d.programming) d.programming = {};
      if(!d.programming.lectures) d.programming.lectures = [];
      d.programming.lectures.push({ name: '', moduleDescription: '' });
      return d;
    });
}

export function removeProgrammingLecture(idx: number) {
    data.update(d => {
      d.programming?.lectures.splice(idx, 1);
      return d;
    });
}

export function addOpenSourceProject() {
    data.update(d => {
        // Ensure programming object exists
        if (!d.programming) d.programming = {};
        if(!d.programming.openSourceProjects) d.programming.openSourceProjects = [];    
        d.programming.openSourceProjects.push({ projectName: '', publicRepoLink: '', personalIdentifier: '' });
        return d;
    });
}

export function removeOpenSourceProject(idx: number) {
    data.update(d => {
        d.programming?.openSourceProjects.splice(idx, 1);
        return d;
    });
}

export function addProgrammingCourse() {
    data.update(d => {
        if (!d.programming) d.programming = {};
        if(!d.programming.extraCourses) d.programming.extraCourses = [];
        d.programming.extraCourses.push({ courseName: '', moduleDescription: '' });
        return d;
    });
}

export function removeProgrammingCourse(idx: number) {
    data.update(d => {
        d.programming?.extraCourses.splice(idx, 1);
        return d;
    });
}

export function addLecture(areaName: string){
    ensureLectureExist(areaName);
    data.update(d => {
        d.mathematics.lectures[areaName].push({
            lectureName: '',
            skills: [],
            moduleDescription: ''
        });
        return d;
    });
}

export function removeLecture(areaName: string, lectureIdx: number) {
    data.update(d => {
      d.mathematics.lectures[areaName].splice(lectureIdx, 1);
      return d;
    });
  }


export function toggleSkill(areaName: string, lectureIdx: number, skill: string, checked: boolean) {
    data.update(d => {
      const lecture = d.mathematics.lectures[areaName]?.[lectureIdx];
      if (lecture) {
        if (checked) {
            if (!lecture.skills.includes(skill)) lecture.skills.push(skill);
        } else {
            lecture.skills = lecture.skills.filter(s => s !== skill);
        }
      }
      return d;
    });
}
  
export function toggleProgrammingCategory(category: 'lectures' | 'openSourceProjects' | 'extraCourses', checked: boolean) {
    data.update(d => {
        if (!d.programming) {
            d.programming = { lecture: [], openSourceProjects: [], extraCourses: [] };
        }
        d.programming[`${category}Enabled`] = checked;
        return d;
    });
}

export function addProgrammingLecture() {
    data.update(d => {
      if (!d.programming) d.programming = {};
      if(!d.programming.lectures) d.programming.lectures = [];
      d.programming.lectures.push({ name: '', moduleDescription: '' });
      return d;
    });
}

export function removeProgrammingLecture(idx: number) {
    data.update(d => {
      d.programming?.lectures.splice(idx, 1);
      return d;
    });
}

export function addOpenSourceProject() {
    data.update(d => {
        // Ensure programming object exists
        if (!d.programming) d.programming = {};
        if(!d.programming.openSourceProjects) d.programming.openSourceProjects = [];    
        d.programming.openSourceProjects.push({ projectName: '', publicRepoLink: '', personalIdentifier: '' });
        return d;
    });
}

export function removeOpenSourceProject(idx: number) {
    data.update(d => {
        d.programming?.openSourceProjects.splice(idx, 1);
        return d;
    });
}

export function addProgrammingCourse() {
    data.update(d => {
        if (!d.programming) d.programming = {};
        if(!d.programming.extraCourses) d.programming.extraCourses = [];
        d.programming.extraCourses.push({ courseName: '', moduleDescription: '' });
        return d;
    });
}

export function removeProgrammingCourse(idx: number) {
    data.update(d => {
        d.programming?.extraCourses.splice(idx, 1);
        return d;
    });
}


/**
 * quick and dirty formValidation
 * perhaps implement zod or yup valdation
 */

export function isValidFormData(data: Data): boolean {
    // Updated property names: InterviewTime, Education, MathSkills, Questions
    const errors: Record<string, string[]> = {
      InterviewTime: [],
      Education: [],
      MathSkills: [],
      Questions: [],
      ProgrammingSkills: []
    };
  
    // InterviewTime
    if (!data.timeSlot) {
      errors.InterviewTime.push('Select a time slot.');
    }
  
    // Education
    if (!data.fieldDetails.bachelorName) {
      errors.Education.push('Bachelor name is required.');
    }
    if (!data.fieldDetails.fieldsSelected.length) {
      errors.Education.push('At least one field must be selected.');
    }
  
    // MathSkills
    //  - exactly 3 must be chosen
    //  - each chosen area must have at least one lecture with name + description
    if (data.mathematics.area.length < 3) {
      errors.MathSkills.push('You must select all 3 areas.');
    }
    for (const areaName of data.mathematics.area) {
      const lectures = data.mathematics.lectures[areaName] ?? [];
      if (!lectures.length) {
        errors.MathSkills.push(`No lecture entered for "${areaName}".`);
        continue;
      }
      lectures.forEach((lec, idx) => {
        if (!lec.lectureName) {
          errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing name.`);
        }
        if (!lec.moduleDescription) {
          errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing description.`);
        }
      });
    }

    // Programming skills validation
    if (data.programming?.lecturesEnabled) {
      data.programming.lectures?.forEach((lec, idx) => {
        if (!lec.name || !lec.moduleDescription) {
          errors.ProgrammingSkills.push(`Lecture #${idx + 1} in Programming missing name or description.`);
        }
      })
    }
    if (data.programming?.openSourceProjectsEnabled) {
      data.programming.openSourceProjects?.forEach((proj, idx) => {
        if (!proj.projectName || !proj.publicRepoLink || !proj.personalIdentifier) {
          errors.ProgrammingSkills.push(`Open Source Project #${idx + 1} missing name, link or identifier.`);
        }
      })
    }
    if (data.programming?.extraCoursesEnabled) {
      data.programming.extraCourses?.forEach((course, idx) => {
        if (!course.courseName) {
          errors.ProgrammingSkills.push(`Course #${idx + 1} in Programming missing course name.`);
        }
      })
    }

    // Questions
    for (const question of Object.keys(data.questions)) {
      if (!data.questions[question]) {
        errors.Questions.push(`Answer missing for: "${question}".`);
      }
    }
  
    // Summarize errors
    const hasInterviewTimeError = errors.InterviewTime.length > 0;
    const hasEducationError = errors.Education.length > 0;
    const hasMathError = errors.MathSkills.length > 0;
    const hasQuestionsError = errors.Questions.length > 0;
    const hasProgrammingError = errors.ProgrammingSkills.length > 0;
  
    if (!hasInterviewTimeError && !hasEducationError && !hasMathError && !hasQuestionsError && !hasProgrammingError) {
      return true;
    }
  
    // Build a grouped alert message
    let message = 'File cannot be created because some data is missing.\n\n';
  
    if (hasInterviewTimeError) {
      message += 'Interview Time:\n';
      for (const e of errors.InterviewTime) {
        message += `  - ${e}\n`;
      }
      message += '\n';
    }
  
    if (hasEducationError) {
      message += 'Education:\n';
      for (const e of errors.Education) {
        message += `  - ${e}\n`;
      }
      message += '\n';
    }
  
    if (hasMathError) {
      message += 'Skills in Mathematics:\n';
      for (const e of errors.MathSkills) {
        message += `  - ${e}\n`;
      }
      message += '\n';
    }

    if (hasProgrammingError) {
      message += 'Programming Skills:\n';
      for (const e of errors.ProgrammingSkills) message += `  - ${e}\n`;
      message += '\n';
    }
  
    if (hasQuestionsError) {
      message += 'Questions:\n';
      for (const e of errors.Questions) {
        message += `  - ${e}\n`;
      }
      message += '\n';
    }
  
    alert(message);
    return false;
  }
  
