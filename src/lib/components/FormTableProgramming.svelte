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

    import { data, addCslecture, deleteCslecture, checkDuplicateCslecture } from '$lib/store/store'
    import { addOsproject, deleteOsproject, checkDuplicateOsproject } from '$lib/store/store'
    import { addPlecture, deletePlecture, checkDuplicatePlecture } from '$lib/store/store'		

 let Cslecture

</script>

<P>
  The admission regulations recognize <b> Programming skills</b>. Please check the box <Checkbox bind:checked={$data.Cslecture.checked} class="m-auto"/>, if
you acquired skills in areas such as Algorithms and data structures through corresponding foundational lectures. To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. Copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.Cslectures as Cslecture, CslectureIdx}
				<TableBodyRow>
                    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={Cslecture.name} validateFn={() => checkDuplicateLecture(CslectureIdx)} class="text-2xs"/></TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs"><Input type="text" class="text-2xs" bind:value={Cslecture.description} /></TableBodyCell>
		    <TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteCsLecture(CslectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addCslecture()}>Add Another Lecture</Button>
</div>

<P> Please check the box <Checkbox bind:checked={$data.Osproject.checked} class="m-auto"/>, if you actively contributed to an open source project. To declare these skills, add for each respective open source project the name of the project, the link to a public repository and your identifier.
</P> 

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2"Name of open source project</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Link to public repository</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Personal identifier</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.Osproject as Osproject, OsprojectIdx}
				<TableBodyRow>
                    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={Osproject.name} validateFn={() => checkDuplicateOsproject(OsprojectIdx)} class="text-2xs"/></TableBodyCell>
		    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={Osproject.link} class="text-2xs"/></TableBodyCell>	
		    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={Osproject.id} class="text-2xs"/></TableBodyCell>	
		    <TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteOsproject(OsprojectIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addOsproject()}>Add Another Project</Button>
</div>

<P> Please check the box <Checkbox bind:checked={$data.Planguage.checked} class="m-auto"/>, if you particpate in an open source project. To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. Copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).</P> 

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.Plectures as Plecture, PlectureIdx}
				<TableBodyRow>
                    <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={Plecture.name} validateFn={() => checkDuplicatePlecture(PlectureIdx)} class="text-2xs"/></TableBodyCell>
                    <TableBodyCell class="p-2 text-2xs"><Input type="text" class="text-2xs" bind:value={Plecture.description} /></TableBodyCell>
		    <TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deletePlecture(PlectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addPlecture()}>Add Another Lecture</Button>
</div>