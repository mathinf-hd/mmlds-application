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
				<TableHeadCell class="min-w-60 text-2xs p-2">Field of Bachelor of Science in Transcript</				
				{#each formFields as field}
					<TableHeadCell class="text-2xs p-2 m-auto">{field.name}</TableHeadCell>
				{/each}
				<TableHeadCell class="text-2xs p-2">Comparable Field</TableHeadCell>				
			</TableHead>
			<TableBody>
				<TableBodyRow>	
					<TableBodyCell class="p-2"><p style="color: red">Textfeld</p></TableBodyCell>				
					{#each formFields as field}
					<TableBodyCell class="p-2"><p style="color: red">Checkbox</p></TableBodyCell>
					{/each}
					<TableBodyCell class="p-2 text-2xs" color="red"><p style="color: red">Textfeld</p></TableBodyCell>
				</TableBodyRow>
			</TableBody>
	</Table>
	</div>	

</div>
