<script lang="ts">
	import {
		Button, Input, P,
		Table, TableBody, TableBodyCell, TableBodyRow,
		TableHead, TableHeadCell, Checkbox, Heading
	} from 'flowbite-svelte';

	import { TrashBinOutline } from 'flowbite-svelte-icons';

	import {
		data,
		toggleProgrammingCategory,
		addProgrammingLecture,
		removeProgrammingLecture,
		addOpenSourceProject,
		removeOpenSourceProject,
		addProgrammingCourse,
		removeProgrammingCourse
	} from '$lib/store/store';
</script>

<P class="mb-4">
	The admission regulations recognize <b>Programming skills</b>. These can be proved in the
	following <b>3 (not mutually exclusive)</b> ways:
</P>

<!-- 1) FOUNDATIONAL LECTURES -->
<P class="mb-2">
	Please check the box
	<Checkbox
		inline
		class="me-2"
		bind:checked={$data.programming.lecturesEnabled}
		on:change={() => toggleProgrammingCategory('lectures', $data.programming.lecturesEnabled)}
	/>
	if you acquired skills in areas such as Algorithms and data structures through corresponding
	foundational lectures...
</P>

<div class="my-5">
	<Heading tag="h4" class="mb-4">Foundational Lecture</Heading>
	<Table class="overflow-x-auto" striped={true}>
		<TableHead class="normal-case bg-primary-700 text-white">
			<TableHeadCell class="min-w-60 text-2xs p-2">Lecture Name in Transcript</TableHeadCell>
			<TableHeadCell class="text-2xs p-2">Module Description</TableHeadCell>
			<TableHeadCell class="text-2xs p-2"></TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $data.programming?.lectures ?? [] as lecture, idx}
				<TableBodyRow>
					<TableBodyCell class="p-2">
						<Input type="text" bind:value={lecture.name} class="text-2xs" disabled={!$data.programming.lecturesEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2 text-2xs">
						<Input type="text" bind:value={lecture.moduleDescription} class="text-2xs" disabled={!$data.programming.lecturesEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2">
						<Button color="red" size="xs" class="text-2xs" on:click={() => removeProgrammingLecture(idx)} disabled={!$data.programming.lecturesEnabled}>
							<TrashBinOutline />
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addProgrammingLecture()} disabled={!$data.programming.lecturesEnabled}>
		Add Another Lecture
	</Button>
</div>

<!-- 2) OPEN SOURCE PROJECTS -->
<P class="mb-2">
	Please check the box
	<Checkbox
		inline
		class="me-2"
		bind:checked={$data.programming.openSourceProjectsEnabled}
		on:change={() => toggleProgrammingCategory('openSourceProjects', $data.programming.openSourceProjectsEnabled)}
	/>
	if you actively contributed to an open source project...
</P>

<div class="my-5">
	<Heading tag="h4" class="mb-4">Open Source Project</Heading>
	<Table class="overflow-x-auto" striped={true}>
		<TableHead class="normal-case bg-primary-700 text-white">
			<TableHeadCell class="min-w-60 text-2xs p-2">Name of open source project</TableHeadCell>
			<TableHeadCell class="text-2xs p-2">Link to public repository</TableHeadCell>
			<TableHeadCell class="text-2xs p-2">Personal identifier</TableHeadCell>
			<TableHeadCell class="text-2xs p-2"></TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $data.programming?.openSourceProjects ?? [] as proj, idx}
				<TableBodyRow>
					<TableBodyCell class="p-2">
						<Input type="text" bind:value={proj.projectName} class="text-2xs" disabled={!$data.programming.openSourceProjectsEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2 text-2xs">
						<Input type="text" bind:value={proj.publicRepoLink} class="text-2xs" disabled={!$data.programming.openSourceProjectsEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2 text-2xs">
						<Input type="text" bind:value={proj.personalIdentifier} class="text-2xs" disabled={!$data.programming.openSourceProjectsEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2">
						<Button color="red" size="xs" class="text-2xs" on:click={() => removeOpenSourceProject(idx)} disabled={!$data.programming.openSourceProjectsEnabled}>
							<TrashBinOutline />
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addOpenSourceProject()} disabled={!$data.programming.openSourceProjectsEnabled}>
		Add Another Project
	</Button>
</div>

<!-- 3) PROGRAMMING COURSES -->
<P class="mb-2">
	Please check the box
	<Checkbox
		inline
		class="me-2"
		bind:checked={$data.programming.extraCoursesEnabled}
		on:change={() => toggleProgrammingCategory('extraCourses', $data.programming.extraCoursesEnabled)}
	/>
	if you participated in a programming course...
</P>

<div class="my-5">
	<Heading tag="h4" class="mb-4">Programming Course</Heading>
	<Table class="overflow-x-auto" striped={true}>
		<TableHead class="normal-case bg-primary-700 text-white">
			<TableHeadCell class="min-w-60 text-2xs p-2">
				Course Name as in Transcript / File name of certificate
			</TableHeadCell>
			<TableHeadCell class="text-2xs p-2">Module Description as applicable</TableHeadCell>
			<TableHeadCell class="text-2xs p-2"></TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $data.programming?.extraCourses ?? [] as course, idx}
				<TableBodyRow>
					<TableBodyCell class="p-2">
						<Input type="text" bind:value={course.courseName} class="text-2xs" disabled={!$data.programming.extraCoursesEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2 text-2xs">
						<Input type="text" bind:value={course.moduleDescription} class="text-2xs" disabled={!$data.programming.extraCoursesEnabled} />
					</TableBodyCell>
					<TableBodyCell class="p-2">
						<Button color="red" size="xs" class="text-2xs" on:click={() => removeProgrammingCourse(idx)} disabled={!$data.programming.extraCoursesEnabled}>
							<TrashBinOutline />
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<Button class="text-2xs m-2" on:click={() => addProgrammingCourse()} disabled={!$data.programming.extraCoursesEnabled}>
		Add Another Lecture
	</Button>
</div>
