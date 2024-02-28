<script lang="ts">
	import { newForm, newRow } from '$lib/form';
	import { downloadAsJsonFile } from '$lib/util';
	import {
		Button,
		Card,
		Checkbox,
		Heading,
		Input,
		Label,
		NumberInput,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { DownloadOutline, PlusOutline } from 'flowbite-svelte-icons';

	const data_titles = Object.keys(newForm());
	const row_titles = Object.keys(newRow());

	const data = newForm();
	data.rows = [newRow(), newRow(), newRow()];

	function downloadFormData() {
		const filename = 'form-data.txt';
		console.log('Download:', data);
		downloadAsJsonFile(filename, data);
	}

	function addRow() {
		data.rows = [...data.rows, newRow()];
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
		{#each data_titles as title}
			<div>
				<Label for={title} class="mb-2">{title}</Label>
				<Input type="text" id={title} bind:value={data[title]} />
			</div>
		{/each}
		<Table class="my-4">
			<TableHead>
				{#each row_titles as title}
					<TableHeadCell>{title}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each data.rows as row}
					<TableBodyRow>
						{#each row_titles as title}
							<TableBodyCell>
								{#if typeof row[title] === 'string'}
									<Input bind:value={row[title]} />
								{:else if typeof row[title] === 'number'}
									<NumberInput
										class="w-16"
										value={row[title]}
										min="0"
										on:input={(e) =>
											(row[title] = Number.isNaN(Number(e.target.value))
												? row[title]
												: Number(e.target.value))}
									/>
								{:else if typeof row[title] === 'boolean'}
									<Checkbox bind:checked={row[title]} />
								{:else}
									{row[title]}
								{/if}
							</TableBodyCell>
						{/each}
					</TableBodyRow>
				{/each}
				<TableBodyRow>
					<TableBodyCell>
						<Button on:click={addRow}>
							<PlusOutline />
							Add another row
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
		<Button color="primary" class="m-4" on:click={downloadFormData}>
			<DownloadOutline />
			Download form data
		</Button>
	</Card>
</div>
