<script lang="ts">

	import { Card, Alert, Checkbox, Heading, P, Button} from 'flowbite-svelte';
	import { data, loadEvalData, pointEquivalentECTS } from '$lib/store/store';
	import { BadgeCheckSolid, ExclamationCircleSolid, PrinterSolid, InfoCircleSolid } from "flowbite-svelte-icons";

	import { onMount } from "svelte";
	// Declare variables but don't load data yet
	let applicationId: string | undefined | null = null;
	let loading = true;
	let success = false;

	onMount(async () => {
		try {
			
			const path = window.location.pathname;
			applicationId = path.split('/').pop(); // or more specific parsing based on your URL structure
			
			let filename = null

			if (applicationId) filename = applicationId + ".txt";

			if (filename) {
				const loadedData = await loadEvalData(filename);
				data.set(loadedData);

				if (loadedData.extentDetails["duration"] != null){
					success = true
				}

				loading = false;
			}

			else {
				success = false;
				loading = false;
			}

		} catch (error) {
			console.error('Error loading data:', error);
			// Handle error appropriately
		}
	});

	let numSkills = 0;
	let cpComputerScience = 0;
	let cpMathematics = 0;

	function updateScore(){
		numSkills = Array.from(document.getElementsByClassName('skill'))
  					.filter((input: any) => input.checked)
  					.length;
		
		cpComputerScience = Array.from(document.getElementsByClassName('computer-science'))
  					.filter((input: any) => input.checked)
					.map((el:any) => el.value)
					.reduce((acc, curr) => Number(acc) + Number(curr), 0);
		
		cpMathematics = Array.from(document.getElementsByClassName('mathematics'))
  					.filter((input: any) => input.checked)
					.map((el:any) => el.value)
					.reduce((acc, curr) => Number(acc) + Number(curr), 0);
	}

	async function getTimeStamp(){
    return await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC')
        .then(response => response.json())
        .then(data => {
            const timestamp = new Date(data.utc_datetime).toISOString();
            return { type: "world", timestamp: timestamp }
        })
        .catch(() => {
            const timestamp = new Date().toISOString();
            return { type: "local", timestamp: timestamp }
        });
	}


	function downloadPrintVersion() {
		window.print();
	}
	/*
    // Get the content you want to print
    const contentElement = document.querySelector('#evaluation-container');
    if (!contentElement) return;

	const timeStamp = await getTimeStamp()

    // Clone the content to avoid modifying the original
    const contentClone = contentElement.cloneNode(true) as HTMLElement;
    // Remove scripts and event handlers
    const scripts = contentClone.getElementsByTagName('script');
    while (scripts[0]) {
        scripts[0].parentNode?.removeChild(scripts[0]);
    }

    // Get styles more safely
    let styles = '';
    try {
        const stylesheets = document.styleSheets;
        for (let i = 0; i < stylesheets.length; i++) {
            const stylesheet = stylesheets[i];
            try {
                if (stylesheet.href && !stylesheet.href.startsWith(window.location.origin)) {
                    continue; // Skip external stylesheets
                }
                const rules = stylesheet.cssRules || stylesheet.rules;
                for (let j = 0; j < rules.length; j++) {
                    // Skip problematic rules
                    if (rules[j].type === CSSRule.STYLE_RULE) {
                        styles += rules[j].cssText + '\n';
                    }
                }
            } catch (e) {
                console.warn('Could not process stylesheet', stylesheet.href, e);
            }
        }
    } catch (e) {
        console.warn('Error processing stylesheets', e);
    }

    const printDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Print Version</title>
            <style>
               
                ${styles}
                
                @media print {
                    body { margin: 2cm; }
                    .no-print { display: none !important; }
                    button, .button { display: none !important; }
                }
                
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 2cm;
                }
            </style>
        </head>
        <body>
			Evaluation Date: ${timeStamp.timestamp} (${timeStamp.type} time)
            ${contentClone.innerHTML}
        </body>
        </html>
    `;

    const blob = new Blob([printDoc], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =  `evaluation-${applicationId}-${timeStamp.timestamp}.html`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
	} */
