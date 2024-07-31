<script lang="ts">
	import { P } from 'flowbite-svelte';
	import PositiveNumberInput from './PositiveNumberInput.svelte';

	import { data } from '$lib/store/store';

</script>

<div class="flex gap-4 flex-col">
	<P>
		As the admission regulations require 56 ECTS points in computer science and 16 ECTS points in mathematics, your points (as listed in your transcript) have to be converted accordingly. Therefore, enter the duration of the standard period of study of your bachelor and the total points that have to be earned for your bachelor here.
	</P>
	<div class="flex gap-8 items-center">
		<div class="w-32"><P class="font-bold">Duration (years)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["duration"]} class="w-20 text-2xs text-center" />
	</div>
	<div class="flex gap-8 items-center">
		<div class="w-32"><P class="font-bold">Total Points</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["points"]} class="w-20 text-2xs text-center" />
	</div>
</div>