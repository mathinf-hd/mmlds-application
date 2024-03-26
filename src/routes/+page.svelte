<script lang="ts">
	import Button from 'flowbite-svelte/Button.svelte';
	import Card from 'flowbite-svelte/Card.svelte';
	import Heading from 'flowbite-svelte/Heading.svelte';
	import P from 'flowbite-svelte/P.svelte';
	import DownloadOutline from 'flowbite-svelte-icons/DownloadOutline.svelte';

	import FormTableTopics from '$lib/components/FormTableTopics.svelte';
	import FormTableQuestions from '$lib/components/FormTableQuestions.svelte';

	import { formFields } from '$lib/formFields';
	import { formTopics } from '$lib/formTopics';
	import { formQuestions } from '$lib/formQuestions';
	import { downloadFormAsJsonFile, makeFormData } from '$lib/formUtils';

	let data = makeFormData(formTopics, formFields, formQuestions);

	function downloadFormData() {
		const filename = 'form-data.txt';
		console.log('Download:', data);
		downloadFormAsJsonFile(filename, data);
	}
</script>

<div class="flex flex-col md:container md:mx-auto">
	<Heading class="my-2 p-4 text-center">Skills and Motivation</Heading>
	<Card size="2xl" class="my-2">
		<P>
			Please fill in this form and then click "Save form data" to save its contents to a form-data.txt file, 
			that you can then upload to your application in heiCONF. Please notice that the form is filled locally on your computer, i.e., your contents are not sent to any server.
		</P>
		<P>
			Each of your skills has to be declared by checking the checkbox, adding the name of the respective lecture as listed in the transcript (same lecture may apply to several skills), providing the credit points of the lecture as listed in the transcript, and copying and pasting the official module description of the lecture describing its content to the "Module Description" field, as, e.g., provided in the module handbook of your field of study.
		</P>
	</Card>
	<Card size="2xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Skills</Heading>
		<FormTableTopics fields={formFields} topics={formTopics} bind:data={data.topics} />
	</Card>
	<Card size="2xl" class="my-2">
		<Heading tag="h3" class="mb-4 text-center">Motivation</Heading>
		<FormTableQuestions questions={formQuestions} bind:data={data.questions} />
	</Card>
	<Button color="primary" class="m-4" on:click={downloadFormData}>
		<DownloadOutline />
		Save form data
	</Button>
</div>