</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center" id="evaluation-container">
	<Heading class="my-2 p-4 text-center">Evaluation</Heading>
	<div class="max-w-2xl mx-auto flex gap-4 items-center mb-8">
		<P class="font-bold">Application ID:</P>
		<div class="bg-gray-50 border-gray-300 rounded-lg p-2 w-60 text-xs text-gray-900 border">{loading ? "loading..." : applicationId ? applicationId : "no Appliaction ID specified"}</div>
	</div>
	
	{#if !loading}
		{#if !success}
			
			<Alert color="red">
				<InfoCircleSolid slot="icon" class="w-5 h-5" />
				{#if !!applicationId} 
					Application File for ID '{applicationId}' not found 
				{:else}
				No application specified, add an ID to your url <br/>
				e.g. evaluate/123456
				{/if}
			</Alert>


		{:else}

		<Card size="xl" class="my-2">
			<Heading tag="h3" class="mb-4 text-center">Details on Field of Study</Heading>
			<div class="flex items-center justify-center">
					<div class="w-40"><P class="font-bold">Duration (months)</P></div>
					<div class="w-20 text-2xs bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border text-center">{$data["extentDetails"]["duration"]}</div>
					<div class="w-32" />
					<div class="w-32"><P class="font-bold">Total Points</P></div>
					<div class="w-20 text-2xs bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border text-center">{$data["extentDetails"]["points"]}</div>
			</div>
		</Card>
	
		<Card size="xl" class="my-2">
			<div class="max-w-2xl mx-auto">
				<Heading tag="h3" class="mb-4 text-center">Skills</Heading>
				
				{#each $data.lectures as lecture, lectureIdx}
					<div class="mb-24 flex flex-col">
						
							<Heading tag="h5">Lecture {lectureIdx + 1}: {lecture.name}</Heading>
							<div class="mb-4">
								{pointEquivalentECTS(lecture.points)} ECTS ({lecture.points} Points in original data)
							</div>
	
							<P class="font-bold mb-1">Module Description</P>
							<div class="bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border mb-8">
								{lecture.description}
							</div>
							
							<div class="text-gray-900 grid grid-cols-[400px,auto] mb-8">
							<P class="font-bold mb-1">Subject Area</P>
							<P class="font-bold mb-1">Confirm?</P>
							
							{#if lecture.subject == "computer science"}
								<div class="pl-2">
									{lecture.subject}
								</div>
								<Checkbox class="computer-science" bind:value={lecture.points} on:change={updateScore}></Checkbox>
							{/if}
	
							{#if lecture.subject == "mathematics"}
								<div class="pl-2">
									{lecture.subject}
								</div>
								<Checkbox class="mathematics" bind:value={lecture.points} on:change={updateScore}></Checkbox>
							{/if}
							</div>
	
							<div class="text-gray-900 grid grid-cols-[400px,auto]">
								<P class="font-bold mb-1">Declared Skills</P>
								<P class="font-bold mb-1">Confirm?</P>
								{#each Object.keys(lecture.skills) as skill}
										{#if lecture.skills[skill] == true}
												<div class="pl-2">{skill}</div>
												<Checkbox class="skill" on:change={updateScore}></Checkbox>	
										{/if}
								{/each}
							</div>
						</div>
					
				{/each}
				
				<Heading tag="h4" class="mb-4 text-center">Results</Heading>
				<div class="text-gray-900 mb-8">
					<div class="flex flex-row mb-2 justify-center h-12 items-center">
						<div class="w-60 font-bold">CP Computer Science</div>
						<div class="w-16">{cpComputerScience} / 56</div>
						<div class="w-8">
							{#if cpComputerScience >= 56}
								<BadgeCheckSolid size="lg" color="green"/>
							{:else}
								<ExclamationCircleSolid size="lg" color="red"/>
							{/if}
						</div>
					</div>
					<div class="flex flex-row mb-2 justify-center h-12 items-center">
						<div class="w-60 font-bold">CP Mathematics</div>
						<div class="w-16 ">{cpMathematics} / 16 </div>
						<div class="w-8">
							{#if cpMathematics >= 16}
								<BadgeCheckSolid size="lg" color="green"/>
							{:else}
								<ExclamationCircleSolid size="lg" color="red"/>
							{/if}
						</div>
					</div>
					<div class="flex flex-row mb-2 justify-center h-12 items-center">
						<div class="w-60 font-bold">Number of confirmed Skills</div>
						<div class="w-24 font-bold text-center">{numSkills}</div>
					</div>
			</div>
	
			
	
	
		</Card>
	
		<Card size="xl" class="my-2">
			<div class="max-w-2xl mx-auto">
			<Heading tag="h3" class="mb-4 text-center">Motivation</Heading>
			
			{#each Object.keys($data.questions) as question}
				<P class="font-bold mb-2">{question}</P>
				<div class="bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border mb-8">
					{$data.questions[question]}
				</div>
			{/each}
			</div>
		</Card>
		
		<Button color="primary" class="my-4 px-8 generate-report" on:click={downloadPrintVersion}>
			<PrinterSolid />
			<div class="pl-4">Generate Evaluation Report</div>
		</Button>

		{/if}

	{/if}

</div>
