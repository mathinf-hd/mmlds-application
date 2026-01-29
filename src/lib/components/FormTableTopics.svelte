<script lang="ts">
<<<<<<< Updated upstream
  import {
    Button, Input, P,
    Table, TableBody, TableBodyCell, TableBodyRow,
    TableHead, TableHeadCell, Checkbox, Heading
  } from 'flowbite-svelte';
  import { TrashBinOutline } from 'flowbite-svelte-icons';

  import {
    data,
    addGlobalLecture,
    removeGlobalLecture,
    updateGlobalLectureName,
    updateGlobalLectureDescription,
    addAreaLecture,
    removeAreaLecture,
    setAreaLecture,
    toggleAreaSkill,
    selectArea,
  } from '$lib/store/store';
=======
import {
    Dropdown, DropdownItem, Radio,
    Button, CloseButton, Checkbox, Heading, Input, P, Table,
    TableBody, TableBodyCell, TableBodyRow,
    TableHead, TableHeadCell, Drawer, Textarea, Modal
} from 'flowbite-svelte';
import { TrashBinOutline, ChevronDownOutline, EditOutline } from 'flowbite-svelte-icons';
import { formTopics } from '$lib/topics';
import {
    addPoolLecture,
    assignLectureToArea,
    data,
    removeLecture,
    removePoolLecture,
    selectArea,
    toggleSkill,
    updatePoolLecture
} from '$lib/store/store';
import { sineIn } from 'svelte/easing';
import { onMount } from 'svelte';

// Initialize from store to restore "previous" context and prevent ghost data on change
let areaA = $data.mathematics.area[0] ?? 'Please select Area A';
let areaB = $data.mathematics.area[1] ?? 'Please select Area B';
let areaC = $data.mathematics.area[2] ?? 'Please select Area C';
>>>>>>> Stashed changes

  import { formTopics } from '$lib/topics';

  function getSkillsForArea(areaName: string): string[] {
    const topic = (formTopics as any[]).find((t) => t.name === areaName);
    return Array.isArray(topic?.skills) ? topic.skills : [];
  }

  function glLabel(gl: { name: string; moduleDescription: string }) {
    const n = gl.name?.trim() || '(no name)';
    const d = gl.moduleDescription?.trim() || '(no description)';
    return `${n} — ${d}`;
  }

<<<<<<< Updated upstream
  // Flowbite-Svelte <Input> emits CustomEvent with value at e.detail.value
  const inputVal = (e: any) =>
    e?.detail?.value ?? e?.detail ?? e?.target?.value ?? e?.currentTarget?.value ?? '';

  // Flowbite-Svelte <Checkbox> emits CustomEvent<boolean> at e.detail
  const checkboxChecked = (e: any) =>
    (typeof e?.detail === 'boolean' ? e.detail : e?.detail?.checked) ??
    e?.target?.checked ?? e?.currentTarget?.checked ?? false;

  // Native <select> change: cast to HTMLSelectElement
  const selectVal = (e: Event) => (e.target as HTMLSelectElement)?.value ?? '';
=======
// Flowbite-Svelte Input can emit either native events or CustomEvent.
// This helper safely extracts the value.
const inputVal = (e: any) => {
  // Native input event (preferred)
  const v1 = e?.target?.value ?? e?.currentTarget?.value;
  if (v1 !== undefined) return v1;

  // Flowbite-svelte may dispatch CustomEvent with detail payload
  const detail = e?.detail;
  if (detail && typeof detail === "object" && "value" in detail) return (detail as any).value;
  if (typeof detail === "string") return detail;

  return "";
};

function onPoolLectureNameInput(id: string, e: Event) {
    updatePoolLecture(id, { lectureName: String(inputVal(e)) });
}

function onPoolLectureDescInput(id: string, e: Event) {
    updatePoolLecture(id, { moduleDescription: String(inputVal(e)) });
}

// REACTIVE: Pool + lookup map (single source of truth)
$: pool = $data.mathematics.lecturePool ?? [];
$: poolById = new Map(pool.map((p) => [p.id, p]));

