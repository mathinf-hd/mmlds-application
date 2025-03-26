<script lang="ts">
import { Dropdown, DropdownItem, Radio,
       	 	   Button, Heading, Input,
		   P     } from 'flowbite-svelte';
import { ChevronDownOutline }  from 'flowbite-svelte-icons';

import { formTimeSlots } from '$lib/times';

import { data } from '$lib/store/store';

let timeS = 'Please select Time slot';

</script>

<P> In case you are invited to an online interview, which general time slot would be more convenient for you? </P>
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

