<script lang="ts">
	import Checkbox from 'flowbite-svelte/Checkbox.svelte';
	import Input from 'flowbite-svelte/Input.svelte';

	import PositiveNumberInput from '$lib/components/PositiveNumberInput.svelte';
	import type Field from '$lib/formTypes';

	export let value: Field;
</script>

{#if typeof value === 'string'}
	<Input bind:value />
{:else if typeof value === 'number'}
	<PositiveNumberInput class="w-16" bind:value />
{:else if typeof value === 'boolean'}
	<Checkbox bind:checked={value} />
{:else}
	{typeof value} not supported
{/if}
