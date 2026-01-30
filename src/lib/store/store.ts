import { writable } from "svelte/store";
import { formTopics } from "$lib/topics";
import { formQuestions } from "$lib/questions";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
/* =========================
   Types
   ========================= */

export type GlobalLecture = {
  id: string;
  name: string;
  moduleDescription: string;
};

export type AreaLectureRef = {
  lectureId: string | null;
  skills: string[];
};

export type MathematicsData = {
  /** exactly 3 expected */
  area: string[];
  /** all lectures filled once, selectable in areas */
  globalLectures: GlobalLecture[];
  /** per-area selections + skills */
  areaLectures: Record<string, AreaLectureRef[]>;
};

export type ProgrammingLecture = { name: string; moduleDescription: string };
export type OpenSourceProject = {
  projectName: string;
  publicRepoLink: string;
  personalIdentifier: string;
};
export type ExtraCourse = { courseName: string; moduleDescription: string };

export type ProgrammingData = {
  lecturesEnabled: boolean;
  openSourceProjectsEnabled: boolean;
  extraCoursesEnabled: boolean;
  lectures: ProgrammingLecture[];
  openSourceProjects: OpenSourceProject[];
  extraCourses: ExtraCourse[];
};

export type FormDataField = {
  bachelorName: string;
  fieldsSelected: string[];
  comparableField: string;
};

export type MotivationAnswers = Record<string, string>;
export type Questions = string[];

export type Data = {
  timeSlots: any[];

  fieldDetails: FormDataField;
  mathematics: MathematicsData;

  programming: ProgrammingData;

  questions: MotivationAnswers;
};

/* =========================
   Defaults / Helpers
   ========================= */

const DEFAULT_PROGRAMMING: ProgrammingData = {
  lecturesEnabled: false,
  openSourceProjectsEnabled: false,
  extraCoursesEnabled: false,
  lectures: [{ name: "", moduleDescription: "" }],
  openSourceProjects: [
    { projectName: "", publicRepoLink: "", personalIdentifier: "" },
  ],
  extraCourses: [{ courseName: "", moduleDescription: "" }],
};

function newId(): string {
  return (
    Math.random().toString(36).slice(2) + "-" + Date.now().toString(36)
  );
}

