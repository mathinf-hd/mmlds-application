import { createSignal, createMemo, For, type Setter, type Accessor, type JSX } from 'solid-js';

interface Lecture {
    name: string;
    description: string;
}

interface MotivationQuestions {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
}


interface FormData {
    interviewTime: string;
    bachelorName: string;
    fieldOfStudy: string[];
    mathLecturesGlobal: Lecture[];
    mathAreas: string[];
    mathSkills: { [area: string]: Lecture[] };
    programmingFoundationalLectures: Lecture[];
    programmingOpenSourceProjects: Lecture[];
    programmingCourses: Lecture[];
    motivation: MotivationQuestions;
}

interface PageProps {
    formData: Accessor<FormData>;
    updateFormData: (key: keyof FormData, value: any) => void;
    setFormData?: Setter<FormData>;
}


const initialFormData: FormData = {
    interviewTime: '',
    bachelorName: '',
    fieldOfStudy: [],
    mathLecturesGlobal: [],
    mathAreas: [],
    mathSkills: {},
    programmingFoundationalLectures: [],
    programmingOpenSourceProjects: [],
    programmingCourses: [],
    motivation: { q1: '', q2: '', q3: '', q4: '', q5: '' },
};

const MAX_PAGES = 5;
const ALL_MATH_AREAS: string[] = [
    'Differential Geometry',
    'Statistics and Probability Theory',
    'Functional Analysis',
    'Variational Methods and Optimization',
    'Numerical Analysis',
];


const ProgressBar: (props: { currentPage: Accessor<number>; progress: Accessor<number> }) => JSX.Element =
    (props) => (
    <div class="progress-bar-container">
        <div class="progress-text">
            {props.currentPage()} / {MAX_PAGES}
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style={{ width: `${props.progress()}%` }}></div>
        </div>
        <hr />
    </div>
);


const Page1_Education: (props: PageProps) => JSX.Element = ({ formData, updateFormData }) => (
    <section>
        <h3>📅 Interview Time & 🎓 Education Details</h3>
        <label for="interview-time">Which general time slots would be convenient for you?</label>
        <select
            id="interview-time"
            value={formData().interviewTime}
            // Type assertion for event target
            onInput={(e) => updateFormData('interviewTime', (e.currentTarget as HTMLSelectElement).value)}
        >
            <option value="">Select a time slot</option>
            <option value="09:00-12:00 CEST">09:00-12:00 CEST</option>
            <option value="14:00-17:00 CEST">14:00 - 17:00 CEST</option>
        </select>

        <label for="bachelor-name">Name of Bachelor of Science in Transcript</label>
        <input
            type="text"
            id="bachelor-name"
            placeholder="e.g., Bachelor of Science in Mathematics"
            value={formData().bachelorName}
            onInput={(e) => updateFormData('bachelorName', (e.currentTarget as HTMLInputElement).value)}
        />

        <label>Field of study (more than one possible)</label>
        <div class="checkbox-group">
            <For each={['Mathematics', 'Physics', 'Technical Mathematics', 'Scientific Computing', 'Comparable Field']}>
                {(field: string) => (
                    <label class="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData().fieldOfStudy.includes(field)}
                            onChange={(e) => {
                                const isChecked = (e.currentTarget as HTMLInputElement).checked;
                                const currentFields = formData().fieldOfStudy;
                                const newFields = isChecked
                                    ? [...currentFields, field]
                                    : currentFields.filter((f) => f !== field);
                                updateFormData('fieldOfStudy', newFields);
                            }}
                        />
                        {field}
                    </label>
                )}
            </For>
        </div>
    </section>
);

