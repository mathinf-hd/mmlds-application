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
			Please fill in the form and then click "Download form data" to download a form-data.txt file
			that you can then upload to your application.
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
		Download form data
	</Button>
</div>
