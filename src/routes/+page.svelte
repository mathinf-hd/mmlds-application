<script lang="ts">
	import { Card, Heading, P } from 'flowbite-svelte';

	import FormIntroDetails from '$lib/components/FormIntroDetails.svelte';
	import FormExtentDetails from '$lib/components/FormExtentDetails.svelte';
	import FormTableTopics from '$lib/components/FormTableTopics.svelte';
	import FormTableProgramming from '$lib/components/FormTableProgramming.svelte';
	import FormTableQuestions from '$lib/components/FormTableQuestions.svelte';

	import ButtonDownloadData from '$lib/components/ButtonDownloadData.svelte';

</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center">
	<Heading class="my-2 p-4 text-center">Skills, Lectures, and Motivation</Heading>
	
	<!--<Card size="xl" class="my-2">
		<FormIntroDetails />	
	</Card>
	
	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Details on Field of Study</Heading>
		<FormExtentDetails />
	</Card>

	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Skills in Mathematics</Heading>
		<FormTableTopics />
	</Card>

	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Programming skills</Heading>
		<FormTableProgramming />
	</Card>

	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Motivation</Heading>
		<FormTableQuestions />
	</Card>
	<ButtonDownloadData />-->
	<!--<Card size="xl" class="my-2"></Card>
		<ButtonDownloadData />
	</Card>-->
</div>