function emptyMath(): MathematicsData {
  // Pre-create empty arrays for each known topic in areaLectures
  const allAreas = (Array.isArray(formTopics) ? formTopics : []).map(
    (t: any) => String(t.name)
  );
  const areaLectures: Record<string, AreaLectureRef[]> = {};
  for (const a of allAreas) areaLectures[a] = [];
  return {
    area: [],
    globalLectures: [{ id: newId(), name: "", moduleDescription: "" }],
    areaLectures,
  };
=======
const browser = typeof window !== "undefined";

/** ✅ Always returns a string (never false) */
=======
const browser = typeof window !== "undefined";

/* Always returns a string (never false) */
>>>>>>> Stashed changes
const makeId = (): string => {
  if (browser && typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
<<<<<<< Updated upstream
=======

export function removeLectureFromPool(id: string) {
  data.update((d) => {
    d.mathematics.lecturePool = d.mathematics.lecturePool.filter((l) => l.id !== id);
    return d;
  });
}
>>>>>>> Stashed changes

export const data = writable<Data>(loadData());

// Persist only in browser
if (browser) {
  data.subscribe((value) => {
    try {
      localStorage.setItem("data", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  });
}

function loadData(): Data {
  if (!browser) return generateEmptyDataObject(formQuestions);

  try {
    const rawText = localStorage.getItem("data");
    if (!rawText) return generateEmptyDataObject(formQuestions);

    const raw = JSON.parse(rawText);
    if (raw?.mathematics?.lecturePool && raw?.timeSlots && raw?.programming) {
      return raw as Data;
    }
    return generateEmptyDataObject(formQuestions);
  } catch {
    return generateEmptyDataObject(formQuestions);
  }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

function generateEmptyDataObject(questions: Questions): Data {
  const d: Data = {
    timeSlots: [],
    fieldDetails: {
      bachelorName: "",
      fieldsSelected: [],
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      comparableField: "",
    },
    mathematics: emptyMath(),
    programming: { ...DEFAULT_PROGRAMMING },
    questions: {} as MotivationAnswers,
  };
  for (const q of questions) d.questions[q] = "";
  return d;
}

/** Migrate old per-area lecture structure to new global+refs model if needed */
function migrateOldMathShape(parsed: any): MathematicsData {
  // If already new shape, normalize a bit and return
  if (parsed?.mathematics?.globalLectures && parsed?.mathematics?.areaLectures) {
    const mat = parsed.mathematics;
    const allAreas = (Array.isArray(formTopics) ? formTopics : []).map(
      (t: any) => String(t.name)
    );
    // Ensure all area keys exist
    for (const a of allAreas) {
      if (!Array.isArray(mat.areaLectures[a])) mat.areaLectures[a] = [];
    }
    return {
      area: Array.isArray(mat.area) ? mat.area : [],
      globalLectures: Array.isArray(mat.globalLectures)
        ? mat.globalLectures.map((g: any) => ({
            id: String(g?.id ?? newId()),
            name: String(g?.name ?? ""),
            moduleDescription: String(g?.moduleDescription ?? ""),
          }))
        : [{ id: newId(), name: "", moduleDescription: "" }],
      areaLectures: mat.areaLectures,
    };
  }

  // Old shape: mathematics.lectures[area] = [{ lectureName, moduleDescription, skills[] }]
  const areaToOldLects: Record<string, any[]> = parsed?.mathematics?.lectures ?? {};
  const selectedAreas: string[] = Array.isArray(parsed?.mathematics?.area)
    ? parsed.mathematics.area
    : [];

  // Build unique global lectures from all areas by (name+moduleDescription)
  const uniqMap = new Map<string, GlobalLecture>();
  const keyOf = (name: string, desc: string) =>
    `n=${(name ?? "").trim()}|d=${(desc ?? "").trim()}`;

  // Scan old lectures and collect unique global items
  Object.entries(areaToOldLects).forEach(([areaName, list]) => {
    (Array.isArray(list) ? list : []).forEach((lec) => {
      const name = String(lec?.lectureName ?? "");
      const desc = String(lec?.moduleDescription ?? "");
      const key = keyOf(name, desc);
      if (!uniqMap.has(key)) {
        uniqMap.set(key, { id: newId(), name, moduleDescription: desc });
      }
    });
  });

  // Ensure at least one blank row so the UI always has an editable line
  if (uniqMap.size === 0) {
    uniqMap.set(keyOf("", ""), { id: newId(), name: "", moduleDescription: "" });
  }

  const globalLectures = Array.from(uniqMap.values());

  // Build areaLectures refs
  const allAreas = (Array.isArray(formTopics) ? formTopics : []).map(
    (t: any) => String(t.name)
  );
  const areaLectures: Record<string, AreaLectureRef[]> = {};
  for (const areaName of allAreas) {
    const oldList = (Array.isArray(areaToOldLects[areaName])
      ? areaToOldLects[areaName]
      : []) as any[];
    areaLectures[areaName] = oldList.map((lec) => {
      const key = keyOf(String(lec?.lectureName ?? ""), String(lec?.moduleDescription ?? ""));
      const ref = uniqMap.get(key);
      return {
        lectureId: ref ? ref.id : null,
        skills: Array.isArray(lec?.skills) ? lec.skills.slice() : [],
      };
    });
  }

  return {
    area: selectedAreas,
    globalLectures,
    areaLectures,
  };
}

/** Normalize whole Data from localStorage / remote file */
function hydrateWithDefaults(parsed: any): Data {
  // timeSlot -> timeSlots (old key)
  if (Array.isArray(parsed?.timeSlot) && !parsed?.timeSlots) {
    parsed.timeSlots = parsed.timeSlot;
  }

  // — Mathematics —
  const mathematics = migrateOldMathShape(parsed);

  // — Programming —
  const programming: ProgrammingData = {
    lecturesEnabled: !!parsed?.programming?.lecturesEnabled,
    openSourceProjectsEnabled: !!parsed?.programming?.openSourceProjectsEnabled,
    extraCoursesEnabled: !!parsed?.programming?.extraCoursesEnabled,
    lectures: Array.isArray(parsed?.programming?.lectures)
      ? parsed.programming.lectures.map((x: any) => ({
          name: String(x?.name ?? ""),
          moduleDescription: String(x?.moduleDescription ?? ""),
        }))
      : [...DEFAULT_PROGRAMMING.lectures],
    openSourceProjects: Array.isArray(parsed?.programming?.openSourceProjects)
      ? parsed.programming.openSourceProjects.map((x: any) => ({
          projectName: String(x?.projectName ?? ""),
          publicRepoLink: String(x?.publicRepoLink ?? ""),
          personalIdentifier: String(x?.personalIdentifier ?? ""),
        }))
      : [...DEFAULT_PROGRAMMING.openSourceProjects],
    extraCourses: Array.isArray(parsed?.programming?.extraCourses)
      ? parsed.programming.extraCourses.map((x: any) => ({
          courseName: String(x?.courseName ?? ""),
          moduleDescription: String(x?.moduleDescription ?? ""),
        }))
      : [...DEFAULT_PROGRAMMING.extraCourses],
  };

  const out: Data = {
    timeSlots: Array.isArray(parsed?.timeSlots) ? parsed.timeSlots : [],

    fieldDetails: {
      bachelorName: String(parsed?.fieldDetails?.bachelorName ?? ""),
      fieldsSelected: Array.isArray(parsed?.fieldDetails?.fieldsSelected)
        ? parsed.fieldDetails.fieldsSelected
        : [],
      comparableField: String(parsed?.fieldDetails?.comparableField ?? ""),
    },

    mathematics,
    programming,

    questions: (() => {
      const out: MotivationAnswers = {};
      const keys: Questions = Array.isArray(formQuestions) ? formQuestions : [];
      for (const q of keys) out[q] = String(parsed?.questions?.[q] ?? "");
      return out;
    })(),
  };

  return out;
=======
=======
>>>>>>> Stashed changes
      comparableField: ""
    },
    mathematics: {
      area: [],
      lectures: Object.fromEntries(formTopics.map((topic) => [topic.name, []])) as Record<string, Lectures>,
<<<<<<< Updated upstream
      lecturePool: [{ id: makeId(), lectureName: "", moduleDescription: "" }]
=======
      lecturePool: [{ id: makeId(), lectureName: "", grade: "", moduleDescription: "" }]

>>>>>>> Stashed changes
    },
    programming: {
      lectures: [{ name: "", moduleDescription: "" }],
      openSourceProjects: [{ projectName: "", publicRepoLink: "", personalIdentifier: "" }],
      extraCourses: [{ courseName: "", moduleDescription: "" }],
      lecturesEnabled: false,
      openSourceProjectsEnabled: false,
      extraCoursesEnabled: false
    },
    questions: {} as MotivationAnswers
  };

  for (const question of questions) d.questions[question] = "";
  return d;
}

export async function loadEvalData(filename: string) {
  const baseUrl = import.meta.env.VITE_BUILD_URL || "https://dacs-informatik.iwr.uni-heidelberg.de";
  const file = `${baseUrl}/data/${filename}`;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Unable to load file");
    return await response.json();
  } catch (error) {
    console.error("Error loading file:", error);
    return generateEmptyDataObject(formQuestions);
  }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

/* =========================
   Load / Persist
   ========================= */

function loadData(): Data {
  try {
    const raw = localStorage.data;
    if (!raw) return generateEmptyDataObject(formQuestions);
    const parsed = JSON.parse(raw);
    return hydrateWithDefaults(parsed);
  } catch {
    return generateEmptyDataObject(formQuestions);
  }
}

export const data = writable<Data>(loadData());

data.subscribe((value) => {
  try {
    localStorage.data = JSON.stringify(value);
  } catch {
    // ignore
  }
});

export async function loadEvalData(filename: string): Promise<Data> {
  const url =
    import.meta.env.VITE_BUILD_URL
      ? import.meta.env.VITE_BUILD_URL
      : "https://dacs-informatik.iwr.uni-heidelberg.de";
  const file = `${url}/data/${filename}`;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("Unable to load file");
    const json = await res.json();
    return hydrateWithDefaults(json);
  } catch (e) {
    console.error("Error loading file:", e);
    return generateEmptyDataObject(formQuestions);
  }
}

/* =========================
   Field selection helpers (unchanged)
   ========================= */

export function setBachelorName(name: string) {
  data.update((d) => ({
    ...d,
    fieldDetails: { ...d.fieldDetails, bachelorName: name }
  }));
}

export function setComparableField(value: string) {
  data.update((d) => ({
    ...d,
    fieldDetails: { ...d.fieldDetails, comparableField: value }
  }));
}

export function setBachelorName(name: string) {
  data.update((d) => ({
    ...d,
    fieldDetails: { ...d.fieldDetails, bachelorName: name }
  }));
}

export function setComparableField(value: string) {
  data.update((d) => ({
    ...d,
    fieldDetails: { ...d.fieldDetails, comparableField: value }
  }));
}

export function toggleStudyField(field: string, isChecked: boolean) {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    if (isChecked) {
      if (!d.fieldDetails.fieldsSelected.includes(field)) {
        d.fieldDetails.fieldsSelected.push(field);
      }
    } else {
      d.fieldDetails.fieldsSelected = d.fieldDetails.fieldsSelected.filter(
        (f) => f !== field
      );
    }
    return d;
  });
=======
    const selected = new Set(d.fieldDetails.fieldsSelected);
    if (isChecked) selected.add(field);
    else selected.delete(field);

    return {
      ...d,
      fieldDetails: { ...d.fieldDetails, fieldsSelected: Array.from(selected) }
    };
  });
}

