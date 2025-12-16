<script lang="ts">
import { Dropdown, Checkbox, Button, P } from 'flowbite-svelte'; // replaced Radio with Checkbox
import { ChevronDownOutline } from 'flowbite-svelte-icons';
import { formTimeSlots } from '$lib/times';
import { data, toggleTimeSlot } from '$lib/store/store';
</script>

<P> In case you are invited to an online interview, which general time slot would be more convenient for you? You may select one or both. </P>

<div class="my-4">
  <Button>
    { $data.timeSlots?.length ? $data.timeSlots.join(', ') : "Please select Time slot(s)"} 
    <ChevronDownOutline class="text-2xs m-2" />
  </Button>

  <Dropdown class="text-2xs p-2">
    {#each formTimeSlots as time}
      <li>
        <Checkbox
          name="timeS"
          value={time.name}
          checked={$data.timeSlots.includes(time.name)}
          on:change={() => toggleTimeSlot(time.name, !$data.timeSlots.includes(time.name))}
        >
          {time.name}
        </Checkbox>
      </li>
    {/each}
  </Dropdown>
</div>

