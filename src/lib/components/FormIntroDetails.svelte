<script lang="ts">
  import { onMount } from 'svelte';
  import { P } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { formTimeSlots } from '$lib/times';
  import { data } from '$lib/store/store';

  let isOpen = false;

  // Close dropdown if clicked outside
  let dropdownRef: HTMLDivElement;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  function toggleSlot(name: string) {
    data.update(d => {
      if (!d.timeSlots) d.timeSlots = [];
      if (d.timeSlots.includes(name)) {
        d.timeSlots = d.timeSlots.filter(n => n !== name);
      } else {
        d.timeSlots = [...d.timeSlots, name];
      }
      return d;
    });
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }
</script>

<style>
  .dropdown-panel {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 0.5rem;
    margin-top: 0.25rem;
    z-index: 50;
    width: 100%;
    max-width: 300px;
  }
</style>

<div class="my-4 relative inline-block w-full max-w-sm" bind:this={dropdownRef}>
  <P class="mb-2">
    In case you are invited to an online interview, which general time slots would be convenient for you?
  </P>

  <button
    type="button"
    class="flex items-center justify-between w-full border rounded px-4 py-2 bg-white shadow-sm"
    on:click={toggleDropdown}
  >
    {#if $data.timeSlots && $data.timeSlots.length > 0}
      {$data.timeSlots.join(', ')}
    {:else}
      Please select Time slots
    {/if}
    <ChevronDownOutline class="text-2xs ml-2" />
  </button>

  {#if isOpen}
    <div class="dropdown-panel">
      {#each formTimeSlots as time}
        <label class="flex items-center space-x-2 my-1">
          <input
            type="checkbox"
            value={time.name}
            checked={$data.timeSlots && $data.timeSlots.includes(time.name)}
            on:change={() => toggleSlot(time.name)}
          />
          <span>{time.name}</span>
        </label>
      {/each}
    </div>
  {/if}
</div>
