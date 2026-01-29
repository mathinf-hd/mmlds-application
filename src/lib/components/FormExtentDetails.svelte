<script lang="ts">
	import {
		Heading,
		Input,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import { formFields } from '$lib/fields';
	import { data, toggleStudyField, setBachelorName, setComparableField } from '$lib/store/store';

	let bachelorName = '';
	let comparableField = '';

	// ✅ Only sync local state when store values change (prevents overwriting while typing)
	$: {
		const bn = $data.fieldDetails?.bachelorName ?? '';
		if (bn !== bachelorName) bachelorName = bn;

		const cf = $data.fieldDetails?.comparableField ?? '';
		if (cf !== comparableField) comparableField = cf;
	}

	function checkedFromEvent(e: Event): boolean {
		const el = e.currentTarget as HTMLInputElement | null;
		return !!el?.checked;
	}

	function inputValue(e: Event): string {
		const el = e.currentTarget as HTMLInputElement | null;
		return el?.value ?? '';
	}

	function onBachelorInput(e: Event) {
		const v = inputValue(e);
		bachelorName = v;
		setBachelorName(v);
	}

	function onComparableInput(e: Event) {
		const v = inputValue(e);
		comparableField = v;
		setComparableField(v);
	}
</script>

<div class="flex gap-4 flex-col">
	<P>
		The admission regulations require a Bachelor of Science in Mathematics or Physics or in another comparable
		field (e.g., Technical Mathematics or Scientific Computing, or a program with mathematical lectures that
		provide the Mathematical Skills specified below), or a degree recognized as equivalent. Please indicate the
		name of your Bachelor of Science given in your transcript and the field (more than one possible).
	</P>

	<div class="my-4">
		<Heading tag="h4" class="mb-4">Field of study</Heading>

		<Table class="overflow-x-auto" striped={true}>
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">
					Name of Bachelor Course/Program in Transcript
				</TableHeadCell>

				{#each formFields as field}
					<TableHeadCell class="text-2xs p-2 m-auto">{field.name}</TableHeadCell>
				{/each}

				<TableHeadCell class="text-2xs p-2">Comparable Field</TableHeadCell>
			</TableHead>

			<TableBody>
				<TableBodyRow>
					<TableBodyCell class="p-2">
						<Input
							type="text"
							class="text-2xs"
							value={bachelorName}
							on:input={onBachelorInput}
						/>
					</TableBodyCell>

					{#each formFields as field}
						{@const isChecked = ($data.fieldDetails?.fieldsSelected ?? []).includes(field.name)}
						<TableBodyCell class="p-2">
							<input
								type="checkbox"
								checked={isChecked}
								on:change={(e) => toggleStudyField(field.name, checkedFromEvent(e))}
							/>
						</TableBodyCell>
					{/each}

					<TableBodyCell class="p-2 text-2xs">
						<Input
							type="text"
							class="text-2xs"
							value={comparableField}
							on:input={onComparableInput}
						/>
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
</div>