// ==================== QUESTIONS ====================

export function setQuestionAnswer(question: string, answer: string) {
  data.update((d) => ({
    ...d,
    questions: { ...d.questions, [question]: answer }
  }));
>>>>>>> Stashed changes
}

/* =========================
   Mathematics — NEW API
   ========================= */

<<<<<<< Updated upstream
function ensureAreaArray(d: Data, areaName: string) {
  if (!Array.isArray(d.mathematics.areaLectures[areaName])) {
    d.mathematics.areaLectures[areaName] = [];
  }
}

export function selectArea(areaName: string) {
  data.update((d) => {
      const index = d.mathematics.area.indexOf(areaName);
      if (index === -1) {
          d.mathematics.area = [...d.mathematics.area, areaName];
      } else {
          d.mathematics.area = d.mathematics.area.filter((area) => area !== areaName);
      }
      return d;
  });
}

export function addGlobalLecture() {
  data.update((d) => {
    d.mathematics.globalLectures.push({
      id: newId(),
      name: "",
      moduleDescription: "",
    });
    return d;
  });
=======
    const selected = new Set(d.fieldDetails.fieldsSelected);
    if (isChecked) selected.add(field);
    else selected.delete(field);

    return {
      ...d,
      fieldDetails: { ...d.fieldDetails, fieldsSelected: Array.from(selected) }
    };
  });
}

