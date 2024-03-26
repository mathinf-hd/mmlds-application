<script lang="ts">
	import Checkbox from 'flowbite-svelte/Checkbox.svelte';
	import Table from 'flowbite-svelte/Table.svelte';
	import TableBody from 'flowbite-svelte/TableBody.svelte';
	import TableBodyCell from 'flowbite-svelte/TableBodyCell.svelte';
	import TableBodyRow from 'flowbite-svelte/TableBodyRow.svelte';
	import TableHead from 'flowbite-svelte/TableHead.svelte';
	import TableHeadCell from 'flowbite-svelte/TableHeadCell.svelte';

	import FieldInput from '$lib/components/FieldInput.svelte';
	import { type FormTopics, type FormFields, type FormDataTopics } from '$lib/formTypes';

	export let fields: FormFields;
	export let topics: FormTopics;
	export let data: FormDataTopics;

	const fieldNames = Object.keys(fields);
	const topicNames = Object.keys(topics);
</script>

<Table class="overflow-x-auto">
	{#each topicNames as topicName}
		<TableHead>
			<TableHeadCell>{topicName} <!--(max. skill points: {topics[topicName].weight})--></TableHeadCell>
			{#each fieldNames as fieldName}
				<TableHeadCell>{fieldName}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each topics[topicName].subtopics as subtopicName}
				<TableBodyRow
					class={data[topicName].subtopics[subtopicName]['selected'] ? 'bg-primary-200' : ''}
				>
					<TableBodyCell>
						<Checkbox bind:checked={data[topicName].subtopics[subtopicName]['selected']}>
							{subtopicName}
						</Checkbox>
					</TableBodyCell>
					{#each fieldNames as fieldName}
						<TableBodyCell>
							<FieldInput bind:value={data[topicName].subtopics[subtopicName][fieldName]} />
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	{/each}
</Table>
