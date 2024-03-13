<script lang="ts">
	import { fields, topics } from '$lib/form';
	import { downloadAsJsonFile, makeJsonFormData } from '$lib/util';
	import {
		Button,
		Card,
		Checkbox,
		Heading,
		Input,
		NumberInput,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import DownloadOutline from 'flowbite-svelte-icons/DownloadOutline.svelte';

	const topic_titles = Object.keys(topics);
	const field_titles = Object.keys(fields);
	const data = makeJsonFormData(topics, fields);

	function downloadFormData() {
		const filename = 'form-data.txt';
		console.log('Download:', data);
		downloadAsJsonFile(filename, data);
	}
</script>

<div class="flex flex-col md:container md:mx-auto">
	<Heading class="my-2 p-4 text-center">Test Form</Heading>
	<Card size="2xl" class="my-2">
		<P>
			Some introduction text, please fill in the form and click "Download form data" to download a
			form-data.txt file that you can then upload somewhere else, etc etc:
		</P>
	</Card>
	<Card size="2xl" class="my-2">
		<Table class="my-4">
			{#each topic_titles as topic_title}
				<TableHead>
					<TableHeadCell>{topic_title}</TableHeadCell>
					{#each field_titles as field_title}
						<TableHeadCell>{field_title}</TableHeadCell>
					{/each}
				</TableHead>
				<TableBody>
					{#each topics[topic_title] as subtopic_title}
						<TableBodyRow>
							<TableBodyCell>
								<Checkbox bind:checked={data[topic_title][subtopic_title].selected}>
									{subtopic_title}
								</Checkbox>
							</TableBodyCell>
							{#each field_titles as field_title}
								<TableBodyCell>
									{#if typeof data[topic_title][subtopic_title][field_title] === 'string'}
										<Input bind:value={data[topic_title][subtopic_title][field_title]} />
									{:else if typeof data[topic_title][subtopic_title][field_title] === 'number'}
										<NumberInput
											class="w-16"
											value={data[topic_title][subtopic_title][field_title]}
											min="0"
											on:input={(e) =>
												(data[topic_title][subtopic_title][field_title] = Number.isNaN(
													Number(e.target.value)
												)
													? data[topic_title][subtopic_title][field_title]
													: Number(e.target.value))}
										/>
									{:else if typeof data[topic_title][subtopic_title][field_title] === 'boolean'}
										<Checkbox bind:checked={data[topic_title][subtopic_title][field_title]} />
									{:else}
										Unknown field: {data[topic_title][subtopic_title][field_title]}
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
