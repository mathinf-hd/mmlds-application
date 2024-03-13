<script lang="ts">
	export let value: number = 0;
	let valueAsString = '0';
	let prevValueAsString = '0';
	import Input from 'flowbite-svelte/Input.svelte';

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) {
			const proposedValueAsString = target.value;
			const proposedValue = Number(proposedValueAsString);
			if (Number.isNaN(proposedValue) || proposedValue < 0) {
				valueAsString = prevValueAsString;
			} else {
				prevValueAsString = valueAsString;
				valueAsString = proposedValueAsString;
				value = proposedValue;
			}
		}
	}
</script>

<Input type="text" bind:value={valueAsString} on:input={handleInput} {...$$restProps} />
