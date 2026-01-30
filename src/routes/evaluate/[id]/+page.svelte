<script lang="ts">
  import { Card, Alert, Checkbox, Heading, P, Button, Accordion, AccordionItem } from 'flowbite-svelte';
  import { data, loadEvalData } from '$lib/store/store';
  import { BadgeCheckSolid, ExclamationCircleSolid, PrinterSolid, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { onMount, tick } from 'svelte';

  // Declare variables but don't load data yet
  let applicationId: string | undefined | null = null;
  let loading = true;
  let success = false;
  let numSkills = 0;
  let cpComputerScience = 0;
  let cpMathematics = 0;

  onMount(async () => {
    try {
      const path = window.location.pathname;
      applicationId = path.split('/').pop();

      let filename: string | null = null;
      if (applicationId) filename = applicationId + '.txt';

      if (filename) {
        const loadedData = await loadEvalData(filename);
        data.set(loadedData);

        if (loadedData.extentDetails?.['duration'] != null) {
          success = true;
        }

        loading = false;
        await tick();
        updateScore();
      } else {
        success = false;
        loading = false;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      success = false;
      loading = false;
    }
  });

  function updateScore() {
    numSkills = Array.from(document.getElementsByClassName('skill'))
      .filter((input: any) => input.checked).length;

    cpComputerScience = Array.from(document.getElementsByClassName('computer-science'))
      .filter((input: any) => input.checked)
      .map((el: any) => el.value)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);

    cpComputerScience = Math.round(cpComputerScience);

    cpMathematics = Array.from(document.getElementsByClassName('mathematics'))
      .filter((input: any) => input.checked)
      .map((el: any) => el.value)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);

    cpMathematics = Math.round(cpMathematics);
  }

  function downloadPrintVersion() {
    window.print();
  }

  /**
   * Build a map: lectureId -> array of declared skill strings
   * In your current model, skills live in $data.mathematics.lectures[area][].skills (string[])
   */
  $: skillsByLectureId = (() => {
    const map = new Map<string, string[]>();

    const lecturesByArea = $data?.mathematics?.lectures ?? {};
    for (const area of Object.keys(lecturesByArea)) {
      const arr = lecturesByArea[area] ?? [];
      for (const lec of arr) {
        const id = lec?.id;
        if (!id) continue;
        const skillsArr: string[] = Array.isArray(lec.skills) ? lec.skills : [];
        if (skillsArr.length === 0) continue;

        const existing = map.get(id) ?? [];
        // merge unique
        const merged = Array.from(new Set([...existing, ...skillsArr]));
        map.set(id, merged);
      }
    }

    return map;
  })();
</script>

<div class="flex flex-col md:container md:mx-auto m-2 items-center" id="evaluation-container">
  <Heading class="my-2 p-4 text-center">Evaluation</Heading>
  <div class="max-w-2xl mx-auto flex gap-4 items-center mb-8">
    <P class="font-bold">Application ID:</P>
    <div class="bg-gray-50 border-gray-300 rounded-lg p-2 w-60 text-xs text-gray-900 border">
      {loading ? 'loading...' : applicationId ? applicationId : 'no Application ID specified'}
    </div>
  </div>

  {#if !loading}
    {#if !success}
      <Alert color="red">
        <InfoCircleSolid slot="icon" class="w-5 h-5" />
        {#if !!applicationId}
          Application File for ID '{applicationId}' not found
        {:else}
          No application specified, add an ID to your url <br />
          e.g. evaluate/123456
        {/if}
      </Alert>
    {:else}
      <Card size="xl" class="my-2">
        <Heading tag="h3" class="mb-4 text-center">Details on Field of Study</Heading>
      </Card>

      <Card size="xl" class="my-2">
        <div class="max-w-2xl mx-auto">
          <Heading tag="h3" class="mb-4 text-center">Skills</Heading>

          {#each ($data?.mathematics?.lecturePool ?? []) as lecture, lectureIdx}
            {@const lectureId = lecture.id}
            {@const displayName = (lecture.lectureName ?? '').trim() || '(Untitled lecture)'}
            {@const displayDesc = (lecture.moduleDescription ?? '').trim()}
            {@const displayGrade = (lecture.grade ?? '').trim()}
            {@const declaredSkills = lectureId ? (skillsByLectureId.get(lectureId) ?? []) : []}

            <div class="mb-24 flex flex-col">
              <Heading tag="h5">
                Lecture {lectureIdx + 1}: {displayName}
                {#if displayGrade}
                  <span class="text-sm text-gray-500 font-normal"> (Grade: {displayGrade})</span>
                {/if}
              </Heading>

              <Accordion flush class="mb-8">
                <AccordionItem>
                  <span slot="header" class="text-base flex">
                    <P class="font-bold">Module Description</P>
                  </span>
                  <div class="bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border whitespace-pre-wrap">
                    {displayDesc || '—'}
                  </div>
                </AccordionItem>
              </Accordion>

              <div class="text-gray-900 grid grid-cols-[400px,auto]">
                <P class="font-bold mb-1">Declared Skills</P>
                <P class="font-bold mb-1">Confirm?</P>

                {#if declaredSkills.length > 0}
                  {#each declaredSkills as skill}
                    <div class="pl-2">{skill}</div>
                    <Checkbox class="skill" on:change={updateScore} checked />
                  {/each}
                {:else}
                  <div class="pl-2 text-gray-500 italic">No skills assigned to this lecture (in Step 3).</div>
                  <div></div>
                {/if}
              </div>
            </div>
          {/each}

          <Heading tag="h4" class="mb-4 text-center">Results</Heading>
          <div class="text-gray-900 mb-8">
            <div class="flex flex-row mb-2 justify-center h-12 items-center">
              <div class="w-60 font-bold">CP Computer Science</div>
              <div class="w-24">{cpComputerScience} / 56</div>
              <div class="w-8">
                {#if cpComputerScience >= 56}
                  <BadgeCheckSolid size="lg" color="green" />
                {:else}
                  <ExclamationCircleSolid size="lg" color="red" />
                {/if}
              </div>
            </div>

            <div class="flex flex-row mb-2 justify-center h-12 items-center">
              <div class="w-60 font-bold">CP Mathematics</div>
              <div class="w-24 ">{cpMathematics} / 16</div>
              <div class="w-8">
                {#if cpMathematics >= 16}
                  <BadgeCheckSolid size="lg" color="green" />
                {:else}
                  <ExclamationCircleSolid size="lg" color="red" />
                {/if}
              </div>
            </div>

            <div class="flex flex-row mb-2 justify-center h-12 items-center">
              <div class="w-60 font-bold">Number of confirmed Skills</div>
              <div class="w-32 font-bold text-center">{numSkills}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card size="xl" class="my-2">
        <div class="max-w-2xl mx-auto">
          <Heading tag="h3" class="mb-4 text-center">Motivation</Heading>

          {#each Object.keys($data.questions) as question}
            <P class="font-bold mb-2">{question}</P>
            <div class="bg-gray-50 border-gray-300 rounded-lg p-2 text-xs text-gray-900 border mb-8 whitespace-pre-wrap">
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
