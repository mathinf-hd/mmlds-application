<script lang="ts">
import { Button } from "flowbite-svelte";
import { DownloadOutline } from "flowbite-svelte-icons";

import { data, isValidFormData } from '$lib/store/store'


function getVersion(){
    const mode = import.meta.env.MODE

    if (mode == "production"){
        return `prod-${import.meta.env.VITE_BUILD_COMMIT}-${import.meta.env.VITE_BUILD_DATETIME}`
    }
    
    return `dev-${import.meta.env.VITE_BUILD_COMMIT}-${import.meta.env.VITE_BUILD_DATETIME}`
}

async function getTimeStamp(){
    return await fetch('http://worldtimeapi.org/api/timezone/Etc/UTC')
        .then(response => response.json())
        .then(data => {
            const timestamp = new Date(data.utc_datetime).toISOString();
            return { type: "world", timestamp: timestamp }
        })
        .catch(() => {
            const timestamp = new Date().toISOString();
            return { type: "local", timestamp: timestamp }
        });
}

async function formatDataForDownload(original: Data): Promise<Data> {
  // Clone the data so we don't mutate the original.
  const data = structuredClone(original);

  // Clean up mathematics
  // (Remove any lecture that doesn't have a name, description, or skills)
  for (const area in data.mathematics.lectures) {
    data.mathematics.lectures[area] = data.mathematics.lectures[area].filter(
      (lec) => lec.lectureName || lec.moduleDescription || lec.skills.length > 0
    );
  }

  // Clean up programming
  if (data.programming?.lectures?.length === 0) delete data.programming.lectures;
  if (data.programming?.openSourceProjects?.length === 0) delete data.programming.openSourceProjects;
  if (data.programming?.extraCourses?.length === 0) delete data.programming.extraCourses;

  // 4. Add your metadata
  (data as any).time = await getTimeStamp();     
  (data as any).version = getVersion();          

  return data;
}

function downloadFormAsJsonFile(filename: string, data: Data) {    
    const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

async function downloadFormData() {
    const filename = 'data-mmlds.txt.txt';

    const data = await formatDataForDownload($data);

    /* check if data is valid - otherwise return */
    if (!isValidFormData(data)) return;
    
    downloadFormAsJsonFile(filename, data);
}

</script>

<Button color="primary" class="my-4 px-8" on:click={downloadFormData}>
    <DownloadOutline />
    <div class="pl-4">Save form data</div>
</Button>