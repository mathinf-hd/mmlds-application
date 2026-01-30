<script lang="ts">
	import { P, Table, TableBody, TableBodyCell, TableBodyRow, Textarea } from 'flowbite-svelte';
	import { data, setQuestionAnswer } from '$lib/store/store';

	let localAnswers: Record<string, string> = {};

	// Sync store → local (keeps typing smooth)
	$: {
		const q = $data.questions ?? {};
		const next: Record<string, string> = {};
		for (const key of Object.keys(q)) {
			next[key] = localAnswers[key] ?? q[key] ?? '';
		}
		localAnswers = next;
	}

	// ✅ helper (TS is allowed here)
	function getTextareaValue(e: Event): string {
		const el = e.currentTarget as HTMLTextAreaElement | null;
		return el?.value ?? '';
	}

	function update(question: string, value: string) {
		localAnswers = { ...localAnswers, [question]: value };
		setQuestionAnswer(question, value);
	}
</script>

<Table class="overflow-x-auto">
	<TableBody>
		{#each Object.keys($data.questions ?? {}) as question, idx}
			<TableBodyRow>
				<TableBodyCell>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
					<P>{questionIdx + 1 + ".) "+ question}:</P>
					<Textarea rows="10" bind:value={$data.questions[question]} />
=======
=======
>>>>>>> Stashed changes
					<P>{idx + 1}.) {question}</P>

					<Textarea
						rows="10"
						maxlength="400"
						value={localAnswers[question] ?? ""}
						on:input={(e) => update(question, getTextareaValue(e))}
					/>

					<div class="mt-1 text-xs text-gray-500 text-right">
						{localAnswers[question]?.length ?? 0} / 400
					</div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
