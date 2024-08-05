<script lang="ts">
	import { Card, Heading, P } from 'flowbite-svelte';

	import FormExtentDetails from '$lib/components/FormExtentDetails.svelte';
	import FormTableTopics from '$lib/components/FormTableTopics.svelte';
	import FormLectureAssigment from '$lib/components/FormLectureAssigment.svelte';
	import FormTableQuestions from '$lib/components/FormTableQuestions.svelte';

	import ButtonDownloadData from '$lib/components/ButtonDownloadData.svelte';

</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center">
	<Heading class="my-2 p-4 text-center">Skills, Lectures, and Motivation</Heading>
	
	<Card size="xl" class="my-2">
		<P>
			Please declare the details on your bachelor's field of study, your lectures and skills to be recognized, and provide your answers to the motivation questions, by filling in this form and then clicking "Save form data" at the bottom to save its contents to a file. Subsequently, upload this file to your application in heiCO. Please notice that the automatic replication of the lectures across the different fields is intentional (for your convenience), and that the form is filled locally on your computer, i.e., your contents are not sent to any server.
		</P>
	</Card>
	
	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Details on Field of Study</Heading>
		<FormExtentDetails />
	</Card>

	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Skills</Heading>
		<FormTableTopics />
	</Card>

	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Lecture Assignment</Heading>
		<FormLectureAssigment />
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
