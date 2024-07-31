import { get, writable } from "svelte/store";

import { formExtendDetails } from "$lib/extentDetails";
import { formTopics } from "$lib/topics";
import { formQuestions } from "$lib/questions";

const initData: Data = loadData()

export const data = writable<Data>(initData)

data.subscribe((value) => localStorage.data = JSON.stringify(value))

function loadData(){
    try {
        const data: Data = JSON.parse(localStorage.data);
        
        if (!isValidDataFormat(data)) {
            throw new Error('Discarding old data because DataFormat is invalid or changed')
        }
        
        return data;
    } catch {
        return generateEmptyDataObject(formExtendDetails, formQuestions);
    }
}

function isValidDataFormat(data: Data){
    const extendDetails = data.extentDetails
    const topics = data.topics
    const lectures = data.lectures
    const questions = data.questions

    /* check extendDetails */
    if (!isEqual(Object.keys(extendDetails), formExtendDetails)) return false;

    /* check topics */
    if (!isEqual(topics, formTopics)) return false;

    /* check questions */
    if (!isEqual(Object.keys(questions), formQuestions)) return false;

    /* check skill of lectures */
    const skills = formTopics.flatMap((topic: Topic) => topic.subtopics).sort()
    
    for (const lecture of lectures){
        const lectureSkills = Object.keys(lecture.skills).sort()
        
        if(!isEqual(lectureSkills,skills)) return false
    }

    return true
}

function isEqual(obj1: any, obj2: any){
    /* quick check */
    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    
    /* check if every key is defined and the value is equal*/
    return JSON.stringify(obj1) == JSON.stringify(obj2)
};

function generateEmptyDataObject(extentDetails: ExtentDetails, questions: Questions) {

    /* create empty data object */
	const data: Data = { extentDetails: {} as FormDataExtentDetails, topics: formTopics, lectures: [] as FormDataLectures, questions: {} as FormDataQuestions };
	
    for (const extentDetail of extentDetails){
		data['extentDetails'][extentDetail] = null
	} 
	
    /* add first lecture for convienience */
    data.lectures = [{ name: '', points: 0, description: '', subject: null, skills: {}}]
	
    for (const question of questions) {
		data['questions'][question] = '';
	}

	return data;
}

export function addLecture(){
    let newLecture: Lecture = { name: '', points: 0, description: '', subject: null, skills: {}}

    data.update((data: Data) => {
        data.lectures = [...data.lectures, newLecture]
        return data
    })
}

export function deleteLecture(idx: number){
    data.update((data: Data) => {    
    data.lectures.splice(idx ,1); 
    return data
    })
}

export function countSubjectCP(subject: Subject) {

    const _data = get(data);

    const extentDuration = _data.extentDetails["duration"]
    const extentPoints = _data.extentDetails["points"]

    if (!extentDuration || !extentPoints ) return 0;

    const pointEquivalent = (180 / extentPoints)  * (extentDuration / 36)

    const points = _data.lectures.reduce((sum, lecture) => 
        lecture.subject === subject ? sum + lecture.points : sum, 0);

    const cp = points * pointEquivalent

    return Math.round(cp * 100) /100
} 