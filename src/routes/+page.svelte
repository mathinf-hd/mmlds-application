<script lang="ts">
    import {
        downloadAsJsonFile,
        makeEmptyRow
    } from '$lib/index';
    import {
        Button,
        Card,
        Checkbox,
        Heading,
        Input,
        Label,
        NumberInput,
        P,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import {
        DownloadOutline,
        PlusOutline
    } from 'flowbite-svelte-icons';

    function downloadFormData() {
        const filename = 'form-data.txt';
        downloadAsJsonFile(filename, data);
    }

    const titles = Object.keys(makeEmptyRow());
    const rows = [makeEmptyRow(), makeEmptyRow(), makeEmptyRow()];
    const data = {Name: '', Rows: rows};
</script>

<div class="flex flex-col md:container md:mx-auto">
    <Heading class="text-center p-4">Test Form</Heading>
    <P class="my-4">Some introduction text text text text text text text text text text text text text text text text
        text
        text text text text text text text text text text text text text text text text text text text text text text
        text text text text text text text text text text text text text text text text text text text text text text
        text text text:</P>
    <Card size="xl">
        <div>
            <Label for="name" class="mb-2">Name</Label>
            <Input type="text" id="name" bind:value={data['Name']}/>
        </div>
        <Table class="my-4">
            <TableHead>
                {#each titles as title}
                    <TableHeadCell class="text-center">{title}</TableHeadCell>
                {/each}
            </TableHead>
            <TableBody>
                {#each rows as row}
                    <TableBodyRow>
                        {#each titles as title}
                            <TableBodyCell>
                                {#if typeof row[title] === 'string'}
                                    <Input bind:value={row[title]}/>
                                {:else if typeof row[title] === 'number'}
                                    <NumberInput
                                            class="w-16"
                                            value={row[title]}
                                            on:input={(e) =>
										(row[title] = Number.isNaN(Number(e.target.value))
											? row[title]
											: Number(e.target.value))}
                                    />
                                {:else if typeof row[title] === 'boolean'}
                                    <Checkbox bind:checked={row[title]}/>
                                {:else}
                                    {row[title]}
                                {/if}
                            </TableBodyCell>
                        {/each}
                    </TableBodyRow>
                {/each}
                <Button class="m-4">
                    <PlusOutline/>
                    Add another row
                </Button>

            </TableBody>
        </Table>
        <Button color="primary" class="m-4" on:click={downloadFormData}>
            <DownloadOutline/>
            Download form data
        </Button>
    </Card>
</div>

<div class="flex flex-col items-center md:container md:mx-auto my-16">
    <P>DEBUG INFO:</P>
    <Table my-4>
        <TableHead>
            {#each titles as title}
                <TableHeadCell>{title}</TableHeadCell>
            {/each}
        </TableHead>
        <TableBody>
            {#each rows as row}
                <TableBodyRow>
                    {#each titles as title}
                        <TableBodyCell>
                            {row[title]}
                        </TableBodyCell>
                    {/each}
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    <P color="gray-500">{JSON.stringify(data)}</P>
</div>
