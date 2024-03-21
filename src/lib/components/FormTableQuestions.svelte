<script lang="ts">
	import P from 'flowbite-svelte/P.svelte';
	import Table from 'flowbite-svelte/Table.svelte';
	import TableBody from 'flowbite-svelte/TableBody.svelte';
	import TableBodyCell from 'flowbite-svelte/TableBodyCell.svelte';
	import TableBodyRow from 'flowbite-svelte/TableBodyRow.svelte';
	import Textarea from 'flowbite-svelte/Textarea.svelte';
	import { type FormQuestions, type FormDataQuestions } from '$lib/formTypes';

	export let questions: FormQuestions;
	export let data: FormDataQuestions;
</script>

<Table class="overflow-x-auto">
	<TableBody>
		{#each questions as question}
			<TableBodyRow>
				<TableBodyCell>
					<P>{question}:</P>
					<Textarea rows="10" bind:value={data[question]['answer']} />
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
