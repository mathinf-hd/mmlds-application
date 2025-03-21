<script lang="ts">
import { Popover,  Dropdown, DropdownItem, Radio,
       	 	   Button, Checkbox, Heading, Input,
		   P     } from 'flowbite-svelte';
import { ChevronDownOutline }  from 'flowbite-svelte-icons';

import { formTimeSlots } from '$lib/times';

import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';

let timeS = 'Please select Time slot';

</script>

<P> Please declare the details on your bachelor's field of study, your lectures and skills to be recognized, and provide your answers to the motivation questions, by filling in this form and then clicking "Save form data" at the bottom to save its contents to a file. Subsequently, upload this file to your application in heiCO. <b>Please notice</b> that the form is filled locally on your computer, i.e., your contents are not sent to any server.</P>
<br>
<P> In case you are invited to an online interview which general time slot would be more convenient for you. </P>
<div class="my-4">
<Button>
  {timeS} <ChevronDownOutline class="text-2xs m-2" />
</Button>
<Dropdown class="text-2xs p-2">
 {#each formTimeSlots as time}
 <li>	
    <Radio name="timeS" bind:group={timeS} value={time.name}>{time.name}</Radio>
  </li>
  {/each}
</Dropdown>
</div>