const Page2_MathGlobal: (props: PageProps) => JSX.Element = ({ formData, updateFormData }) => {
    const addGlobalLecture = () => {
        const newLecture: Lecture = { name: `Lecture ${formData().mathLecturesGlobal.length + 1}`, description: 'Description' };
        updateFormData('mathLecturesGlobal', [...formData().mathLecturesGlobal, newLecture]);
    };

    const toggleMathArea = (area: string) => {
        const currentAreas = formData().mathAreas;
        let newAreas: string[];
        if (currentAreas.includes(area)) {
            newAreas = currentAreas.filter((a) => a !== area);
        } else if (currentAreas.length < 3) {
            newAreas = [...currentAreas, area];
        } else {
            // Using alert as per previous instruction to avoid custom modals
            alert('You can only select a maximum of 3 areas.');
            return;
        }
        updateFormData('mathAreas', newAreas);
    };

    return (
        <section>
            <h3>➕ Mathematics - Global Lectures</h3>
            <p>Add each Mathematics lecture once (as in your transcript).</p>

            <button class="action-button" onClick={addGlobalLecture}>
                Add Another Lecture
            </button>
            <p>Current Global Lectures added: **{formData().mathLecturesGlobal.length}**</p>

            <hr />

            <h3>🎯 Select 3 Areas</h3>
            <div class="area-selection-group">
                <For each={ALL_MATH_AREAS}>
                    {(area: string) => (
                        <button
                            onClick={() => toggleMathArea(area)}
                            class={formData().mathAreas.includes(area) ? 'area-button selected' : 'area-button'}
                        >
                            {formData().mathAreas.includes(area) ? '✓ ' : ''}
                            {area}
                        </button>
                    )}
                </For>
            </div>
        </section>
    );
};

const Page3_MathAreaSkills: (props: PageProps) => JSX.Element = ({ formData, setFormData }) => {
    const areas = createMemo(() => formData().mathAreas);

    const addSkillLecture = (area: string) => {
        const newLecture: Lecture = { name: '', description: '' };
        if (setFormData) {
            setFormData((prev) => ({
                ...prev,
                mathSkills: {
                    ...prev.mathSkills,
                    [area]: [...(prev.mathSkills[area] || []), newLecture],
                },
            }));
        }
    };

    return (
        <section>
            <h3>📚 Mathematics Skills per Selected Area</h3>
            <p>Add specific lectures to each of your selected areas.</p>
            <For each={areas()}>
                {(area: string) => (
                    <div class="area-skill-box">
                        <h4>{area}</h4>
                        <p>Lectures added: **{(formData().mathSkills[area] || []).length}**</p>
                        <button class="action-button" onClick={() => addSkillLecture(area)}>
                            Add Lecture to this Area
                        </button>
                    </div>
                )}
            </For>
            {areas().length === 0 && (
                <p style={{ color: 'red' }}>Please select 3 areas on the previous page to proceed.</p>
            )}
        </section>
    );
};

const Page4_ProgrammingSkills: (props: PageProps) => JSX.Element = ({ formData, setFormData }) => {
    type ProgKey = 'programmingFoundationalLectures' | 'programmingOpenSourceProjects' | 'programmingCourses';

    const addItem = (key: ProgKey) => {
        const newItem: Lecture = { name: `Item ${formData()[key].length + 1}`, description: '' };
        if (setFormData) {
            setFormData((prev) => ({
                ...prev,
                [key]: [...prev[key], newItem],
            }));
        }
    };

    return (
        <section>
            <h3>💻 Programming Skills</h3>
            <p>Programming skills can be proved in 3 ways:</p>

            <div class="skill-proof-box">
                <label class="checkbox-label" style={{'font-weight': 'bold'}}>
                    <input type="checkbox" /> Through foundational lectures (e.g., Algorithms and data structures)
                </label>
                <button class="action-button" onClick={() => addItem('programmingFoundationalLectures')}>
                    Add Foundational Lecture
                </button>
                <p>Lectures added: **{formData().programmingFoundationalLectures.length}**</p>
            </div>

            <div class="skill-proof-box">
                <label class="checkbox-label" style={{'font-weight': 'bold'}}>
                    <input type="checkbox" /> Actively contributed to an open source project
                </label>
                <button class="action-button" onClick={() => addItem('programmingOpenSourceProjects')}>
                    Add Another Project
                </button>
                <p>Projects added: **{formData().programmingOpenSourceProjects.length}**</p>
            </div>

            <div class="skill-proof-box">
                <label class="checkbox-label" style={{'font-weight': 'bold'}}>
                    <input type="checkbox" /> Participated in a programming course
                </label>
                <button class="action-button" onClick={() => addItem('programmingCourses')}>
                    Add Programming Course
                </button>
                <p>Courses added: **{formData().programmingCourses.length}**</p>
            </div>
        </section>
    );
};

