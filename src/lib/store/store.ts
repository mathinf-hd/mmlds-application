import { writable } from "svelte/store";
import { formTopics } from "$lib/topics";
import { formQuestions } from "$lib/questions";

const makeId = () => crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const data = writable<Data>(loadData());
data.subscribe((value) => localStorage.data = JSON.stringify(value));

function loadData(): Data { 
    try {
        const raw = JSON.parse(localStorage.data);
        // Basic validation: if structure looks valid, use it; otherwise start fresh
        if (raw?.mathematics?.lecturePool && raw?.timeSlots && raw?.programming) {
            return raw as Data;
        }
        return generateEmptyDataObject(formQuestions);
    } catch {
        return generateEmptyDataObject(formQuestions);
    }
}

function generateEmptyDataObject(questions: Questions): Data {
    const d: Data = {
        timeSlots: [],
        fieldDetails: {
            bachelorName: '',
            fieldsSelected: [],
            comparableField: ''
        },
        mathematics: {
            area: [],
            lectures: Object.fromEntries(
                formTopics.map(topic => [topic.name, []])
            ) as Record<string, Lectures>,
            lecturePool: [{ id: makeId(), lectureName: '', moduleDescription: '' }]
        },
        programming: {
            lectures: [{ name: '', moduleDescription: '' }],
            openSourceProjects: [{ projectName: '', publicRepoLink: '', personalIdentifier: '' }],
            extraCourses: [{ courseName: '', moduleDescription: '' }],
            lecturesEnabled: false,
            openSourceProjectsEnabled: false,
            extraCoursesEnabled: false
        },
        questions: {} as MotivationAnswers
    };
    for (const question of questions) {
        d.questions[question] = '';
    }
    return d;
}

export async function loadEvalData(filename: string) {
    const baseUrl = import.meta.env.VITE_BUILD_URL || "https://dacs-informatik.iwr.uni-heidelberg.de";
    const file = `${baseUrl}/data/${filename}`;

    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error('Unable to load file');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading file:', error);
        return generateEmptyDataObject(formQuestions);
    }
}

// ==================== FIELD DETAILS ====================

export function toggleStudyField(field: string, isChecked: boolean) {
    data.update(d => {
        if (isChecked) {
            if (!d.fieldDetails.fieldsSelected.includes(field)) {
                d.fieldDetails.fieldsSelected.push(field);
            }
        } else {
            d.fieldDetails.fieldsSelected = d.fieldDetails.fieldsSelected.filter(f => f !== field);
        }
        return d;
    });
}

// ==================== TIME SLOTS ====================

export function toggleTimeSlot(slotName: string, checked: boolean) {
    data.update(d => {
        const idx = d.timeSlots.indexOf(slotName);
        if (checked && idx === -1) {
            d.timeSlots.push(slotName);
        } else if (!checked && idx !== -1) {
            d.timeSlots.splice(idx, 1);
        }
        return d;
    });
}

// ==================== MATH AREAS ====================

export function selectArea(areaName: string, previousArea?: string) {
    data.update(d => {
        // Remove previous area if it exists
        if (previousArea && previousArea !== areaName) {
            d.mathematics.area = d.mathematics.area.filter(a => a !== previousArea);
        }
        // Add new area if not already present
        if (!d.mathematics.area.includes(areaName)) {
            d.mathematics.area.push(areaName);
        }
        return d;
    });
}

// ==================== LECTURE POOL ====================

export function addPoolLecture() {
    data.update(d => {
        d.mathematics.lecturePool.push({ id: makeId(), lectureName: '', moduleDescription: '' });
        return d;
    });
}

export function updatePoolLecture(id: string, patch: Partial<{ lectureName: string; moduleDescription: string }>) {
    data.update(d => {
        const lec = d.mathematics.lecturePool.find(l => l.id === id);
        if (lec) {
            Object.assign(lec, patch);
        }
        return d;
    });
}

export function removePoolLecture(id: string) {
    data.update(d => {
        d.mathematics.lecturePool = d.mathematics.lecturePool.filter(l => l.id !== id);
        // Also remove from all areas
        for (const area of Object.keys(d.mathematics.lectures)) {
            d.mathematics.lectures[area] = d.mathematics.lectures[area].filter(l => l.id !== id);
        }
        return d;
    });
}

// ==================== AREA LECTURES ====================

export function assignLectureToArea(areaName: string, lectureId: string) {
    data.update(d => {
        const pool = d.mathematics.lecturePool.find(l => l.id === lectureId);
        if (!pool) return d;

        // Ensure area array exists
        d.mathematics.lectures[areaName] ??= [];
        const list = d.mathematics.lectures[areaName];

        // Don't add if already assigned
        if (list.some(l => l.id === lectureId)) return d;

        list.push({
            id: lectureId,
            lectureName: pool.lectureName,
            moduleDescription: pool.moduleDescription,
            skills: []
        });
        return d;
    });
}

export function removeLecture(areaName: string, lectureIdx: number) {
    data.update(d => {
        d.mathematics.lectures[areaName]?.splice(lectureIdx, 1);
        return d;
    });
}

export function toggleSkill(areaName: string, lectureIdx: number, skill: string, checked: boolean) {
    data.update(d => {
        const lecture = d.mathematics.lectures[areaName]?.[lectureIdx];
        if (!lecture) return d;

        if (checked && !lecture.skills.includes(skill)) {
            lecture.skills.push(skill);
        } else if (!checked) {
            lecture.skills = lecture.skills.filter(s => s !== skill);
        }
        return d;
    });
}

// ==================== PROGRAMMING ====================

