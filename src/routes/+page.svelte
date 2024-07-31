<script lang="ts">
	import { Button, Card, Heading, P } from 'flowbite-svelte';

	import FormExtentDetails from '$lib/components/FormExtentDetails.svelte';
	import FormTableTopics from '$lib/components/FormTableTopics.svelte';
	import FormLectureAssigment from '$lib/components/FormLectureAssigment.svelte';
	import FormTableQuestions from '$lib/components/FormTableQuestions.svelte';

	import ButtonDownloadData from '$lib/components/ButtonDownloadData.svelte';

</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center">
	<Heading class="my-2 p-4 text-center">Skills and Motivation</Heading>
	
	<Card size="xl" class="my-2">
		<P>
			Please declare your skills and motivation by filling in this form and then clicking "Save form data" at the bottom to save its contents to a form-data.txt file. You can then upload this file to your application in heiCO. Please notice that the form is filled locally on your computer, i.e., your contents are not sent to any server.
		</P>
		<br>
		<P>
			Each of your skills has to be declared by checking the respective checkbox, adding the name of the respective lecture as listed in the transcript (same lecture may apply to several skills), providing the credit points of the lecture (or equivalent) as listed in the transcript, and copying and pasting the official module description of the lecture describing its content to the "Module Description" field, as, e.g., provided in the module handbook of your field of study.
		</P>
	</Card>
	
	<Card size="xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Extent of previous studies</Heading>
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