// ==================== QUESTIONS ====================

export function setQuestionAnswer(question: string, answer: string) {
  data.update((d) => ({
    ...d,
    questions: { ...d.questions, [question]: answer }
  }));
>>>>>>> Stashed changes
}

export function removeGlobalLecture(id: string) {
  data.update((d) => {
    // remove global
    d.mathematics.globalLectures = d.mathematics.globalLectures.filter(
      (g) => g.id !== id
    );
    // cascade: drop refs in all areas
    for (const area of Object.keys(d.mathematics.areaLectures)) {
      d.mathematics.areaLectures[area] = d.mathematics.areaLectures[area].filter(
        (r) => r.lectureId !== id
      );
    }
    // Always keep at least one empty row to edit
    if (d.mathematics.globalLectures.length === 0) {
      d.mathematics.globalLectures.push({
        id: newId(),
        name: "",
        moduleDescription: "",
      });
    }
    return d;
  });
}

<<<<<<< Updated upstream
export function updateGlobalLectureName(id: string, name: string) {
  data.update((d) => {
    const item = d.mathematics.globalLectures.find((g) => g.id === id);
    if (item) item.name = name;
    return d;
  });
}

export function updateGlobalLectureDescription(id: string, moduleDescription: string) {
  data.update((d) => {
    const item = d.mathematics.globalLectures.find((g) => g.id === id);
    if (item) item.moduleDescription = moduleDescription;
    return d;
  });
}

export function addAreaLecture(areaName: string) {
  data.update((d) => {
    ensureAreaArray(d, areaName);
    d.mathematics.areaLectures[areaName].push({
      lectureId: null,
      skills: [],
    });
    return d;
  });
}

export function removeAreaLecture(areaName: string, idx: number) {
  data.update((d) => {
    ensureAreaArray(d, areaName);
    const list = d.mathematics.areaLectures[areaName];
    if (idx >= 0 && idx < list.length) list.splice(idx, 1);
    return d;
  });
}

export function setAreaLecture(areaName: string, idx: number, lectureId: string | null) {
  data.update((d) => {
    ensureAreaArray(d, areaName);
    const row = d.mathematics.areaLectures[areaName]?.[idx];
    if (row) row.lectureId = lectureId;
    return d;
  });
}

export function toggleAreaSkill(
  areaName: string,
  idx: number,
  skill: string,
  checked: boolean
) {
  data.update((d) => {
    ensureAreaArray(d, areaName);
    const row = d.mathematics.areaLectures[areaName]?.[idx];
    if (row) {
      if (checked) {
        if (!row.skills.includes(skill)) row.skills.push(skill);
      } else {
        row.skills = row.skills.filter((s) => s !== skill);
      }
    }
    return d;
  });
}

/* (Optional) keep old names as wrappers for backward compatibility */
export const addLecture = addAreaLecture;
export const removeLecture = removeAreaLecture;
export const toggleSkill = toggleAreaSkill;
=======
=======
>>>>>>> Stashed changes
export function toggleTimeSlot(slotName: string, checked: boolean) {
  data.update((d) => {
    const slots = new Set(d.timeSlots);
    if (checked) slots.add(slotName);
    else slots.delete(slotName);

    return { ...d, timeSlots: Array.from(slots) };
  });
}

// ==================== MATH AREAS ====================

export function selectArea(areaName: string, previousArea?: string) {
  data.update((d) => {
    const current = new Set(d.mathematics.area);

    if (previousArea && previousArea !== areaName) current.delete(previousArea);
    current.add(areaName);

    return {
      ...d,
      mathematics: { ...d.mathematics, area: Array.from(current) }
    };
  });
}

// ==================== LECTURE POOL ====================

