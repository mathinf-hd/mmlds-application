<script lang="ts">
    import { 
        Button,
        Input,
        P,
        Select,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
		type SelectOptionType

    } from 'flowbite-svelte';

	import { TrashBinOutline }  from 'flowbite-svelte-icons';

    import GenericValidatedInput from './GenericValidatedInput.svelte';
    import PositiveNumberInput from './PositiveNumberInput.svelte';

    import { data, addLecture, deleteLecture, addSkill, checkDuplicateLecture } from '$lib/store/store';
    import { addCslecture, deleteCslecture, checkDuplicateCslecture } from '$lib/store/store';
    import { addOsproject, deleteOsproject, checkDuplicateOsproject } from '$lib/store/store';
    import { addPlecture, deletePlecture, checkDuplicatePlecture } from '$lib/store/store';		


let checkedFlag = true;

</script>


<P>
  The admission regulations recognize <b> Programming skills</b>. Please check the box <input type="checkbox" bind:checked={checkedFlag}>, if
you acquired skills in areas such as Algorithms and data structures through corresponding foundational lectures. To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. Copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>

