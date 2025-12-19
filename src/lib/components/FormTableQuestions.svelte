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

<!-- Add Character Limit 400 per question -->

<Table class="overflow-x-auto">
	<TableBody>
		{#each Object.keys($data.questions) as question, questionIdx}
			<TableBodyRow>
				<TableBodyCell>
					<P>{questionIdx + 1 + ".) "+ question}:</P>
					<Textarea 
						rows="10" 
						bind:value={$data.questions[question]} 
						maxlength="400"
					/>
					{#if ($data.questions[question]?.length ?? 0) >= 400}
						<div class="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
							Character limit of 400 reached.
						</div>
					{:else}
						<div class="mt-1 text-xs text-gray-500 text-right">
							{$data.questions[question]?.length ?? 0} / 400
						</div>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
