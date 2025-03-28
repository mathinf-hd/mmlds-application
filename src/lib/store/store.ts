import { get, writable } from "svelte/store";

import { formTimeSlots } from '$lib/times';
import { formFields } from '$lib/fields';
import { formTopics } from "$lib/topics";
import { formQuestions } from "$lib/questions";

export const data = writable<Data>(loadData())
data.subscribe((value) => localStorage.data = JSON.stringify(value))

function loadData(){ 
    /* load data from localStorage */  
    try {
        const data: Data = JSON.parse(localStorage.data);
        
        //if (!isValidDataFormat(data)) {
        //    throw new Error('Discarding old data because DataFormat is invalid or changed')
        //}       
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
           
            //data = expandSkills(data);
            return data;

        } catch (error) {
            console.error('Error loading file:', error);
            return generateEmptyDataObject(formQuestions);
        }
    }
}

//function expandSkills(data: any): any{
//    const allSkills = [...data.topics.flatMap((topic: any) => topic.subtopics)]

//    const expandedSkillList: Record<Skill, boolean> = allSkills.reduce(
//        (skills, item) => {skills[item] = false; return skills;}, 
//        {} as Record<Skill, boolean>)

//    console.log(expandedSkillList)

//    data.lectures.forEach((lecture: any) => {
//        let skills = JSON.parse(JSON.stringify(expandedSkillList));

//        lecture.skills.forEach((skill: any) => {
//            skills[skill] = true;
            
//        })
//        lecture.skills = skills;
//    })

//    return data;
//}


//function isEqual(obj1: any, obj2: any){
//    /* quick check */
//    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    
//    /* check if every key is defined and the value is equal*/
//    return JSON.stringify(obj1) == JSON.stringify(obj2)
//};

function generateEmptyDataObject(questions: Questions) {

    /* create empty data object */
    const data: Data = {
    	// mandatory input
    	timeSlot: '', 
	fieldDetails: {
	  bachelorName: '',
          fieldsSelected: [],
          comparableField: ''
        },
       mathematics: {
          area: [],
          lectures: {}
        },
       questions: {} as MotivationAnswers,
       // not mandatory input
       programming: {
         lectures: [{ name: '', moduleDescription: '' }],
         openSourceProjects: [{ projectName: '', publicRepoLink: '', personalIdentifier: '' }],
         extraCourses: [{ courseName: '', moduleDescription: '' }],    
         lecturesEnabled: false,
         openSourceProjectsEnabled: false,
         extraCoursesEnabled: false
       }
     };

    /* add first lecture for convienience */

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
      const lecture = d.mathematics.lectures[areaName][lectureIdx];
      if (checked) {
        if (!lecture.skills.includes(skill)) lecture.skills.push(skill);
      } else {
        lecture.skills = lecture.skills.filter(s => s !== skill);
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


//export function isValidDataFormat(data: Data){
//    const timeslots = data.timeSlot
//    const fields = data.fields
//    const topics = data.topics
//    const questions = data.questions

//    /* check timeslots */
//    if (!isEqual(timeslots, formTimeSlots)) return false;

//    /* check fields */
//    if (!isEqual(fields, formFields)) return false;

//    /* check topics */
//    if (!isEqual(topics, formTopics)) return false;

//    /* check questions */
//    if (!isEqual(Object.keys(questions), formQuestions)) return false;

//    return true
//}

/**
 * quick and dirty formValidation
 * perhaps implement zod or yup valdation
 */

// export function isValidFormData(data: Data): boolean {
//     // Create a local error object that groups errors by component/section.
//     const errors = {
//       TimeSlot: [] as string[],
//       FieldOfStudy: [] as string[],
//       MathSkills: {} as Record<string, string[]>, // Each key is an area name.
//       MotivationQuestions: [] as string[]
//     };
  
//     // 1) Validate TimeSlot (mandatory)
//     if (!data.timeSlot) {
//       errors.TimeSlot.push("No time slot selected.");
//     }
  
//     // 2) Validate FieldOfStudy: check bachelorName and that at least one field is selected.
//     if (!data.fieldDetails.bachelorName) {
//       errors.FieldOfStudy.push("Bachelor name is missing.");
//     }
//     if (data.fieldDetails.fieldsSelected.length === 0) {
//       errors.FieldOfStudy.push("No field of study selected.");
//     }
  
    // 3) Validate MathSkills:
    // For each area in selectedAreas, ensure an area object exists in mathSkills.areas,
    // and that it contains at least one lecture. Then, each lecture must have both
    // a lectureName and a moduleDescription.
//     for (const selectedAreaName of data.mathematics.selectedAreas) {
//       const areaObj = data.mathematics.areas.find(area => area.areaName === selectedAreaName);
//       if (!areaObj) {
//         errors.MathSkills[selectedAreaName] = [
//           `Selected area "${selectedAreaName}" not found in mathSkills.areas.`
//         ];
//         continue;
//       }
//       if (areaObj.lectures.length === 0) {
//         errors.MathSkills[selectedAreaName] = [
//           "At least one lecture must be entered for this area."
//         ];
//         continue;
//       }
//       // Check each lecture in this area.
//       const lectureErrors: string[] = [];
//       areaObj.lectures.forEach((lecture, idx) => {
//         if (!lecture.lectureName) {
//           lectureErrors.push(`Lecture #${idx + 1} is missing a lecture name.`);
//         }
//         if (!lecture.moduleDescription) {
//           lectureErrors.push(`Lecture #${idx + 1} is missing a module description.`);
//         }
//       });
//       if (lectureErrors.length > 0) {
//         errors.MathSkills[selectedAreaName] = lectureErrors;
//       }
//     }
  
//     // 4) Validate MotivationQuestions:
//     // Iterate over the keys in the questions object (which should match formQuestions)
//     // and check that each answer is non-empty.
//     for (const question in data.questions) {
//       if (!data.questions[question]) {
//         errors.MotivationQuestions.push(`Answer missing for question: "${question}".`);
//       }
//     }
  
//     // Check if any errors were collected.
//     const hasTimeSlotError = errors.TimeSlot.length > 0;
//     const hasFieldError = errors.FieldOfStudy.length > 0;
//     const hasMathSkillsError = Object.keys(errors.MathSkills).length > 0;
//     const hasMotivationError = errors.MotivationQuestions.length > 0;
  
//     if (!hasTimeSlotError && !hasFieldError && !hasMathSkillsError && !hasMotivationError) {
//       return true;
//     }
  
//     // Build a comprehensive error message string.
//     let alertMessage = "File cannot be created because some data is missing.\n\n";
//     if (hasTimeSlotError) {
//       alertMessage += "TimeSlot:\n  - " + errors.TimeSlot.join("\n  - ") + "\n\n";
//     }
//     if (hasFieldError) {
//       alertMessage += "FieldOfStudy:\n  - " + errors.FieldOfStudy.join("\n  - ") + "\n\n";
//     }
//     if (hasMathSkillsError) {
//       alertMessage += "MathSkills:\n";
//       for (const areaName in errors.MathSkills) {
//         alertMessage += `  [${areaName}]:\n    - ${errors.MathSkills[areaName].join("\n    - ")}\n`;
//       }
//       alertMessage += "\n";
//     }
//     if (hasMotivationError) {
//       alertMessage += "MotivationQuestions:\n  - " + errors.MotivationQuestions.join("\n  - ") + "\n\n";
//     }
//     alert(alertMessage);
//     return false;
// }
  