export function addPoolLecture() {
  data.update((d) => {
    const prevPool = d.mathematics?.lecturePool ?? [];
<<<<<<< Updated upstream
    const newLecture: PoolLecture = { id: makeId(), lectureName: "", moduleDescription: "" };
=======
    const newLecture: PoolLecture = {
      id: makeId(),
      lectureName: "",
      grade: "",
      moduleDescription: ""
    };
>>>>>>> Stashed changes

    return {
      ...d,
      mathematics: {
        ...d.mathematics,
        lecturePool: [...prevPool, newLecture]
      }
    };
  });
}

<<<<<<< Updated upstream
export function updatePoolLecture(
  id: string,
  patch: Partial<{ lectureName: string; moduleDescription: string }>
) {
=======

export function updatePoolLecture(
  id: string,
  patch: Partial<{ lectureName: string; grade: string; moduleDescription: string }>
)
 {
>>>>>>> Stashed changes
  data.update((d) => {
    const lecturePool = d.mathematics.lecturePool.map((l) => (l.id === id ? { ...l, ...patch } : l));

    const lectures: Record<string, Lectures> = { ...d.mathematics.lectures };
    for (const area of Object.keys(lectures)) {
      lectures[area] = (lectures[area] ?? []).map((l) => (l.id === id ? { ...l, ...patch } : l));
    }

    return {
      ...d,
      mathematics: { ...d.mathematics, lecturePool, lectures }
    };
  });
}

export function removePoolLecture(id: string) {
  data.update((d) => {
    const lecturePool = d.mathematics.lecturePool.filter((l) => l.id !== id);

    const lectures: Record<string, Lectures> = { ...d.mathematics.lectures };
    for (const area of Object.keys(lectures)) {
      lectures[area] = (lectures[area] ?? []).filter((l) => l.id !== id);
    }

    return {
      ...d,
      mathematics: { ...d.mathematics, lecturePool, lectures }
    };
  });
}
>>>>>>> Stashed changes

/* =========================
   Programming helpers (unchanged from your fixed version)
   ========================= */

<<<<<<< Updated upstream
const flagKeyMap = {
  lectures: "lecturesEnabled",
  openSourceProjects: "openSourceProjectsEnabled",
  extraCourses: "extraCoursesEnabled",
} as const;
=======
export function assignLectureToArea(areaName: string, lectureId: string) {
  data.update((d) => {
    const pool = d.mathematics.lecturePool.find((l) => l.id === lectureId);
    if (!pool) return d;

    const areaLectures = d.mathematics.lectures[areaName] ?? [];
    if (areaLectures.some((l) => l.id === lectureId)) return d;

    const updatedArea = [
      ...areaLectures,
      {
        id: lectureId,
        lectureName: pool.lectureName,
<<<<<<< Updated upstream
=======
        grade: pool.grade,
>>>>>>> Stashed changes
        moduleDescription: pool.moduleDescription,
        skills: []
      }
    ];

    return {
      ...d,
      mathematics: {
        ...d.mathematics,
        lectures: { ...d.mathematics.lectures, [areaName]: updatedArea }
      }
    };
  });
}

export function removeLecture(areaName: string, lectureIdx: number) {
  data.update((d) => {
    const areaLectures = d.mathematics.lectures[areaName] ?? [];
    const updatedArea = areaLectures.filter((_, idx) => idx !== lectureIdx);

    return {
      ...d,
      mathematics: {
        ...d.mathematics,
        lectures: { ...d.mathematics.lectures, [areaName]: updatedArea }
      }
    };
  });
}

export function toggleSkill(areaName: string, lectureIdx: number, skill: string, checked: boolean) {
  data.update((d) => {
    const areaLectures = d.mathematics.lectures[areaName] ?? [];
    const lecture = areaLectures[lectureIdx];
    if (!lecture) return d;

    const skills = new Set(lecture.skills ?? []);
    if (checked) skills.add(skill);
    else skills.delete(skill);

    const updatedLecture = { ...lecture, skills: Array.from(skills) };
    const updatedArea = areaLectures.map((l, idx) => (idx === lectureIdx ? updatedLecture : l));

    return {
      ...d,
      mathematics: {
        ...d.mathematics,
        lectures: { ...d.mathematics.lectures, [areaName]: updatedArea }
      }
    };
  });
}

// ==================== PROGRAMMING ====================

function ensureProgramming(d: Data): ProgrammingData {
  return (
    d.programming ?? {
      lectures: [{ name: "", moduleDescription: "" }],
      openSourceProjects: [{ projectName: "", publicRepoLink: "", personalIdentifier: "" }],
      extraCourses: [{ courseName: "", moduleDescription: "" }],
      lecturesEnabled: false,
      openSourceProjectsEnabled: false,
      extraCoursesEnabled: false
    }
  );
<<<<<<< Updated upstream
}

export function setProgrammingEnabled(
  key: "lecturesEnabled" | "openSourceProjectsEnabled" | "extraCoursesEnabled",
  enabled: boolean
) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    return { ...d, programming: { ...prog, [key]: enabled } };
  });
}
>>>>>>> Stashed changes

