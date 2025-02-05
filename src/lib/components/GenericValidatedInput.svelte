<script lang="ts">

	import Input from 'flowbite-svelte/Input.svelte';
	
	export let value: string | null;
	export let validateFn: any;

</script>

<div class="validated-input" on:focusout={validateFn}>
	<Input type="text" bind:value={value} {...$$restProps} />
</div>
