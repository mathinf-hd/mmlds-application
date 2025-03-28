<script lang="ts">
    import { 
        Button, Input, P,
        Table, TableBody, TableBodyCell, TableBodyRow,
        TableHead, TableHeadCell, Checkbox
    } from 'flowbite-svelte';

    import { TrashBinOutline }  from 'flowbite-svelte-icons';

    import GenericValidatedInput from './GenericValidatedInput.svelte';

    import { data, 
	toggleProgrammingCategory,
	addProgrammingLecture,
	removeProgrammingLecture,
	addOpenSourceProject,
	removeOpenSourceProject,
	addProgrammingCourse,
	removeProgrammingCourse
	} from '$lib/store/store';
</script>


<P> The admission regulations recognize <b> Programming skills</b>. <br> <br>
    Please check the box
  <Checkbox
   inline class="me-2"
   bind:checked={$data.programming.lectureEnabled}
   on:changed={() => toggleProgrammingCategory('lectures', $data.programming.lecturesEnabled)}
  />
  if you acquired skills in areas such as Algorithms and data structures through corresponding foundational lectures. To declare these skills, add for each respective lecture its English name as listed in the (translated) transcript. Copy and paste the entire official description of the lecture (as, e.g., provided in the module handbook of your field of study) to the "Module Description" field (after translation to English using some automatic translation service, in case it is not given in English).
</P>

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
			<TableHead class="normal-case bg-primary-700 text-white">
				<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
				<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
				<TableHeadCell class="text-2xs p-2"></TableHeadCell>
			</TableHead>
			<TableBody>
			{#each $data.programming?.lectures ?? [] as lecture, Idx}
			<TableBodyRow>
		 	   <TableBodyCell class="p-2">			      
			      <Input
			       type="text"
			       bind:value={lecture.name}
			       class="text-2xs"
			      />
			   </TableBodyCell>		  
			   <TableBodyCell class="p-2 text-2xs">
			      <Input
			       type="text"
			       bind:value={lecture.moduleDescription}
			       class="text-2xs"
			      />
			  </TableBodyCell>
			  <TableBodyCell class="p-2">
			     <Button
			       color="red"
			       size="xs"
			       class="text-2xs"
			       on:click={() => removeProgrammingLecture(Idx)}><TrashBinOutline/></Button>
			  </TableBodyCell>
		    	</TableBodyRow>	       
			{/each}
			</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addProgrammingLecture()}>Add Another Lecture</Button>
</div>

<P> Please check the box
    <Checkbox
      inline class="me-2"
      bind:checked={$data.programming.openSourceProjectsEnabled}
      on:changed={() => toggleProgrammingCategory('openSourceProjects', $data.programming.openSourceProjectsEnabled)}
     />
 if you actively contributed to an open source project. To declare these skills, add for each respective open source project the name of the project, the link to a public repository and your identifier.
</P> 

<div class="my-5">
    <Table class="overflow-x-auto" striped={true}>	
	<TableHead class="normal-case bg-primary-700 text-white">
	<TableHeadCell class="min-w-60 text-2xs p-2">Name of open source project</TableHeadCell>
	<TableHeadCell class="text-2xs p-2">Link to public repository</TableHeadCell>
	<TableHeadCell class="text-2xs p-2">Personal identifier</TableHeadCell>
	<TableHeadCell class="text-2xs p-2"></TableHeadCell>
	</TableHead>
	<TableBody>
	{#each $data.programming?.openSourceProjects as project, Idx}
	<TableBodyRow>
	<TableBodyCell class="p-2"><Input type="text" bind:value={project.projectName} class="text-2xs"/></TableBodyCell>
	<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={project.publicRepoLink} class="text-2xs"/></TableBodyCell>
	<TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={project.personalIdentifier} class="text-2xs"/></TableBodyCell>
	<TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => removeOpenSourceProject(Idx)}><TrashBinOutline /></Button></TableBodyCell>
	</TableBodyRow>
	{/each}
	</TableBody>
    </Table>
    <Button class="text-2xs m-2" on:click={() => addOpenSourceProject()}>Add Another Project</Button>
</div>

<P> Please check the box
    <Checkbox
      inline class="me-2"
      bind:checked={$data.programming.extraCoursesEnabled}
      on:changed={() => toggleProgrammingCategory('extraCourses', $data.programming.extraCoursesEnabled)}
    /> 
 if you participated in a programming course, e.g. dedicated to a specific programming language.
To declare these skills, add for each respective programming course its English name as listed in the (translated) transcript together with the  entire official description of the course. Alternatively for extracurricular courses provide the file name of the certificate as uploaded to heiCO.</P> 

<div class="my-5">
     <Table class="overflow-x-auto" striped={true}>	
     <TableHead class="normal-case bg-primary-700 text-white">
     <TableHeadCell class="min-w-60 text-2xs p-2">Course Name as in Transcript / File name of certificate</TableHeadCell>
     <TableHeadCell class="text-2xs p-2">Module Description as applicable</TableHeadCell>
     <TableHeadCell class="text-2xs p-2"></TableHeadCell>
     </TableHead>
     <TableBody>
     {#each $data.programming?.extraCourses ?? [] as course, Idx}
     <TableBodyRow>
     <TableBodyCell class="p-2"><Input type="text" bind:value={course.courseName} class="text-2xs"/></TableBodyCell>
     <TableBodyCell class="p-2 text-2xs"><Input type="text" bind:value={course.moduleDescription} class="text-2xs"/></TableBodyCell>
     <TableBodyCell class="p-2"><Button color="red" size="xs" class="text-2xs" on:click={() => removeProgrammingCourse(Idx)}><TrashBinOutline /></Button></TableBodyCell>
     </TableBodyRow>
     {/each}
     </TableBody>
     </Table>
     <Button class="text-2xs m-2" on:click={() => addProgrammingCourse()}>Add Another Lecture</Button>
</div>