export function toggleProgrammingCategory(
  category: "lectures" | "openSourceProjects" | "extraCourses",
  checked: boolean
) {
<<<<<<< Updated upstream
  data.update((d) => {
    const key = flagKeyMap[category];
    d.programming[key] = checked;
    return d;
  });
=======
=======
}

export function setProgrammingEnabled(
  key: "lecturesEnabled" | "openSourceProjectsEnabled" | "extraCoursesEnabled",
  enabled: boolean
) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    return { ...d, programming: { ...prog, [key]: enabled } };
  });
}

export function toggleProgrammingCategory(
  category: "lectures" | "openSourceProjects" | "extraCourses",
  checked: boolean
) {
>>>>>>> Stashed changes
  const key =
    category === "lectures"
      ? "lecturesEnabled"
      : category === "openSourceProjects"
      ? "openSourceProjectsEnabled"
      : "extraCoursesEnabled";

  setProgrammingEnabled(key, checked);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export function addProgrammingLecture() {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    d.programming.lectures.push({ name: "", moduleDescription: "" });
    return d;
=======
=======
>>>>>>> Stashed changes
    const prog = ensureProgramming(d);
    return {
      ...d,
      programming: { ...prog, lectures: [...(prog.lectures ?? []), { name: "", moduleDescription: "" }] }
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
}
export function removeProgrammingLecture(idx: number) {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const list = d.programming.lectures;
    if (idx >= 0 && idx < list.length) list.splice(idx, 1);
    return d;
=======
    const prog = ensureProgramming(d);
    return { ...d, programming: { ...prog, lectures: (prog.lectures ?? []).filter((_, i) => i !== idx) } };
  });
=======
    const prog = ensureProgramming(d);
    return { ...d, programming: { ...prog, lectures: (prog.lectures ?? []).filter((_, i) => i !== idx) } };
  });
}

export function setProgrammingLectureField(idx: number, key: "name" | "moduleDescription", value: string) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    const lectures = [...(prog.lectures ?? [])];
    const row = { ...(lectures[idx] ?? { name: "", moduleDescription: "" }) };
    row[key] = value;
    lectures[idx] = row;

    return { ...d, programming: { ...prog, lectures } };
  });
>>>>>>> Stashed changes
}

export function setProgrammingLectureField(idx: number, key: "name" | "moduleDescription", value: string) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    const lectures = [...(prog.lectures ?? [])];
    const row = { ...(lectures[idx] ?? { name: "", moduleDescription: "" }) };
    row[key] = value;
    lectures[idx] = row;

    return { ...d, programming: { ...prog, lectures } };
>>>>>>> Stashed changes
  });
}
export function addOpenSourceProject() {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    d.programming.openSourceProjects.push({
      projectName: "",
      publicRepoLink: "",
      personalIdentifier: "",
    });
    return d;
=======
=======
>>>>>>> Stashed changes
    const prog = ensureProgramming(d);
    return {
      ...d,
      programming: {
        ...prog,
        openSourceProjects: [
          ...(prog.openSourceProjects ?? []),
          { projectName: "", publicRepoLink: "", personalIdentifier: "" }
        ]
      }
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  });
}
export function removeOpenSourceProject(idx: number) {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const list = d.programming.openSourceProjects;
    if (idx >= 0 && idx < list.length) list.splice(idx, 1);
    return d;
=======
=======
>>>>>>> Stashed changes
    const prog = ensureProgramming(d);
    return {
      ...d,
      programming: { ...prog, openSourceProjects: (prog.openSourceProjects ?? []).filter((_, i) => i !== idx) }
    };
  });
<<<<<<< Updated upstream
=======
}

export function setOpenSourceProjectField(
  idx: number,
  key: "projectName" | "publicRepoLink" | "personalIdentifier",
  value: string
) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    const openSourceProjects = [...(prog.openSourceProjects ?? [])];
    const row = { ...(openSourceProjects[idx] ?? { projectName: "", publicRepoLink: "", personalIdentifier: "" }) };
    row[key] = value;
    openSourceProjects[idx] = row;

    return { ...d, programming: { ...prog, openSourceProjects } };
  });
>>>>>>> Stashed changes
}

export function setOpenSourceProjectField(
  idx: number,
  key: "projectName" | "publicRepoLink" | "personalIdentifier",
  value: string
) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    const openSourceProjects = [...(prog.openSourceProjects ?? [])];
    const row = { ...(openSourceProjects[idx] ?? { projectName: "", publicRepoLink: "", personalIdentifier: "" }) };
    row[key] = value;
    openSourceProjects[idx] = row;

    return { ...d, programming: { ...prog, openSourceProjects } };
