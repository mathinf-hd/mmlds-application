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
	Checkbox, 
		type SelectOptionType

    } from 'flowbite-svelte';

	import { TrashBinOutline }  from 'flowbite-svelte-icons';

    import GenericValidatedInput from './GenericValidatedInput.svelte';
    import PositiveNumberInput from './PositiveNumberInput.svelte';

    import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';
    import { addCslecture, deleteCslecture, checkDuplicateCslecture } from '$lib/store/store';
    import { addOsproject, deleteOsproject, checkDuplicateOsproject } from '$lib/store/store';
    import { addPlecture, deletePlecture, checkDuplicatePlecture } from '$lib/store/store';		


let checkedFlag = false;

</script>


<P>
  The admission regulations recognize <b> Programming skills</b>. Please check the box <input type="checkbox" bind:checked={checkedFlag} class="m-auto"/>  if
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
			{#each $data.lectures as lecture, lectureIdx}
			<TableBodyRow>
		 	   <TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>		  
			       <TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
			   <TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
		    	</TableBodyRow>	       
			{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Lecture</Button>
</div>

<P> Please check the box <input type="checkbox" bind:checked={checkedFlag}> if you actively contributed to an open source project. To declare these skills, add for each respective open source project the name of the project, the link to a public repository and your identifier.
</P> 

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Name of open source project</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Link to public repository</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Personal identifier</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
			{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
			<TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>		  
			<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
			<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
			<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Project</Button>
</div>

<P> Please check the box <input type="checkbox" bind:checked={checkedFlag}> if you particpate in an open source project. To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. Copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).</P> 

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
			{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
			<TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>		  
			<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
			<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Lecture</Button>
</div>