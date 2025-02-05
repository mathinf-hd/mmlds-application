<script lang="ts">
import { Button, Checkbox, Heading, Input, P, Table, 
			TableBody, TableBodyCell, TableBodyRow, 
			TableHead, TableHeadCell } from 'flowbite-svelte';
import { TrashBinOutline }  from 'flowbite-svelte-icons';

import PositiveNumberInput from './PositiveNumberInput.svelte';
import GenericValidatedInput from './GenericValidatedInput.svelte';
import { formTopics } from '$lib/topics';

import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';


</script>

<P>
	The admission regulations recognize skills that you earned in your lectures. The skills are organized into nine basic topics ("Practical computer science", ...). To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript and its number of points as listed in the transcript. To declare your earned skills, check the respective checkboxes. Finally, copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English). <b>Please notice that the automatic replication of the lectures across the different fields is intentional (a lecture can provide skills in more than one of the nine topics).</b>
</P>
{#each formTopics as topic}
<div class="my-4">
	<Heading tag="h4" class="mb-4">{topic.name}</Heading>
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
