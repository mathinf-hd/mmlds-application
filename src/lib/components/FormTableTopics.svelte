<script lang="ts">
	import { Button, Checkbox, Heading, Input, P, Table, 
			TableBody, TableBodyCell, TableBodyRow, 
			TableHead, TableHeadCell } from 'flowbite-svelte';
	import { TrashBinOutline }  from 'flowbite-svelte-icons';

	import PositiveNumberInput from './PositiveNumberInput.svelte';
	import { formTopics } from '$lib/topics';

	import { data, addLecture, deleteLecture } from '$lib/store/store';
</script>

<P>
	The admission regulations recognize skills that you earned in your lectures. The skills are organized into nine basic topics ("Practical computer science", ...). To declare these skills, add for each respective lecture its name as listed in the transcrpt and its number of points as listed in the transcript. To declare your earned skills, check the respective checkboxes and copy and paste the official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field.
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
					<TableBodyCell class="p-2"><Input type="text" bind:value={lecture.name} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><PositiveNumberInput bind:value={lecture.points} class="text-2xs text-center"/></TableBodyCell>
					{#each topic.subtopics as subTopic}
					<TableBodyCell class="p-2"><Checkbox bind:checked={lecture.skills[subTopic]} disabled={false} class="m-auto"/></TableBodyCell>
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