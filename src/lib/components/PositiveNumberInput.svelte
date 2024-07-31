<script lang="ts">
	import Input from 'flowbite-svelte/Input.svelte';
	
	export let value: number | null
	
	function handleInput(event: Event) {
		
		/* check if initialized */
		if (!value) return
		
		/* check if number */
		if (Number.isNaN(Number(value))) {
			value = 0;
			return 
		}
		
		/* check if gt 0 */
		if (value < 0 ) { 
			value = 0;
			return 
		}

		/* strips leading zeros */
		value = Number(value);
	}
	
</script>

<Input type="text" bind:value={value} on:input={handleInput} {...$$restProps} />