const Page5_Motivation: (props: PageProps & { saveFormData: () => void }) => JSX.Element = ({ formData, updateFormData }) => {
    const updateMotivation = (qKey: keyof MotivationQuestions, value: string) => {
        const newMotivation: MotivationQuestions = { ...formData().motivation, [qKey]: value };
        updateFormData('motivation', newMotivation);
    };

    return (
        <section>
            <h3>📝 Motivation Questions</h3>

            <label>1.) Why would you prefer Heidelberg over other highly ranked Universities in Germany? (Max. two sentences):</label>
            <textarea rows={3} value={formData().motivation.q1} onInput={(e) => updateMotivation('q1', (e.currentTarget as HTMLTextAreaElement).value)} />

            <label>2.) What topics in the MSc Mathematics of Machine Learning and Data Science in Heidelberg attract you most? Explain Why. (Max. four sentences):</label>
            <textarea rows={4} value={formData().motivation.q2} onInput={(e) => updateMotivation('q2', (e.currentTarget as HTMLTextAreaElement).value)} />

            <label>3.) Describe the topic and main outcome of your BSc thesis. (Max. four sentences):</label>
            <textarea rows={4} value={formData().motivation.q3} onInput={(e) => updateMotivation('q3', (e.currentTarget as HTMLTextAreaElement).value)} />

            <label>4.) Discuss how your previous academic and extracurricular experiences have prepared you for the rigorous curriculum... (Max. four sentences):</label>
            <textarea rows={4} value={formData().motivation.q4} onInput={(e) => updateMotivation('q4', (e.currentTarget as HTMLTextAreaElement).value)} />

            <label>5.) Describe a past experience where you successfully worked as part of a team on a technical project... (Max. four sentences):</label>
            <textarea rows={4} value={formData().motivation.q5} onInput={(e) => updateMotivation('q5', (e.currentTarget as HTMLTextAreaElement).value)} />
        </section>
    );
};


export function App(): JSX.Element {
    const [formData, setFormData] = createSignal<FormData>(initialFormData);
    const [currentPage, setCurrentPage] = createSignal<number>(1);

    const progress = createMemo<number>(() => (currentPage() / MAX_PAGES) * 100);

    const nextPage = (): number => setCurrentPage((p) => Math.min(p + 1, MAX_PAGES));
    const prevPage = (): number => setCurrentPage((p) => Math.max(p - 1, 1));

    const updateFormData = (key: keyof FormData, value: any): void => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const saveFormData = (): void => {
        const jsonOutput = JSON.stringify(formData(), null, 2);
        console.log('Form Data Saved (JSON Output):', jsonOutput);
        alert('Form data saved! Check your browser console AND your downloads folder for the JSON file.');

        const blob = new Blob([jsonOutput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'application_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const RenderPage = () => {
        const commonProps: PageProps = { formData, updateFormData, setFormData };

        switch (currentPage()) {
            case 1:
                return <Page1_Education {...commonProps} />;
            case 2:
                return <Page2_MathGlobal {...commonProps} />;
            case 3:
                return <Page3_MathAreaSkills {...commonProps} />;
            case 4:
                return <Page4_ProgrammingSkills {...commonProps} />;
            case 5:
                return <Page5_Motivation {...commonProps} saveFormData={saveFormData} />;
            default:
                return <div>Form Completed!</div>;
        }
    };

    return (
        <div class="app-container">
            <header>
                <h1 style={{ 'margin-top': '0' }}>Skills, Lectures, and Motivation</h1>
                <h2>Application for Master Mathematics of Machine Learning and Data Science</h2>
                <p>
                    Please declare the details on your bachelor's field of study, your lectures and skills to be
                    recognized, and provide your answers to the motivation questions, by filling in this form and
                    then clicking "Save form data" at the bottom to save its contents to a file. Subsequently,
                    upload this file to your application in heiCO. <b>Please notice</b> that the form is filled locally
                    on your computer, i.e., your contents are not sent to any server.
                </p>
                <ProgressBar currentPage={currentPage} progress={progress} />
            </header>

            <main>
                {RenderPage()}
            </main>

            <div class="navigation">
                <button onClick={prevPage} disabled={currentPage() === 1}>
                    &larr; Previous
                </button>
                {currentPage() < MAX_PAGES ? (
                    <button onClick={nextPage} class="next-button">
                        Next &rarr;
                    </button>
                ) : (
                    <button onClick={saveFormData} class="save-button">
                        Save form data
                    </button>
                )}
            </div>
        </div>
    );
}