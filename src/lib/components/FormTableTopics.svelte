<script lang="ts">
import { Dropdown, DropdownItem, Radio,
       	 	   Button, CloseButton, Checkbox, Heading, Input, P, Table, 
		   TableBody, TableBodyCell, TableBodyRow, 
		   TableHead, TableHeadCell, Drawer} from 'flowbite-svelte';
import { TrashBinOutline, ChevronDownOutline }  from 'flowbite-svelte-icons';

import GenericValidatedInput from './GenericValidatedInput.svelte';
import { formTopics } from '$lib/topics';

import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';

let areaA = 'Please select Area A';
let areaB = 'Please select Area B';
let areaC = 'Please select Area C';

import { sineIn } from 'svelte/easing';


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

<div class="my-4">
<Button>
  {areaA} <ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic}
 	{#if topic.name !== areaB && topic.name !== areaC}
  	<li>
    	<Radio name="areaA" bind:group={areaA} value={topic.name}>{topic.name}</Radio>
  	</li>
	{/if}
  {/each}
</Dropdown>
<Button>
  {areaB} <ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic}
 	{#if topic.name !== areaA && topic.name !== areaC}
  	<li>
    	<Radio name="areaB" bind:group={areaB} value={topic.name}>{topic.name}</Radio>
  	</li>
  	{/if}
  {/each}
</Dropdown>
<Button>
  {areaC} <ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic}
  	{#if topic.name !== areaA && topic.name !== areaB}
     	<li>
      	<Radio name="areaC" bind:group={areaC} value={topic.name}>{topic.name}</Radio>
    	</li>
	{/if}
 {/each}
</Dropdown>
</div>
<P>
To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. To declare your earned skills, check the respective checkboxes. Finally, copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>




{#each formTopics as topic, topicIdx}

<div class="my-4">
     <Heading tag="h4" class="mb-4">{topic.name}
     <Button  on:click={() => openDrawer(topicIdx)}> Overview of perequired skills</Button>
     </Heading>	
	<Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				{#each topic.subtopics as subTopic}
					<TableHeadCell class="text-2xs p-2 m-auto">{subTopic}</TableHeadCell>
				{/each}
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $data.lectures as lecture, lectureIdx}
				<TableBodyRow>
					<TableBodyCell class="p-2"><GenericValidatedInput type="text" bind:value={lecture.name} validateFn={() => checkDuplicateLecture(lectureIdx)} class="text-2xs"/></TableBodyCell>
					{#each topic.subtopics as subTopic}
					<TableBodyCell class="p-2"><Checkbox bind:checked={lecture.skills[subTopic]} on:change={() => addSkill(lectureIdx, subTopic)} class="m-auto"/></TableBodyCell>
					{/each}
					<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={lecture.description} class="text-2xs"/></TableBodyCell>
					<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => deleteLecture(lectureIdx)}><TrashBinOutline /></Button></TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addLecture()}>Add Another Lecture</Button>
</div>
{/each}

     <Drawer
     placement="left"
     transitionType="fly"
     transitionParams={transitionParams}
     bind:hidden={hiddenDrawer}
     id=sidebarDrawer
     class="w-64 text-sm font-light">
     <div class="flex items-center">
     <CloseButton on:click={() => (hiddenDrawer = true)} class="mb-4 dark:text-wh" />
     </div>
     <p class="text-sm p-2 bg-primary-700 text-white">
     Prerequired skills in <br> {formTopics[selectedDrawer].name}</p>
     <ul>
     {#each formTopics[selectedDrawer].modul as modul}
     <li class="text-sm" style="list-style-type: circle"> {modul} </li>
     {/each}
     </ul>
     </Drawer>
