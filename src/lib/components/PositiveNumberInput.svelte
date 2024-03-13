<script lang="ts">
	export let value: number;
	import NumberInput from 'flowbite-svelte/NumberInput.svelte';

	function handleInput(event: Event) {
		console.log(event);
		const target = event.target as HTMLInputElement;
		if (target) {
			value = Number.isNaN(Number(target.value)) ? value : Number(target.value);
		}
	}
</script>

<NumberInput {value} min="0" on:input={(e) => handleInput(e)} {...$$restProps} />