>>>>>>> Stashed changes
  });
}
export function addProgrammingCourse() {
  data.update((d) => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    d.programming.extraCourses.push({ courseName: "", moduleDescription: "" });
    return d;
=======
=======
>>>>>>> Stashed changes
    const prog = ensureProgramming(d);
    return {
      ...d,
      programming: { ...prog, extraCourses: [...(prog.extraCourses ?? []), { courseName: "", moduleDescription: "" }] }
    };
<<<<<<< Updated upstream
>>>>>>> Stashed changes
  });
}
export function removeProgrammingCourse(idx: number) {
  data.update((d) => {
<<<<<<< Updated upstream
    const list = d.programming.extraCourses;
    if (idx >= 0 && idx < list.length) list.splice(idx, 1);
    return d;
  });
}

/* =========================
   Validation (updated for new math model)
   ========================= */

export function isValidFormData(d: Data): boolean {
  const errors: Record<string, string[]> = {
    InterviewTime: [],
    Education: [],
    MathSkills: [],
    Questions: [],
    ProgrammingSkills: [],
  };

  // InterviewTime
  if (!d.timeSlots || d.timeSlots.length === 0) {
    errors.InterviewTime.push("Select at least one time slot.");
  }

  // Education
  if (!d.fieldDetails.bachelorName) {
    errors.Education.push("Bachelor name is required.");
  }
  if (!d.fieldDetails.fieldsSelected.length) {
    errors.Education.push("At least one field must be selected.");
  }

  // Mathematics — exactly 3 areas expected
  if (d.mathematics.area.length < 3) {
    errors.MathSkills.push("You must select all 3 areas.");
  }

  // Global lectures should exist and be non-empty
  if (!d.mathematics.globalLectures.length) {
    errors.MathSkills.push("Add at least one Mathematics lecture above.");
  }

  // Validate each selected area: must pick lectures from dropdown, and referenced lectures must be valid
  const byId = new Map(d.mathematics.globalLectures.map((g) => [g.id, g]));
  for (const areaName of d.mathematics.area) {
    const rows = d.mathematics.areaLectures[areaName] ?? [];
    if (!rows.length) {
      errors.MathSkills.push(`No lecture selected for "${areaName}".`);
      continue;
    }
    rows.forEach((row, idx) => {
      if (!row.lectureId) {
        errors.MathSkills.push(
          `Row #${idx + 1} in "${areaName}": please select a lecture from the dropdown.`
        );
        return;
      }
      const gl = byId.get(row.lectureId);
      if (!gl) {
        errors.MathSkills.push(
          `Row #${idx + 1} in "${areaName}": selected lecture not found.`
        );
        return;
      }
      if (!gl.name?.trim()) {
        errors.MathSkills.push(
          `Row #${idx + 1} in "${areaName}": lecture name is empty in the global list.`
        );
      }
      if (!gl.moduleDescription?.trim()) {
        errors.MathSkills.push(
          `Row #${idx + 1} in "${areaName}": module description is empty in the global list.`
        );
      }
      // To require at least one skill per lecture, uncomment:
      // if (!row.skills.length) {
      //   errors.MathSkills.push(`Row #${idx + 1} in "${areaName}": select at least one skill.`);
      // }
    });
  }

  // Programming (unchanged)
  if (d.programming.lecturesEnabled) {
    d.programming.lectures.forEach((lec, idx) => {
      if (!lec.name?.trim() || !lec.moduleDescription?.trim()) {
        errors.ProgrammingSkills.push(
          `Lecture #${idx + 1} in Programming missing name or description.`
        );
      }
    });
  }
  if (d.programming.openSourceProjectsEnabled) {
    d.programming.openSourceProjects.forEach((proj, idx) => {
      if (
        !proj.projectName?.trim() ||
        !proj.publicRepoLink?.trim() ||
        !proj.personalIdentifier?.trim()
      ) {
        errors.ProgrammingSkills.push(
          `Open Source Project #${idx + 1} missing name, link or identifier.`
        );
      }
    });
  }
  if (d.programming.extraCoursesEnabled) {
    d.programming.extraCourses.forEach((course, idx) => {
      if (!course.courseName?.trim()) {
        errors.ProgrammingSkills.push(
          `Course #${idx + 1} in Programming missing course name.`
        );
      }
    });
  }

  // Questions
  for (const q of Object.keys(d.questions)) {
    if (!d.questions[q]) {
      errors.Questions.push(`Answer missing for: "${q}".`);
    }
  }

  const has =
    Object.values(errors).some((arr) => arr.length > 0);

  if (!has) return true;

  // Build grouped alert
  let message = "File cannot be created because some data is missing.\n\n";
  const sections: [string, string[]][] = [
    ["Interview Time", errors.InterviewTime],
    ["Education", errors.Education],
    ["Skills in Mathematics", errors.MathSkills],
    ["Programming Skills", errors.ProgrammingSkills],
    ["Questions", errors.Questions],
  ];
  for (const [title, arr] of sections) {
    if (arr.length) {
      message += `${title}:\n`;
      for (const e of arr) message += `  - ${e}\n`;
      message += "\n";
    }
  }
  alert(message);
  return false;
=======
=======
  });
}

