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

    import { data, addCslecture, deleteCslecture, checkDuplicateCslecture } from '$lib/store/store'
    import { addOsproject, deleteOsproject, checkDuplicateOsproject } from '$lib/store/store'
    import { addPlecture, deletePlecture, checkDuplicatePlecture } from '$lib/store/store'		


</script>


<P> Test </P>

