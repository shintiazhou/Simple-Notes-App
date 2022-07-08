<script>
  import { format } from "date-fns";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let showModal;
  export let isAddNote;
  export let id;
  export let title;
  export let content;
  export let tags;
  export let lastModified;
  export let starred;

  let newNote = {
    id: id,
    title: title,
    content: content,
    tags: tags,
    lastModified: lastModified,
    starred: starred,
  };

  const closeModal = () => {
    dispatch("closeModal");
  };
  const handleAddNote = () => {
    dispatch("addNote", {
      newNote: newNote,
    });
    closeModal();
  };
  const handleUpdateNote = () => {
    dispatch("updateNote", {
      newNote: {
        ...newNote,
        lastModified: format(new Date(), "dd-MM-yyyy"),
      },
    });
    closeModal();
  };
</script>

<div
  class={`visible transition-all fixed inset-0 z-20 flex items-center justify-center ${
    !showModal && " invisible"
  }`}
>
  <div on:click={closeModal} class="bg-black bg-opacity-40 w-full h-full" />
  <div
    class={`transition-all fixed bg-white rounded-xl w-10/12 md:w-1/3 ${
      !showModal && "invisible scale-0"
    }`}
  >
    <div class="px-4 py-2 ">
      {#if isAddNote}
        <strong>Add Note</strong>
      {:else}
        <strong>Edit Note</strong>
        <p class="text-xs mt-1 opacity-70">
          Last Updated : {newNote.lastModified}
        </p>
      {/if}
    </div>
    <div class="px-4 py-2 border-t-2">
      <label for="title">Title</label>
      <input type="text" bind:value={newNote.title} />

      <label for="tags">Tags</label>
      <input type="text" bind:value={newNote.tags} />
      <small class="-mt-2 block -mb-2 ">Separate with comma</small><br />

      <label for="content"> Content</label>
      <textarea bind:value={newNote.content} />
    </div>
    {#if isAddNote}
      <div class="px-4 py-2 border-t-2 ">
        <button
          on:click={handleAddNote}
          class="bg-green-500 text-white shadow-md w-full">Save</button
        >
      </div>
    {:else}
      <div class="px-4 py-2 border-t-2 flex justify-between">
        <button
          on:click={() => {
            dispatch("deleteNote");
            closeModal();
          }}
          class="bg-red-400 text-white shadow-md">Delete</button
        >
        <div>
          <button
            on:click={handleUpdateNote}
            class="bg-green-500 text-white shadow-md">Save</button
          >
          <button
            on:click={() => {
              dispatch("cancelSave");
              closeModal();
            }}
            class="bg-gray-400 text-white shadow-md">Cancel</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  input,
  textarea {
    border: 1px solid lightgray;
    height: 30px;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    width: 100%;
    margin: 10px 0;
    max-height: 200px;
  }
  button {
    padding: 4px 10px;
    border-radius: 10px;
  }
</style>
