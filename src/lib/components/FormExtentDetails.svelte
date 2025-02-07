<script lang="ts">
	import { P } from 'flowbite-svelte';
	import PositiveNumberInput from './PositiveNumberInput.svelte';

	import { data } from '$lib/store/store';

</script>

<div class="flex gap-4 flex-col">
	<P>
		As the admission regulations require 56 ECTS credit points in computer science and 16 ECTS credit points in mathematics, your credits (as listed in your transcript and entered in this form) will be converted automatically to ECTS. For this conversion, you have to enter the standard period of study in months (not the time that you needed to finish your individual study) of your bachelor and the standard number of credits points that have to be earned for your bachelor.
	</P>
	<div class="flex gap-8 items-center">
		<div class="w-120"><P class="font-bold">Standard period of your study program in months (not the time it took you to finish your studies)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["duration"]} class="w-20 text-2xs text-center" />
	</div>
	<div class="flex gap-8 items-center">
		<div class="w-120"><P class="font-bold">Total number of credit points required in your study program (no grades, no grade point averages etc.)</P></div>
		<PositiveNumberInput bind:value={$data["extentDetails"]["points"]} class="w-20 text-2xs text-center" />
	</div>
</div>
