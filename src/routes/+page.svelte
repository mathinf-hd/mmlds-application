<script>
	function downloadFile() {
		const link = document.createElement('a');
		const content = 'abc1234';
		const file = new Blob([content], { type: 'text/plain' });
		link.href = URL.createObjectURL(file);
		link.download = 'sample.txt';
		link.click();
		URL.revokeObjectURL(link.href);
	}
</script>

<h1>Test Form</h1>

<button on:click={downloadFile}>Download</button>
