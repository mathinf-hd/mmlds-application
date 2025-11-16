<script lang="ts">
  import {
    Button, Input, P,
    Table, TableBody, TableBodyCell, TableBodyRow,
    TableHead, TableHeadCell, Checkbox, Heading
  } from 'flowbite-svelte';
  import { TrashBinOutline } from 'flowbite-svelte-icons';

  import {
    data,
    addGlobalLecture,
    removeGlobalLecture,
    updateGlobalLectureName,
    updateGlobalLectureDescription,
    addAreaLecture,
    removeAreaLecture,
    setAreaLecture,
    toggleAreaSkill,
    selectArea,
  } from '$lib/store/store';

  import { formTopics } from '$lib/topics';

  function getSkillsForArea(areaName: string): string[] {
    const topic = (formTopics as any[]).find((t) => t.name === areaName);
    return Array.isArray(topic?.skills) ? topic.skills : [];
  }

  function glLabel(gl: { name: string; moduleDescription: string }) {
    const n = gl.name?.trim() || '(no name)';
    const d = gl.moduleDescription?.trim() || '(no description)';
    return `${n} — ${d}`;
  }

  // Flowbite-Svelte <Input> emits CustomEvent with value at e.detail.value
  const inputVal = (e: any) =>
    e?.detail?.value ?? e?.detail ?? e?.target?.value ?? e?.currentTarget?.value ?? '';

  // Flowbite-Svelte <Checkbox> emits CustomEvent<boolean> at e.detail
  const checkboxChecked = (e: any) =>
    (typeof e?.detail === 'boolean' ? e.detail : e?.detail?.checked) ??
    e?.target?.checked ?? e?.currentTarget?.checked ?? false;

  // Native <select> change: cast to HTMLSelectElement
  const selectVal = (e: Event) => (e.target as HTMLSelectElement)?.value ?? '';
</script>

<Heading tag="h3" class="mb-3">Mathematics — Global Lectures</Heading>
<P class="mb-2">
  Add each Mathematics lecture once (as in your transcript). Later, select them per area.
</P>

<Table class="overflow-x-auto" striped={true}>
  <TableHead class="normal-case bg-primary-700 text-white">
    <TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
    <TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
    <TableHeadCell class="text-2xs p-2"></TableHeadCell>
  </TableHead>
  <TableBody>
    {#each $data.mathematics.globalLectures as gl, idx (gl.id)}
      <TableBodyRow>
        <TableBodyCell class="p-2">
          <Input
            type="text"
            class="text-2xs"
            value={gl.name}
            on:change={(e) => updateGlobalLectureName(gl.id, inputVal(e))}
          />
        </TableBodyCell>
        <TableBodyCell class="p-2">
          <Input
            type="text"
            class="text-2xs"
            value={gl.moduleDescription}
            on:change={(e) => updateGlobalLectureDescription(gl.id, inputVal(e))}
          />
        </TableBodyCell>
        <TableBodyCell class="p-2">
          <Button color="red" size="xs" class="text-2xs" on:click={() => removeGlobalLecture(gl.id)}>
            <TrashBinOutline />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
<Button class="text-2xs m-2" on:click={() => addGlobalLecture()}>
  Add Another Lecture
</Button>

<Heading tag="h3" class="mt-8 mb-3">Select 3 Areas</Heading>
<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
  {#each formTopics as t}
    <Button
      size="xs"
      outline={!$data.mathematics.area.includes(t.name)}
      on:click={() => selectArea(t.name)}
      class="justify-start"
    >
      {#if $data.mathematics.area.includes(t.name)}✓ {/if}{t.name}
    </Button>
  {/each}
</div>
<P class="mt-2 text-2xs opacity-70">Tip: Click an area to add it (you need exactly 3).</P>

{#each $data.mathematics.area as areaName}
  <div class="my-6 border rounded-xl p-4">
    <Heading tag="h4" class="mb-3">{areaName}</Heading>

    <Table class="overflow-x-auto" striped={true}>
      <TableHead class="normal-case bg-primary-700 text-white">
        <TableHeadCell class="min-w-60 text-2xs p-2">Select Lecture</TableHeadCell>
        <TableHeadCell class="text-2xs p-2">Skills</TableHeadCell>
        <TableHeadCell class="text-2xs p-2"></TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $data.mathematics.areaLectures[areaName] ?? [] as row, idx}
          <TableBodyRow>
            <TableBodyCell class="p-2">
              <select
                class="w-full text-xs border rounded px-2 py-1"
                on:change={(e) => setAreaLecture(areaName, idx, selectVal(e) || null)}
              >
                <option value=''>— choose from global lectures —</option>
                {#each $data.mathematics.globalLectures as gl}
                  <option value={gl.id} selected={row.lectureId === gl.id}>
                    {glLabel(gl)}
                  </option>
                {/each}
              </select>
            </TableBodyCell>

            <TableBodyCell class="p-2">
              <div class="flex flex-wrap gap-2">
                {#each getSkillsForArea(areaName) as skill}
                  <label class="flex items-center gap-1 text-2xs">
                    <Checkbox
                      checked={row.skills.includes(skill)}
                      on:change={(e) => toggleAreaSkill(areaName, idx, skill, checkboxChecked(e))}
                    />
                    <span>{skill}</span>
                  </label>
                {/each}
              </div>
            </TableBodyCell>

            <TableBodyCell class="p-2">
              <Button color="red" size="xs" class="text-2xs" on:click={() => removeAreaLecture(areaName, idx)}>
                <TrashBinOutline />
              </Button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>

    <Button class="text-2xs m-2" on:click={() => addAreaLecture(areaName)}>
      Add Lecture to this Area
    </Button>
  </div>
{/each}
