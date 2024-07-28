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

    import PositiveNumberInput from './PositiveNumberInput.svelte';

    import { data, addLecture, deleteLecture, countSubjectCP } from '$lib/store/store'
    import { formSubjectAreas } from '$lib/subjectAreas';

    const selectionItems: Array<SelectOptionType<Subject>> = []
    formSubjectAreas.forEach(subjectArea => selectionItems.push(
        {value: subjectArea.subject, name: subjectArea.subject}
    ))

</script>

<P>
    Hier wird erklärt warum weitere Vorlesungen aufgeführt werden sollten, auch wenn sie nicht direkt obengenannte Skills nachweisen
    -- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</P> 


<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture name in transcript</TableHeadCell>
				<TableHeadCell class="w-12 text-2xs p-2">Points</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
                <TableHeadCell class="text-2xs p-2">Subject Area</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
					<TableBodyCell class="p-2"><Input type="text" bind:value={lecture.name} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><PositiveNumberInput bind:value={lecture.points} class="text-2xs text-center"/></TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs"><Input type="text" class="text-2xs" bind:value={lecture.description} /></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"><Select items={selectionItems} bind:value={lecture.subject} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Lecture</Button>
    <div class="mt-8">
        {#key $data}
        {#each formSubjectAreas as subjectArea}
            <div class="text-gray-900 text-center">
                equivalent of specified CP {subjectArea.subject}: <span class="font-bold">{countSubjectCP(subjectArea.subject)}</span> / {subjectArea.cp}
            </div>
        {/each}
        {/key}
    </div>
</div>