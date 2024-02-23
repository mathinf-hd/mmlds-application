<script lang="ts">
	import {
		Button,
		Checkbox,
		Heading,
		Input,
		NumberInput,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { downloadAsJsonFile, makeEmptyRow } from '$lib/index';

	function saveAsFile() {
		const filename = 'test.txt';
		downloadAsJsonFile(filename, data);
	}

	const titles = Object.keys(makeEmptyRow());
	const rows = [makeEmptyRow(), makeEmptyRow(), makeEmptyRow()];
	const data = { Name: '', Rows: rows };
</script>

<div class="flex flex-col p-4 md:container md:mx-auto">
	<Heading>Test Form</Heading>
	<Table>
		<TableHead>
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each rows as row}
				<TableBodyRow>
					{#each titles as title}
						<TableBodyCell>
							{#if typeof row[title] === 'string'}
								<Input bind:value={row[title]} />
							{:else if typeof row[title] === 'number'}
								<NumberInput
									value={row[title]}
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
		</TableBody>
	</Table>

	<Button color="primary" on:click={saveAsFile}>Download</Button>

	<Table>
		<TableHead>
			{#each titles as title}
				<TableHeadCell>{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each rows as row}
				<TableBodyRow>
					{#each titles as title}
						<TableBodyCell>
							{row[title]}
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