export function removeProgrammingCourse(idx: number) {
  data.update((d) => {
>>>>>>> Stashed changes
    const prog = ensureProgramming(d);
    return { ...d, programming: { ...prog, extraCourses: (prog.extraCourses ?? []).filter((_, i) => i !== idx) } };
  });
}

export function setExtraCourseField(idx: number, key: "courseName" | "moduleDescription", value: string) {
  data.update((d) => {
    const prog = ensureProgramming(d);
    const extraCourses = [...(prog.extraCourses ?? [])];
    const row = { ...(extraCourses[idx] ?? { courseName: "", moduleDescription: "" }) };
    row[key] = value;
    extraCourses[idx] = row;

    return { ...d, programming: { ...prog, extraCourses } };
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

  if (!formData.timeSlots?.length) errors.InterviewTime.push("Please select at least one interview time slot.");

  if (!formData.fieldDetails.bachelorName) errors.Education.push("Bachelor name is required.");
  if (!formData.fieldDetails.fieldsSelected.length) errors.Education.push("At least one field must be selected.");

  const selectedAreas = formData.mathematics.area;
  if (selectedAreas.length < 2) errors.MathSkills.push("Please select at least 2 subject areas (A, B).");

  for (const areaName of selectedAreas) {
    const lectures = formData.mathematics.lectures[areaName] ?? [];
    if (!lectures.length) {
      errors.MathSkills.push(`No lecture entered for selected area "${areaName}".`);
      continue;
    }
    lectures.forEach((lec, idx) => {
      if (!lec.lectureName?.trim()) errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing name.`);
      if (!lec.moduleDescription?.trim())
        errors.MathSkills.push(`Lecture #${idx + 1} in "${areaName}" missing description.`);
    });
  }

  const prog = formData.programming;

  if (prog?.lecturesEnabled) {
    const filled = prog.lectures?.filter((l) => l.name?.trim() || l.moduleDescription?.trim());
    if (!filled?.length) errors.ProgrammingSkills.push("Lectures enabled but no data provided.");
    else {
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
    const filled = prog.openSourceProjects?.filter(
      (p) => p.projectName?.trim() || p.publicRepoLink?.trim() || p.personalIdentifier?.trim()
    );
    if (!filled?.length) errors.ProgrammingSkills.push("Open Source Projects enabled but no data provided.");
    else {
      prog.openSourceProjects?.forEach((proj, idx) => {
        const hasAll = proj.projectName?.trim() && proj.publicRepoLink?.trim() && proj.personalIdentifier?.trim();
        const hasAny = proj.projectName?.trim() || proj.publicRepoLink?.trim() || proj.personalIdentifier?.trim();
        if (hasAny && !hasAll) errors.ProgrammingSkills.push(`Project #${idx + 1}: All fields required.`);
      });
    }
  }

  if (prog?.extraCoursesEnabled) {
    const filled = prog.extraCourses?.filter((c) => c.courseName?.trim() || c.moduleDescription?.trim());
    if (!filled?.length) errors.ProgrammingSkills.push("Courses enabled but no data provided.");
    else {
      prog.extraCourses?.forEach((course, idx) => {
        if ((course.courseName?.trim() || course.moduleDescription?.trim()) && !course.courseName?.trim()) {
          errors.ProgrammingSkills.push(`Course #${idx + 1}: Course name required.`);
        }
      });
    }
  }

  for (const question of Object.keys(formData.questions)) {
    if (!formData.questions[question]) errors.Questions.push(`Answer missing for: "${question}".`);
  }

  const hasErrors = Object.values(errors).some((arr) => arr.length > 0);

  if (hasErrors) {
    let message = "File cannot be created because some data is missing.\n\n";
    for (const [section, errs] of Object.entries(errors)) {
      if (errs.length) message += `${section}:\n${errs.map((e) => `  - ${e}`).join("\n")}\n\n`;
    }
    alert(message);
    return false;
  }

  if (selectedAreas.length === 2) {
    const confirm2Areas = confirm(
      "You selected only two subject areas under Mathematics Skills.\n\nAre you sure you do not want to select a third one?"
    );
    if (!confirm2Areas) return false;
  }

  return true;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