function ensureProgramming(d: Data): ProgrammingData {
    d.programming ??= {
        lectures: [],
        openSourceProjects: [],
        extraCourses: [],
        lecturesEnabled: false,
        openSourceProjectsEnabled: false,
        extraCoursesEnabled: false
    };
    d.programming.lectures ??= [];
    d.programming.openSourceProjects ??= [];
    d.programming.extraCourses ??= [];
    return d.programming;
}

export function toggleProgrammingCategory(
    category: 'lectures' | 'openSourceProjects' | 'extraCourses',
    checked: boolean
) {
    data.update(d => {
        const prog = ensureProgramming(d);
        prog[`${category}Enabled`] = checked;
        return d;
    });
}

export function addProgrammingLecture() {
    data.update(d => {
        ensureProgramming(d).lectures.push({ name: '', moduleDescription: '' });
        return d;
    });
}

export function removeProgrammingLecture(idx: number) {
    data.update(d => {
        ensureProgramming(d).lectures.splice(idx, 1);
        return d;
    });
}

export function addOpenSourceProject() {
    data.update(d => {
        ensureProgramming(d).openSourceProjects.push({
            projectName: '',
            publicRepoLink: '',
            personalIdentifier: ''
        });
        return d;
    });
}

export function removeOpenSourceProject(idx: number) {
    data.update(d => {
        ensureProgramming(d).openSourceProjects.splice(idx, 1);
        return d;
    });
}

export function addProgrammingCourse() {
    data.update(d => {
        ensureProgramming(d).extraCourses.push({ courseName: '', moduleDescription: '' });
        return d;
    });
}

export function removeProgrammingCourse(idx: number) {
    data.update(d => {
        ensureProgramming(d).extraCourses.splice(idx, 1);
        return d;
    });
}

// ==================== VALIDATION ====================

export function isValidFormData(formData: Data): boolean {
    const errors: Record<string, string[]> = {
        InterviewTime: [],
        Education: [],
        MathSkills: [],
        ProgrammingSkills: [],
        Questions: []
    };

    // Interview time
    if (!formData.timeSlots?.length) {
        errors.InterviewTime.push('Please select at least one interview time slot.');
    }

    // Education
    if (!formData.fieldDetails.bachelorName) {
        errors.Education.push('Bachelor name is required.');
    }
    if (!formData.fieldDetails.fieldsSelected.length) {
        errors.Education.push('At least one field must be selected.');
    }

    // Math skills
    if (formData.mathematics.area.length < 3) {
        errors.MathSkills.push('You must select all 3 areas.');
    }

    for (const areaName of formData.mathematics.area) {
        const lectures = formData.mathematics.lectures[areaName] ?? [];
        if (!lectures.length) {
            errors.MathSkills.push(`No lecture entered for "${areaName}".`);
            continue;
        }
        lectures.forEach((lec, idx) => {
            if (!lec.lectureName?.trim()) {
                errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing name.`);
            }
            if (!lec.moduleDescription?.trim()) {
                errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing description.`);
            }
        });
    }

    // Programming skills
    const prog = formData.programming;
    if (prog?.lecturesEnabled) {
        const filled = prog.lectures?.filter(l => l.name?.trim() || l.moduleDescription?.trim());
        if (!filled?.length) {
            errors.ProgrammingSkills.push('Lectures enabled but no data provided.');
        } else {
            prog.lectures?.forEach((lec, idx) => {
                const hasName = lec.name?.trim();
                const hasDesc = lec.moduleDescription?.trim();
                if ((hasName || hasDesc) && (!hasName || !hasDesc)) {
                    errors.ProgrammingSkills.push(`Lecture #${idx + 1}: Both name and description required.`);
                }
            });
        }
    }

    if (prog?.openSourceProjectsEnabled) {
        const filled = prog.openSourceProjects?.filter(p => 
            p.projectName?.trim() || p.publicRepoLink?.trim() || p.personalIdentifier?.trim()
        );
        if (!filled?.length) {
            errors.ProgrammingSkills.push('Open Source Projects enabled but no data provided.');
        } else {
            prog.openSourceProjects?.forEach((proj, idx) => {
                const hasAll = proj.projectName?.trim() && proj.publicRepoLink?.trim() && proj.personalIdentifier?.trim();
                const hasAny = proj.projectName?.trim() || proj.publicRepoLink?.trim() || proj.personalIdentifier?.trim();
                if (hasAny && !hasAll) {
                    errors.ProgrammingSkills.push(`Project #${idx + 1}: All fields required.`);
                }
            });
        }
    }

    if (prog?.extraCoursesEnabled) {
        const filled = prog.extraCourses?.filter(c => c.courseName?.trim() || c.moduleDescription?.trim());
        if (!filled?.length) {
            errors.ProgrammingSkills.push('Courses enabled but no data provided.');
        } else {
            prog.extraCourses?.forEach((course, idx) => {
                if ((course.courseName?.trim() || course.moduleDescription?.trim()) && !course.courseName?.trim()) {
                    errors.ProgrammingSkills.push(`Course #${idx + 1}: Course name required.`);
                }
            });
        }
    }

    // Questions
    for (const question of Object.keys(formData.questions)) {
        if (!formData.questions[question]) {
            errors.Questions.push(`Answer missing for: "${question}".`);
        }
    }

    // Check if valid
    const hasErrors = Object.values(errors).some(arr => arr.length > 0);
    if (!hasErrors) return true;

    // Build error message
    let message = 'File cannot be created because some data is missing.\n\n';
    for (const [section, errs] of Object.entries(errors)) {
        if (errs.length) {
            message += `${section}:\n${errs.map(e => `  - ${e}`).join('\n')}\n\n`;
        }
    }
    alert(message);
    return false;
}

