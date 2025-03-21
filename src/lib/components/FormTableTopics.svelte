<script lang="ts">
import { Popover,  Dropdown, DropdownItem, Radio,
       	 	   Drawer, Button, CloseButton, Checkbox, Heading, Input, P, Table, 
		   TableBody, TableBodyCell, TableBodyRow, 
		   TableHead, TableHeadCell } from 'flowbite-svelte';
import { TrashBinOutline, ChevronDownOutline }  from 'flowbite-svelte-icons';

import PositiveNumberInput from './PositiveNumberInput.svelte';
import GenericValidatedInput from './GenericValidatedInput.svelte';
import { formTopics } from '$lib/topics';

import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';

let areaA = 'Please select Area A';
let areaB = 'Please select Area B';
let areaC = 'Please select Area C';

import { sineIn } from 'svelte/easing';

let hiddenList = Array.from({ length: formTopics.length }, (_, index) => ({
    id: `sidebar${index + 1}`,
    open: false,
  }));



let transitionParams = {
    x: -460,
    duration: 300,
    easing: sineIn
  };

</script>

<P>
	The admission regulations recognize skills in <b>Mathematics</b> which you acquired in the following areas through corresponding foundational lectures (each 8 ECTS): Analysis, Linear Algebra, and three of the five areas: Functional Analysis, Differential Geometry, Optimization, Statistics and Probability Theory, Numerical Analysis. Please indicate the three areas A, B and C  where you have the required Mathematics skills already earned.   
</P>

<div class="my-4">
<Button on:click={() => (areaB = 'Please select Area B')}>
  {areaA} <ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic} 
  <li>
    <Radio name="areaA" bind:group={areaA} value={topic.name}>{topic.name}</Radio>
  </li>
  {/each}
</Dropdown>
<Button on:click={() => (areaC = 'Please select Area C')}>
  {areaB}<ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic}
 {#if topic.name != areaA}
  <li>
    <Radio name="areaB" bind:group={areaB} value={topic.name}>{topic.name}</Radio>
  </li>
  {:else}
    <Radio name="areaB" bind:group={areaB} value={topic.name} disabled>{topic.name}</Radio>
  {/if}
  {/each}
</Dropdown>
<Button>
  {areaC}<ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTopics as topic}
  {#if topic.name != areaA}
   {#if topic.name != areaB}
     <li>
      <Radio name="areaC" bind:group={areaC} value={topic.name}>{topic.name}</Radio>
    </li>
   {:else}
    <Radio name="areaC" bind:group={areaC} value={topic.name} disabled>{topic.name}</Radio>
   {/if}
  {:else}
   <Radio name="areaC" bind:group={areaC} value={topic.name} disabled>{topic.name}</Radio>
  {/if}  
 {/each}
</Dropdown>
</div>
<P>
To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript and its number of points as listed in the transcript. To declare your earned skills, check the respective checkboxes. Finally, copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>




{#each formTopics as topic, topicIdx}

{ topicIdx } { hiddenList[topicIdx].id } { hiddenList[topicIdx].open }

<div class="my-4">
     <Heading tag="h4" class="mb-4">{topic.name}  <Button on:click={() => (hiddenList[topicIdx].open = false)}> Overview of perequired skills</Button>
     <Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenList[topicIdx].open}  id={hiddenList[topicIdx].id}>
     <div class="flex items-center">
     <CloseButton on:click={() => (hiddenList[topicIdx].open = true)} class="mb-4 dark:text-white" />
     </div>
     <p class="normal-case bg-primary-700 text-white">
     Required skills in {topic.name} <br> {hiddenList[topicIdx].open}</p>
     <ul>
     {#each topic.modul as modul}
     <li style="list-style-type: circle"> {modul} <li>
     {/each}
     </ul>	
     </Drawer>
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
