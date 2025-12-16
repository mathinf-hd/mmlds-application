<script lang="ts">
import { Dropdown, DropdownItem, Radio,
       	 	   Button, CloseButton, Checkbox, Heading, Input, P, Table, 
		   TableBody, TableBodyCell, TableBodyRow, 
		   TableHead, TableHeadCell, Drawer } from 'flowbite-svelte';
import { TrashBinOutline, ChevronDownOutline }  from 'flowbite-svelte-icons';

import GenericValidatedInput from './GenericValidatedInput.svelte';
import { formTopics } from '$lib/topics';

import { addLecture, data, removeLecture, selectArea, toggleSkill } from '$lib/store/store';

import { sineIn } from 'svelte/easing';

let areaA = 'Please select Area A';
let areaB = 'Please select Area B';
let areaC = 'Please select Area C';

let selectedDrawer = 0;
let hiddenDrawer = true;

// Function to open the drawer
function openDrawer(index: number) {
	selectedDrawer = index;
	hiddenDrawer = false;
}

let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
};

</script>

<P>
	The admission regulations recognize skills in <b>Mathematics</b> which you acquired in the following areas through corresponding foundational lectures (each 8 ECTS): Analysis, Linear Algebra, and three of the five areas: Functional Analysis, Differential Geometry, Optimization, Statistics and Probability Theory, Numerical Analysis. Please indicate the three areas A, B and C  where you have the required Mathematics skills already earned.   
</P>

<!-- Area A Dropdown -->
 <div class="my-4">
	<Button>
	{areaA} <ChevronDownOutline class="text-2xs m" />
	</Button>
	<Dropdown class="text-2xs p-2">
	{#each formTopics as topic}
		{#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
		<li>
			<Radio
			name="areaA"
			value={topic.name}
			checked={areaA === topic.name}
			on:change={() => {
				const prev = areaA;
				areaA = topic.name;
				selectArea(topic.name, prev === 'Please select Area A' ? undefined : prev);
			}}
			>
			{topic.name}
			</Radio>
		</li>
		{/if}
	{/each}
	</Dropdown>

	<!-- Area B Dropdown -->
	<Button>
	{areaB} <ChevronDownOutline class="text-2xs m" />
	</Button>
	<Dropdown class="text-2xs p-2">
	{#each formTopics as topic}
		{#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
		<li>
			<Radio
			name="areaB"
			value={topic.name}
			checked={areaB === topic.name}
			on:change={() => {
				const prev = areaB;
				areaB = topic.name;
				selectArea(topic.name, prev === 'Please select Area B' ? undefined : prev);
			}}
			>
			{topic.name}
			</Radio>
		</li>
		{/if}
	{/each}
	</Dropdown>

	<!-- Area C Dropdown -->
	<Button>
	{areaC} <ChevronDownOutline class="text-2xs m" />
	</Button>
	<Dropdown class="text-2xs p-2">
	{#each formTopics as topic}
		{#if topic.name !== areaA && topic.name !== areaB && topic.name !== areaC}
		<li>
			<Radio
			name="areaC"
			value={topic.name}
			checked={areaC === topic.name}
			on:change={() => {
				const prev = areaC;
				areaC = topic.name;
				selectArea(topic.name, prev === 'Please select Area C' ? undefined : prev);
			}}
			>
			{topic.name}
			</Radio>
		</li>
		{/if}
	{/each}
	</Dropdown>
</div>

<P>
	To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. 
	To declare your earned skills, check the respective checkboxes. Finally, copy and paste the entire official description of the lecture 
	(as, e.g., provided in the module handbook of your field of study) to the "Module Description" field 
	(after translation to English using some automatic translation service, in case it is not given in English).
</P>




{#each formTopics as topic, topicIdx}
	<div class="my-4">
		<Heading tag="h4" class="mb-4">
			{topic.name}
			<Button  on:click={() => openDrawer(topicIdx)}> Overview of perequired skills</Button>
		</Heading>	
		<Table class="overflow-x-auto" striped={true}>	
				<TableHead class="normal-case bg-primary-700 text-white">
					<TableHeadCell class="min-w-60 text-2xs p-2">
						Lecture Name in Transcript
					</TableHeadCell>
					{#each topic.subtopics as subTopic}
						<TableHeadCell class="text-2xs p-2 m-auto">{subTopic}</TableHeadCell>
					{/each}
					<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
					<TableHeadCell class="text-2xs p-2"></TableHeadCell>
				</TableHead>
				<TableBody>
					{#each ($data.mathematics.lectures[topic.name] ?? []) as lecture, lectureIdx}
					<TableBodyRow>
						<TableBodyCell class="p-2"><Input 
							type="text" 
							bind:value={lecture.lectureName}  
							class="text-2xs"/>
						</TableBodyCell>
						{#each topic.subtopics as subTopic}
							<TableBodyCell class="p-2">
								<Checkbox 
								checked={lecture.skills.includes(subTopic)} 
								on:change={(e) => toggleSkill(topic.name, lectureIdx, subTopic, e.target.checked)}
								class="m-auto"
							/>
							</TableBodyCell>
						{/each}
						<TableBodyCell class="p-2 text-2xs">
							<Input type="text" bind:value={lecture.moduleDescription} class="text-2xs"/>
						</TableBodyCell>
						<TableBodyCell class="p-2">
							<Button color="red" size="xs" class="text-2xs" on:click={() => removeLecture(topic.name, lectureIdx)}><TrashBinOutline /></Button>
						</TableBodyCell>
					</TableBodyRow>
					{/each}
				</TableBody>
		</Table>
		<Button class="text-2xs m-2" on:click={() => addLecture(topic.name)}>Add Another Lecture</Button>
	</div>
{/each}

<Drawer
	placement="left"
	transitionType="fly"
	transitionParams={transitionParams}
	bind:hidden={hiddenDrawer}
	id=sidebarDrawer
	class="w-72 text-sm font-light">
	<div class="bg-primary-700 flex items-start p-2 items-center justify-between"> 
		<p class="text-base font-semibold">
			Prerequired skills in {formTopics[selectedDrawer].name}
		</p>
		<CloseButton on:click={() => (hiddenDrawer = true)} class="hover:bg-primary-800 text-white" />
	</div>
	<ul class="p-2 bg-gray-50">
		{#each formTopics[selectedDrawer].module as module}
			<li class="text-sm list-disc ml-4 mb-2" style="list-style-type: circle"> {module} </li>
		{/each}
	</ul>
</Drawer>