// REACTIVE: Compute available lectures per area whenever store changes
$: hasFilledPoolLectures = pool.some(p => p.lectureName?.trim() || p.moduleDescription?.trim());

// REACTIVE: Build a map of available lectures for each topic
$: availableByArea = Object.fromEntries(
    formTopics.map(topic => {
        const usedIds = new Set(($data.mathematics.lectures[topic.name] ?? []).map(l => l.id));
        const available = pool.filter(p => p.id && !usedIds.has(p.id));
        return [topic.name, available];
    })
);

// Prune empty rows on mount (cleanup old data)
// IMPORTANT: keep rows that have an id (because name/desc may be derived from pool)
onMount(() => {
    data.update(d => {
        for (const area of Object.keys(d.mathematics.lectures)) {
            d.mathematics.lectures[area] = (d.mathematics.lectures[area] ?? []).filter(lec => {
                const name = lec.lectureName?.trim();
                const desc = lec.moduleDescription?.trim();
                const hasSkills = (lec.skills?.length ?? 0) > 0;
                return !!(lec.id || name || desc || hasSkills);
            });
        }
        return d;
    });
});

// Modal state
let openModal = false;
let currentEditingId: string | null = null;
let currentEditingName = '';
let currentEditingDescription = '';

function openDescriptionModal(id: string, name: string, description: string) {
    currentEditingId = id;
    currentEditingName = name ?? '';
    currentEditingDescription = description ?? '';
    openModal = true;
}

function saveDescription() {
    if (currentEditingId) {
        updatePoolLecture(currentEditingId, { moduleDescription: currentEditingDescription });
    }
    openModal = false;
}
>>>>>>> Stashed changes
</script>

<Heading tag="h3" class="mb-3">Mathematics — Global Lectures</Heading>
<P class="mb-2">
  Add each Mathematics lecture once (as in your transcript). Later, select them per area.
</P>

