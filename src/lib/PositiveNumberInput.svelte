<script lang="ts">
	export let data: object;
	export let key: string;
	import NumberInput from 'flowbite-svelte/NumberInput.svelte';
</script>

<NumberInput
	value={data[key]}
	min="0"
	on:input={(e) => (data[key] = Number.isNaN(Number(e.target.value)) ? data[key] : Number(e.target.value))}
/>
