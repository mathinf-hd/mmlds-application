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
	<Heading tag="h1" class="my-2 p-4 text-center">Skills, Lectures, and Motivation</Heading>
	<Heading tag="h2" class="mb-4 text-center">
		Application for Master Mathematics of Machine Learning and Data Science
	</Heading>

	<Card size="xl" class="my-2">
	<P> Please declare the details on your bachelor's field of study, your lectures and skills to be recognized, and provide your answers to the motivation questions, by filling in this form and then clicking "Save form data" at the bottom to save its contents to a file. Subsequently, upload this file to your application in heiCO. <b>Please notice</b> that the form is filled locally on your computer, i.e., your contents are not sent to any server.</P>
	</Card>


	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Interview Time</Heading>	
		<FormIntroDetails />	
	</Card>
	
	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Your Education: Details on Field of Study</Heading>
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
	<ButtonDownloadData />
	<!--<Card size="xl" class="my-2"></Card>
		<ButtonDownloadData />
	</Card>-->
</div>
