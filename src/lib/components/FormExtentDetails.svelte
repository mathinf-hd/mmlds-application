<script lang="ts">
	import { P } from 'flowbite-svelte';
	import PositiveNumberInput from './PositiveNumberInput.svelte';

	import { data } from '$lib/store/store';

</script>

<div class="flex gap-4 flex-col">
	<P>
		Hier wird erklärt, wie die Duration in Jahren ausgefüllt werden soll 
		-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
	</P>
	<div class="flex gap-8 items-center">
		<div class="w-32"><P class="font-bold">Duration (years)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["duration"]} class="w-20 text-2xs text-center" />
	</div>
	<P>
		Hier wird erklärt, wie die Total Points ausgefüllt werden sollen 
		-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
	</P>
	<div class="flex gap-8 items-center">
		<div class="w-32"><P class="font-bold">Total Points</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["points"]} class="w-20 text-2xs text-center" />
	</div>
</div>