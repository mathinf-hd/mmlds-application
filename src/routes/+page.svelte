<script lang="ts">
import { Button, Alert, Card, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Toast } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox } from 'flowbite-svelte';

	function downloadFile() {
		const link = document.createElement('a');
		const content = 'abc1234';
		const file = new Blob([content], { type: 'text/plain' });
		link.href = URL.createObjectURL(file);
		link.download = 'sample.txt';
		link.click();
		URL.revokeObjectURL(link.href);
	}

type Row = {
  name: string;
  count: number;
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
};

const titles = ["Name", "Count", "A", "B", "C", "D", "E", "F"];

const row1: Row = {name: "Alpha", count: 3, a: true, b: false, c: false, d: false, e: true, f: false};

const rows = [row1, row1, row1];

</script>

<h1>Test Form</h1>

<Table>
  <TableHead>
{#each titles as title}
<TableHeadCell>{title}</TableHeadCell>
{/each}
    </TableHead>
<TableBody class="divide-y">
{#each rows as row}
<TableBodyRow>
{#each Object.entries(row) as [title, value]}
<TableBodyCell>
{value}
<Checkbox />
</TableBodyCell>
{/each}
</TableBodyRow>
{/each}
</TableBody>
</Table>

<Button color="primary" on:click={downloadFile}>Download</Button>
