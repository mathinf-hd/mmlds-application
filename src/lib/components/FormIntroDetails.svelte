<script lang="ts">
import { Dropdown, DropdownItem, Radio,
       	 	   Button, Heading, Input, P} from 'flowbite-svelte';
import { ChevronDownOutline }  from 'flowbite-svelte-icons';
import { formTimeSlots } from '$lib/times';
import { data } from '$lib/store/store';
</script>

<P> Please declare the details on your bachelor's field of study, your lectures and skills to be recognized, and provide your answers to the motivation questions, by filling in this form and then clicking "Save form data" at the bottom to save its contents to a file. Subsequently, upload this file to your application in heiCO. <b>Please notice</b> that the form is filled locally on your computer, i.e., your contents are not sent to any server.</P>
<br>
<P> In case you are invited to an online interview which general time slot would be more convenient for you. </P>

<div class="my-4">
  <!-- Button that shows the currently selected slot (or a placeholder if empty) -->
  <Button>
    { $data.timeSlot ? $data.timeSlot : "Please select Time slot"} 
    <ChevronDownOutline class="text-2xs m-2" />
  </Button>

  <!-- Dropdown of radio buttons for each possible slot -->
  <Dropdown class="text-2xs p-2">
    {#each formTimeSlots as time}
      <li>	
        <Radio name="timeS" bind:group={$data.timeSlot} value={time.name}>{time.name}</Radio>
      </li>
    {/each}
  </Dropdown>
</div>

