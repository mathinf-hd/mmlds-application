<script lang="ts">
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

// fix that when refreshed it shows 'Select Area A' but actually are selected and you can be downloaded
// Different colouring of Chosen Area and unchosen Area.
// Colour Chosen Areas red until correctly filled.
// Initialize from store to restore "previous" context and prevent ghost data on change
let areaA = $data.mathematics.area[0] ?? 'Please select Area A';
let areaB = $data.mathematics.area[1] ?? 'Please select Area B';
let areaC = $data.mathematics.area[2] ?? 'Please select Area C';

let selectedDrawer = 0;
let hiddenDrawer = true;

function openDrawer(index: number) {
    selectedDrawer = index;
    hiddenDrawer = false;
}

let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
};

function onPoolLectureNameInput(id: string, e: Event) {
    const el = e.target as HTMLInputElement | null;
    if (!el) return;
    updatePoolLecture(id, { lectureName: el.value });
}

function onPoolLectureDescInput(id: string, e: Event) {
    const el = e.target as HTMLInputElement | null;
    if (!el) return;
    updatePoolLecture(id, { moduleDescription: el.value });
}

// REACTIVE: Compute available lectures per area whenever store changes
$: pool = $data.mathematics.lecturePool ?? [];
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
onMount(() => {
    data.update(d => {
        for (const area of Object.keys(d.mathematics.lectures)) {
            d.mathematics.lectures[area] = (d.mathematics.lectures[area] ?? []).filter(lec => {
                const name = lec.lectureName?.trim();
                const desc = lec.moduleDescription?.trim();
                return !!(name || desc || (lec.skills?.length ?? 0) > 0);
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
    currentEditingName = name;
    currentEditingDescription = description;
    openModal = true;
}

function saveDescription() {
    if (currentEditingId) {
        updatePoolLecture(currentEditingId, { moduleDescription: currentEditingDescription });
    }
    openModal = false;
}
</script>

<!-- Main explanation -->
<P>
    The admission regulations recognize skills in <b>Mathematics</b> which you acquired in the following areas through corresponding foundational lectures (each 8 ECTS): Analysis, Linear Algebra, and three of the five areas: Functional Analysis, Differential Geometry, Optimization, Statistics and Probability Theory, Numerical Analysis.
</P>

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
            <TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell> <!-- fold/unfold options -->
            <TableHeadCell class="text-2xs p-2"></TableHeadCell>
        </TableHead>
        <TableBody>
            {#each pool as poolLec (poolLec.id)}
                <TableBodyRow>
                    <TableBodyCell class="p-2 align-top">
                        <Input
                            type="text"
                            bind:value={poolLec.lectureName}
                            on:input={(e) => onPoolLectureNameInput(poolLec.id, e)}
                            class="text-2xs"
                            placeholder="e.g. Analysis I"
                        />
                    </TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs align-top">
                        <!-- Editable input with expand button -->
                        <div class="relative flex items-center">
                            <Input
                                type="text"
                                bind:value={poolLec.moduleDescription}
                                on:input={(e) => onPoolLectureDescInput(poolLec.id, e)}
                                class="text-2xs pr-8"
                                placeholder="Paste description or click expand..."
                            />
                            <button 
                                class="absolute right-2 text-gray-500 hover:text-primary-700 cursor-pointer"
                                on:click={() => openDescriptionModal(poolLec.id, poolLec.lectureName, poolLec.moduleDescription)}
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
    {@const isFilled = assignedLectures.length > 0}
    
    <!-- Reverted to standard styling: no conditional borders or backgrounds -->
    <div class="my-6 p-4 border rounded-lg border-gray-200">
        <div class="flex items-center justify-between mb-3">
            <!-- Reverted heading color to standard black -->
            <Heading tag="h5" class="mb-0">
                {topic.name}
            </Heading>
            <!-- Reverted button color (removed color="light" to use default/primary) -->
            <Button on:click={() => openDrawer(topicIdx)} class="text-2xs" size="xs">
                Overview of required skills
            </Button>
        </div>

        <!-- Dropdown to add lecture from pool (ALWAYS VISIBLE) -->
        <div class="mb-3">
            {#if availableForThisArea.length > 0}
                <!-- Has available lectures: show working dropdown -->
                <!-- Reverted to standard primary button (no outline logic) -->
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
                <!-- No available lectures: show message instead of dropdown -->
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
                    <!-- Reverted table head to standard primary color -->
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
                            <TableBodyRow>
                                <TableBodyCell class="p-2 text-2xs text-left align-middle">
                                    <div class="font-semibold">{lecture.lectureName || '(Untitled)'}</div>
                                    {#if lecture.moduleDescription}
                                        <div class="text-[11px] text-gray-500 mt-1 line-clamp-2 max-w-[200px]">
                                            {lecture.moduleDescription}
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
        {/each}
    </ul>
</Drawer>
