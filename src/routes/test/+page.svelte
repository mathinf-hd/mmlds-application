<script lang="ts">
	import { onMount } from 'svelte'

	let filename: string | null = null;
	
	onMount(()=>{
		const params = new URL(window.location.href).searchParams
		filename = params.get("file")
	})
</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center">
	{filename}
</div>
