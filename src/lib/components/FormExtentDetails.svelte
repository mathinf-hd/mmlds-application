<script lang="ts">
	import { Button, Checkbox, Heading, Input, P, Table, 
			TableBody, TableBodyCell, TableBodyRow, 
			TableHead, TableHeadCell } from 'flowbite-svelte';
	import { TrashBinOutline }  from 'flowbite-svelte-icons';

	import PositiveNumberInput from './PositiveNumberInput.svelte';
	import GenericValidatedInput from './GenericValidatedInput.svelte';
	import { formTopics } from '$lib/topics';
	import { formFields } from '$lib/fields';	

	import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';

</script>

<div class="flex gap-4 flex-col"> <P> As the admission regulations
	require a Bachelor of Science in Mathematics or Physics or in
	another comparable field (e.g., Technical Mathematics or
	Scientific Computing, or a program with mathematical lectures
	that provide the Mathematical Skills specified below), or a
	degree recognized as equivalent. The proof of an above-average
	bachelor's degree is demonstrated with a minimum grade of 2.3.
	</P>

	<div class="my-4">
	<Heading tag="h4" class="mb-4">Field of study</Heading>
	<Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Name of Field in Transcript</TableHeadCell>
				<TableHeadCell class="w-12 text-2xs p-2">Grade</TableHeadCell>
				{#each formFields as field}
					<TableHeadCell class="text-2xs p-2 m-auto">{field.name}</TableHeadCell>
				{/each}
				<TableHeadCell class="text-2xs p-2">Comparable Field</TableHeadCell>				
			</TableHead>
			<TableBody>
				<TableBodyRow>	
					<TableBodyCell class="p-2"></TableBodyCell>
					<TableBodyCell class="p-2 text-2xs"></TableBodyCell>
					{#each formFields as field}
					<TableBodyCell class="p-2"></TableBodyCell>
					{/each}
					<TableBodyCell class="p-2 text-2xs"></TableBodyCell>
				</TableBodyRow>
			</TableBody>
	</Table>
	</div>	


     <P>
56 ECTS credit points in computer science and 16 ECTS credit points in mathematics, your credits (as listed in your transcript and entered in this form) will be converted automatically to ECTS. For this conversion, you have to enter the standard period of study in months (not the time that you needed to finish your individual study) of your bachelor and the standard number of credits points that have to be earned for your bachelor.
	</P>
	<div class="flex gap-8 items-center">
		<div class="w-120"><P class="font-bold">Standard period of your study program in months (not the time it took you to finish your studies)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["duration"]} class="w-20 text-2xs text-center" />
	</div>
	<div class="flex gap-8 items-center">
		<div class="w-120"><P class="font-bold">Total number of credit points required in your study program (no grades, no grade point averages etc.)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["points"]} class="w-20 text-2xs text-center" />
	</div>
</div>
