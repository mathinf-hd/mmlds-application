<script lang="ts">
	import { 
		P,  
		Table, 
		TableBody, 
		TableBodyCell, 
		TableBodyRow, 
		Textarea 
	} from 'flowbite-svelte';

	import { data } from '$lib/store/store';

</script>

<Table class="overflow-x-auto">
	<TableBody>
		{#each Object.keys($data.questions) as question, questionIdx}
			<TableBodyRow>
				<TableBodyCell>
					<P>{questionIdx + 1 + ".) "+ question}:</P>
					<Textarea rows="10" bind:value={$data.questions[question]} />
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
