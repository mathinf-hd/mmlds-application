<script lang="ts">
    import { 
        Button,
        Input,
        P,
        Select,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell, 
		type SelectOptionType

    } from 'flowbite-svelte';

	import { TrashBinOutline }  from 'flowbite-svelte-icons';

    import GenericValidatedInput from './GenericValidatedInput.svelte';
    import PositiveNumberInput from './PositiveNumberInput.svelte';

    import { data, addLecture, deleteLecture, checkDuplicateLecture } from '$lib/store/store'
    import { formSubjectAreas } from '$lib/subjectAreas';

    const selectionItems: Array<SelectOptionType<Subject>> = []
    formSubjectAreas.forEach(subjectArea => selectionItems.push(
        {value: subjectArea.subject, name: subjectArea.subject}
    ))

</script>

<P>
    Declare which of your lectures belong to computer science and which belong to mathematics. Also declare additional lectures (beyond the skill-related lectures above) that should be recognized for computer science and mathematics. Provide name and points as listed in your transcript, and copy and paste the official description of the lecture.
</P> 


<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="w-12 text-2xs p-2">Points</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
                <TableHeadCell class="text-2xs p-2">Subject Area</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
                    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><PositiveNumberInput bind:value={lecture.points} class="text-2xs text-center"/></TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs"><Input type="text" class="text-2xs" bind:value={lecture.description} /></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><Select items={selectionItems} bind:value={lecture.subject} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Lecture</Button>
</div>