<<<<<<< Updated upstream
<Table class="overflow-x-auto" striped={true}>
  <TableHead class="normal-case bg-primary-700 text-white">
    <TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
    <TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
    <TableHeadCell class="text-2xs p-2"></TableHeadCell>
  </TableHead>
  <TableBody>
    {#each $data.mathematics.globalLectures as gl, idx (gl.id)}
      <TableBodyRow>
        <TableBodyCell class="p-2">
          <Input
            type="text"
            class="text-2xs"
            value={gl.name}
            on:input={(e) => updateGlobalLectureName(gl.id, inputVal(e))}
          />
        </TableBodyCell>
        <TableBodyCell class="p-2">
          <Input
            type="text"
            class="text-2xs"
            value={gl.moduleDescription}
            on:input={(e) => updateGlobalLectureDescription(gl.id, inputVal(e))}
          />
        </TableBodyCell>
        <TableBodyCell class="p-2">
          <Button color="red" size="xs" class="text-2xs" on:click={() => removeGlobalLecture(gl.id)}>
            <TrashBinOutline />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
<Button class="text-2xs m-2" on:click={() => addGlobalLecture()}>
  Add Another Lecture
</Button>

<Heading tag="h3" class="mt-8 mb-3">Select 3 Areas</Heading>
<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
  {#each formTopics as t}
    <Button
      size="xs"
      outline={!$data.mathematics.area.includes(t.name)}
      on:click={() => selectArea(t.name)}
      class="justify-start"
    >
      {#if $data.mathematics.area.includes(t.name)}✓ {/if}{t.name}
    </Button>
  {/each}
</div>
<P class="mt-2 text-2xs opacity-70">Tip: Click an area to add it (you need exactly 3).</P>

{#each $data.mathematics.area as areaName}
  <div class="my-6 border rounded-xl p-4">
    <Heading tag="h4" class="mb-3">{areaName}</Heading>

    <Table class="overflow-x-auto" striped={true}>
      <TableHead class="normal-case bg-primary-700 text-white">
        <TableHeadCell class="min-w-60 text-2xs p-2">Select Lecture</TableHeadCell>
        <TableHeadCell class="text-2xs p-2">Skills</TableHeadCell>
        <TableHeadCell class="text-2xs p-2"></TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $data.mathematics.areaLectures[areaName] ?? [] as row, idx}
          <TableBodyRow>
            <TableBodyCell class="p-2">
              <select
                class="w-full text-xs border rounded px-2 py-1"
                on:change={(e) => setAreaLecture(areaName, idx, selectVal(e) || null)}
              >
                <option value=''>— choose from global lectures —</option>
                {#each $data.mathematics.globalLectures as gl}
                  <option value={gl.id} selected={row.lectureId === gl.id}>
                    {glLabel(gl)}
                  </option>
                {/each}
              </select>
            </TableBodyCell>

            <TableBodyCell class="p-2">
              <div class="flex flex-wrap gap-2">
                {#each getSkillsForArea(areaName) as skill}
                  <label class="flex items-center gap-1 text-2xs">
                    <Checkbox
                      checked={row.skills.includes(skill)}
                      on:change={(e) => toggleAreaSkill(areaName, idx, skill, checkboxChecked(e))}
                    />
                    <span>{skill}</span>
                  </label>
                {/each}
              </div>
            </TableBodyCell>

            <TableBodyCell class="p-2">
              <Button color="red" size="xs" class="text-2xs" on:click={() => removeAreaLecture(areaName, idx)}>
                <TrashBinOutline />
              </Button>
            </TableBodyCell>
          </TableBodyRow>
=======
<!-- ==================== STEP 1: LECTURE POOL ==================== -->
<div class="my-6">
    <Heading tag="h4" class="mb-3">Step 1: Enter your Mathematics lectures (once)</Heading>

    <P class="mb-4 text-sm">
        To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript.
        Copy and paste the entire official description of the lecture
        (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field
        (after translation to English using some automatic translation service, in case it is not given in English).
    </P>

    <Table class="overflow-x-auto" striped={true}>
        <TableHead class="normal-case bg-primary-700 text-white">
            <TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
            <TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
            <TableHeadCell class="text-2xs p-2"></TableHeadCell>
        </TableHead>
        <TableBody>
            {#each pool as poolLec (poolLec.id)}
                <TableBodyRow>
                    <TableBodyCell class="p-2 align-top">
                        <Input
                            type="text"
                            value={poolLec.lectureName}
                            on:input={(e) => onPoolLectureNameInput(poolLec.id, e)}
                            class="text-2xs"
                            placeholder="e.g. Analysis I"
                        />
                    </TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs align-top">
                        <div class="relative flex items-center">
                            <Input
                                type="text"
                                value={poolLec.moduleDescription}
                                on:input={(e) => onPoolLectureDescInput(poolLec.id, e)}
                                class="text-2xs pr-8"
                                placeholder="Paste description or click expand..."
                            />
                            <button
                                class="absolute right-2 text-gray-500 hover:text-primary-700 cursor-pointer"
                                on:click={() => openDescriptionModal(
                                    poolLec.id,
                                    poolLec.lectureName ?? '',
                                    poolLec.moduleDescription ?? ''
                                )}
                                title="Open full editor"
                                tabindex="-1"
                            >
                                <EditOutline size="xs" />
                            </button>
                        </div>
                    </TableBodyCell>
                    <TableBodyCell class="p-2 align-top">
                        <Button color="red" size="xs" class="text-2xs" on:click={() => removePoolLecture(poolLec.id)}>
                            <TrashBinOutline />
                        </Button>
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    <Button class="text-2xs m-2" on:click={() => addPoolLecture()}>Add lecture to pool</Button>
</div>

<!-- Description Editor Modal -->
<Modal bind:open={openModal} size="lg" autoclose={false} class="w-full">
    <div class="flex flex-col gap-4">
        <Heading tag="h4">Module Description: {currentEditingName || 'Untitled Lecture'}</Heading>
        <P class="text-sm text-gray-500">
            Please paste the entire official description of the lecture here.
        </P>
        <Textarea
            bind:value={currentEditingDescription}
            rows={15}
            class="text-sm font-mono"
            placeholder="Paste full description here..."
        />
    </div>
    <svelte:fragment slot="footer">
        <Button on:click={saveDescription}>Save & Close</Button>
        <Button color="alternative" on:click={() => (openModal = false)}>
            Cancel
        </Button>
    </svelte:fragment>
</Modal>

<!-- ==================== STEP 2: SELECT 3 AREAS ==================== -->
<div class="my-6">
    <Heading tag="h4" class="mb-3">Step 2: Select three areas (A, B, C)</Heading>

    <P class="mb-4 text-sm">
        Please indicate the three areas A, B and C where you have the required Mathematics skills already earned.
    </P>

    <div class="flex flex-wrap gap-2">
        <!-- Area A -->
        <Button>
            {areaA} <ChevronDownOutline class="text-2xs ml-2" />
        </Button>
        <Dropdown class="text-2xs p-2">
            {#each formTopics as topic}
                {#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
                    <li>
                        <Radio
                            name="areaA"
                            value={topic.name}
                            checked={areaA === topic.name}
                            on:change={() => {
                                const prev = areaA;
                                areaA = topic.name;
                                selectArea(topic.name, prev === 'Please select Area A' ? undefined : prev);
                            }}
                        >
                            {topic.name}
                        </Radio>
                    </li>
                {/if}
            {/each}
        </Dropdown>

        <!-- Area B -->
        <Button>
            {areaB} <ChevronDownOutline class="text-2xs ml-2" />
        </Button>
        <Dropdown class="text-2xs p-2">
            {#each formTopics as topic}
                {#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
                    <li>
                        <Radio
                            name="areaB"
                            value={topic.name}
                            checked={areaB === topic.name}
                            on:change={() => {
                                const prev = areaB;
                                areaB = topic.name;
                                selectArea(topic.name, prev === 'Please select Area B' ? undefined : prev);
                            }}
                        >
                            {topic.name}
                        </Radio>
                    </li>
                {/if}
            {/each}
        </Dropdown>

        <!-- Area C -->
        <Button>
            {areaC} <ChevronDownOutline class="text-2xs ml-2" />
        </Button>
        <Dropdown class="text-2xs p-2">
            {#each formTopics as topic}
                {#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
                    <li>
                        <Radio
                            name="areaC"
                            value={topic.name}
                            checked={areaC === topic.name}
                            on:change={() => {
                                const prev = areaC;
                                areaC = topic.name;
                                selectArea(topic.name, prev === 'Please select Area C' ? undefined : prev);
                            }}
                        >
                            {topic.name}
                        </Radio>
                    </li>
                {/if}
            {/each}
        </Dropdown>
    </div>
</div>

<!-- ==================== STEP 3: ASSIGN LECTURES TO AREAS ==================== -->
<div class="my-6">
    <Heading tag="h4" class="mb-3">Step 3: Assign lectures to areas & select skills</Heading>

    <P class="mb-4 text-sm">
        Now assign your pool lectures to each area and check the boxes for skills demonstrated.
    </P>
</div>

{#each formTopics as topic, topicIdx}
    {@const availableForThisArea = availableByArea[topic.name] ?? []}
    {@const assignedLectures = $data.mathematics.lectures[topic.name] ?? []}
    {@const isSelected = $data.mathematics.area.includes(topic.name)}

    <div class="my-6 p-4 border rounded-lg border-gray-200">
        <div class="flex items-center justify-between mb-3">
            <Heading tag="h5" class="mb-0">
                {topic.name}
            </Heading>
            <Button on:click={() => openDrawer(topicIdx)} class="text-2xs" size="xs">
                Overview of required skills
            </Button>
        </div>

        <!-- Dropdown to add lecture from pool -->
        <div class="mb-3">
            {#if availableForThisArea.length > 0}
                <Button size="sm" class="text-2xs" color="primary">
                    Add lecture from pool <ChevronDownOutline class="ml-1" />
                </Button>
                <Dropdown class="p-2">
                    {#each availableForThisArea as poolLec (poolLec.id)}
                        <DropdownItem on:click={() => assignLectureToArea(topic.name, poolLec.id)}>
                            {poolLec.lectureName || '(Untitled lecture)'}
                        </DropdownItem>
                    {/each}
                </Dropdown>
            {:else}
                <div class="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
                    {#if !hasFilledPoolLectures}
                        <strong>No lectures in your pool yet.</strong> Add lectures in Step 1 above first.
                    {:else if assignedLectures.length > 0}
                        ✓ <strong>All your pool lectures are already assigned to this area.</strong> You can add more lectures in Step 1 if needed.
                    {:else}
                        <strong>All pool lectures are assigned to other areas.</strong> Add more in Step 1 or remove from other areas.
                    {/if}
                </div>
            {/if}
        </div>

        <!-- Table of assigned lectures with skill checkboxes -->
        {#if assignedLectures.length > 0}
            <div class="overflow-x-auto">
                <Table striped={true}>
                    <TableHead class="normal-case bg-primary-700 text-white">
                        <TableHeadCell class="min-w-40 text-2xs p-2 text-left">Lecture</TableHeadCell>
                        {#each topic.subtopics as subTopic}
                            <TableHeadCell class="text-2xs p-2 text-center min-w-[80px]">
                                <div class="flex justify-center">{subTopic}</div>
                            </TableHeadCell>
                        {/each}
                        <TableHeadCell class="text-2xs p-2 w-12"></TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {#each assignedLectures as lecture, lectureIdx (lecture.id)}
                            {@const fromPool = poolById.get(lecture.id)}
                            {@const displayName = (fromPool?.lectureName ?? lecture.lectureName ?? '').trim() || '(Untitled)'}
                            {@const displayDesc = (fromPool?.moduleDescription ?? lecture.moduleDescription ?? '').trim()}

                            <TableBodyRow>
                                <TableBodyCell class="p-2 text-2xs text-left align-middle">
                                    <div class="font-semibold">{displayName}</div>
                                    {#if displayDesc}
                                        <div class="text-[11px] text-gray-500 mt-1 line-clamp-2 max-w-[200px]">
                                            {displayDesc}
                                        </div>
                                    {/if}
                                </TableBodyCell>

                                {#each topic.subtopics as subTopic}
                                    <TableBodyCell class="p-2 text-center align-middle">
                                        <div class="flex justify-center">
                                            <Checkbox
                                                checked={lecture.skills.includes(subTopic)}
                                                on:change={() => {
                                                    const isChecked = !lecture.skills.includes(subTopic);
                                                    toggleSkill(topic.name, lectureIdx, subTopic, isChecked);
                                                }}
                                            />
                                        </div>
                                    </TableBodyCell>
                                {/each}

                                <TableBodyCell class="p-2 text-center align-middle w-12">
                                    <Button color="red" size="xs" class="text-2xs" on:click={() => removeLecture(topic.name, lectureIdx)}>
                                        <TrashBinOutline />
                                    </Button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        {:else if isSelected}
            <P class="text-xs italic text-red-600 p-4 bg-red-50 rounded border border-red-100">
                Please add at least one lecture to this selected area.
            </P>
        {:else}
            <P class="text-xs italic text-gray-400 p-4 bg-gray-50 rounded border border-gray-100">
                No lectures assigned.
            </P>
        {/if}
    </div>
{/each}

<!-- Drawer for skill overview -->
<Drawer
    placement="left"
    transitionType="fly"
    transitionParams={transitionParams}
    bind:hidden={hiddenDrawer}
    id="sidebarDrawer"
    class="w-72 text-sm font-light"
>
    <div class="bg-primary-700 flex items-start p-2 items-center justify-between">
        <p class="text-base font-semibold text-white">
            Required skills in {formTopics[selectedDrawer].name}
        </p>
        <CloseButton on:click={() => (hiddenDrawer = true)} class="hover:bg-primary-800 text-white" />
    </div>
    <ul class="p-2 bg-gray-50">
        {#each formTopics[selectedDrawer].module as module}
            <li class="text-sm list-disc ml-4 mb-2" style="list-style-type: circle">{module}</li>
>>>>>>> Stashed changes
        {/each}
      </TableBody>
    </Table>

    <Button class="text-2xs m-2" on:click={() => addAreaLecture(areaName)}>
      Add Lecture to this Area
    </Button>
  </div>
{/each}
