<script lang="ts">
	export let value: number;
	import NumberInput from 'flowbite-svelte/NumberInput.svelte';
</script>

<NumberInput
	{value}
	min="0"
	on:input={(e) => (value = Number.isNaN(Number(e.target.value)) ? value : Number(e.target.value))}
/>
