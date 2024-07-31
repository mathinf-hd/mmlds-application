<script lang="ts">
import { Button } from "flowbite-svelte";
import { DownloadOutline } from "flowbite-svelte-icons";

import { data } from '$lib/store/store'

function stripFalseSkills(data: Data) {
    
    /* generate deepcopy to avoid mutating the original object*/
    let strippedData: any = JSON.parse(JSON.stringify(data))

    /* filter skills */
    data.lectures.forEach((lecture,idx) => {
        let skills = [];
        for (let [key, value] of Object.entries(lecture.skills)) {
            if (value) {
                skills.push(key);
            }
        }
        strippedData.lectures[idx].skills = skills;
    });

    return strippedData
}

function downloadFormAsJsonFile(filename: string, data: Data) {    
    const link = document.createElement('a');
	const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

function downloadFormData() {
    const filename = 'form-data.txt';
    const data = stripFalseSkills($data)
    downloadFormAsJsonFile(filename, data);
}

</script>

<Button color="primary" class="my-4 px-8" on:click={downloadFormData}>
    <DownloadOutline />
    <div class="pl-4">Save form data</div>
</Button>