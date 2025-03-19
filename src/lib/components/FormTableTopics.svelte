<script lang="ts">
import { Popover,  Dropdown, DropdownItem, Radio,
       	 	   Button, Checkbox, Heading, Input, P, Table, 
		   TableBody, TableBodyCell, TableBodyRow, 
		   TableHead, TableHeadCell } from 'flowbite-svelte';
import { TrashBinOutline, ChevronDownOutline }  from 'flowbite-svelte-icons';

import PositiveNumberInput from './PositiveNumberInput.svelte';
import GenericValidatedInput from './GenericValidatedInput.svelte';
import { formTopics } from '$lib/topics';

import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';

let areaA = 0;
let areaB = 0;
let areaC = 0;

</script>

<P>
	The admission regulations recognize skills in <b>Mathematics</b> which you acquired in the following areas through corresponding foundational lectures (each 8 ECTS): Analysis, Linear Algebra, and three of the five areas: Functional Analysis, Differential Geometry, Optimization, Statistics and Probability Theory, Numerical Analysis. Please indicate the three areas A, B and C  where you have the required Mathematics skills already earned.   
</P>

<Button>
  {areaA} <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
</Button>
<Dropdown class="w-60 p-3 space-y-3 text-sm">
  <li>
    <Radio name="areaA" bind:group={areaA} value={0}>Please select Area A</Radio>
  </li>
 {#each formTopics as topic, i} 
  <li>
    <Radio name="areaA" bind:group={areaA} value={i}>{topic.name}</Radio>
  </li>
  {/each}
</Dropdown>

<Button>
  {areaB}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
</Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
  <li>
    <Radio name="areaB" bind:group={areaB} value={0}>Please select Area B</Radio>
  </li>
 {#each formTopics as topic, i}
  <li>
    <Radio name="areaB" bind:group={areaB} value={i}>{topic.name}</Radio>
  </li>
  {/each}
</Dropdown>

<Button>
  {areaC}<ChevronDownOutline class="text-2xs p-2" />
</Button>
<Dropdown class="text-2xs p-2">
  <li>
    <Radio name="areaC" bind:group={areaC} value={0}>Please select Area C</Radio>
  </li>
 {#each formTopics as topic} 
  <li>
    <Radio name="areaC" bind:group={areaC} value={topic.name}>{topic.name}</Radio>
  </li>
  {/each}
</Dropdown>

<P>
To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript and its number of points as listed in the transcript. To declare your earned skills, check the respective checkboxes. Finally, copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>
{#each formTopics as topic}
<div class="my-4">
	<Heading tag="h4" class="mb-4">{topic.name} <Button color="yellow" id="{topic.id}">{topic.name} Modul</Button>	
	<Popover class="w-64 text-sm font-light " title="{topic.name}" triggeredBy="#{topic.id}">{topic.name} Right?</Popover>	
 	</Heading>
	<Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="w-12 text-2xs p-2">Points</TableHeadCell>
				{#each topic.subtopics as subTopic}
					<TableHeadCell class="text-2xs p-2 m-auto">{subTopic}</TableHeadCell>
				{/each}
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
					<TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><PositiveNumberInput bind:value={lecture.points} class="text-2xs text-center"/></TableBodyCell>
					{#each topic.subtopics as subTopic}
					<TableBodyCell class="p-2"><Checkbox bind:checked={lecture.skills[subTopic]} on:change={() => addSkill(lectureIdx, subTopic)} class="m-auto"/></TableBodyCell>
					{/each}
					<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Lecture</Button>
</div>
{/each}
