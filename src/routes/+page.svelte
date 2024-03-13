<script lang="ts">
	import { fields, topics } from '$lib/form';
	import { downloadAsJsonFile, makeJsonFormData } from '$lib/util';
	import Button from 'flowbite-svelte/Button.svelte';
	import Card from 'flowbite-svelte/Card.svelte';
	import Checkbox from 'flowbite-svelte/Checkbox.svelte';
	import Heading from 'flowbite-svelte/Heading.svelte';
	import Input from 'flowbite-svelte/Input.svelte';
	import NumberInput from 'flowbite-svelte/NumberInput.svelte';
	import P from 'flowbite-svelte/P.svelte';
	import Table from 'flowbite-svelte/Table.svelte';
	import TableBody from 'flowbite-svelte/TableBody.svelte';
	import TableBodyCell from 'flowbite-svelte/TableBodyCell.svelte';
	import TableBodyRow from 'flowbite-svelte/TableBodyRow.svelte';
	import TableHead from 'flowbite-svelte/TableHead.svelte';
	import TableHeadCell from 'flowbite-svelte/TableHeadCell.svelte';
	import DownloadOutline from 'flowbite-svelte-icons/DownloadOutline.svelte';

	const topicNames = Object.keys(topics);
	const fieldNames = Object.keys(fields);
	const data = makeJsonFormData(topics, fields);

	function downloadFormData() {
		const filename = 'form-data.txt';
		console.log('Download:', data);
		downloadAsJsonFile(filename, data);
	}
</script>

<div class="flex flex-col md:container md:mx-auto">
	<Heading class="my-2 p-4 text-center">Skills from Lectures</Heading>
	<Card size="2xl" class="my-2">
		<P>
			Please fill in the form and click "Download form data" to download a form-data.txt file that
			you can then upload to your application.
		</P>
	</Card>
	<Card size="2xl" class="my-2">
		<Table class="my-4">
			{#each topicNames as topicName}
				<TableHead>
					<TableHeadCell>{topicName}</TableHeadCell>
					{#each fieldNames as fieldName}
						<TableHeadCell>{fieldName}</TableHeadCell>
					{/each}
				</TableHead>
				<TableBody>
					{#each topics[topicName] as subtopicName}
						<TableBodyRow>
							<TableBodyCell>
								<Checkbox bind:checked={data[topicName][subtopicName].selected}>
									{subtopicName}
								</Checkbox>
							</TableBodyCell>
							{#each fieldNames as fieldName}
								<TableBodyCell>
									{#if typeof data[topicName][subtopicName][fieldName] === 'string'}
										<Input bind:value={data[topicName][subtopicName][fieldName]} />
									{:else if typeof data[topicName][subtopicName][fieldName] === 'number'}
										<NumberInput
											class="w-16"
											value={data[topicName][subtopicName][fieldName]}
											min="0"
											on:input={(e) =>
												(data[topicName][subtopicName][fieldName] = Number.isNaN(
													Number(e.target.value)
												)
													? data[topicName][subtopicName][fieldName]
													: Number(e.target.value))}
										/>
									{:else if typeof data[topicName][subtopicName][fieldName] === 'boolean'}
										<Checkbox bind:checked={data[topicName][subtopicName][fieldName]} />
									{:else}
										Unknown field type: {typeof data[topicName][subtopicName][fieldName]}
									{/if}
								</TableBodyCell>
							{/each}
						</TableBodyRow>
					{/each}
				</TableBody>
			{/each}
		</Table>
		<Button color="primary" class="m-4" on:click={downloadFormData}>
			<DownloadOutline />
			Download form data
		</Button>
	</Card>
</div>
