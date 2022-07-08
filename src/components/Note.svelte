<script>
  import Modal from "./Modal.svelte";
  let showModal = false;
  import { get } from "svelte/store";
  import { noteStore } from "../data/noteStore";

  const notes = get(noteStore);
  export let id;
  export let title;
  export let content;
  export let tags;
  export let lastModified;
  export let starred;

  let noteData = {
    id: id,
    title: title,
    content: content,
    tags: tags,
    lastModified: lastModified,
    starred: starred,
  };
  const handleDelete = () =>
    noteStore.update((prev) => prev.filter((v) => v.id !== id));

  const handleUpdate = (event) =>
    noteStore.update((prev) => [
      ...prev.filter((v) => v.id !== id),
      event.detail.newNote,
    ]);
  const toggleStarred = () => {
    noteStore.update((prev) => [noteData, ...prev.filter((v) => v.id !== id)]);
  };

  const handleOpenModal = (e) => {
    showModal = e.target.id !== "star" && true;
  };
</script>

<div>
  <Modal
    {...noteData}
    {showModal}
    isAddNote={false}
    on:closeModal={() => {
      showModal = false;
    }}
    on:cancelSave={() => {
      noteData = notes[id];
    }}
    on:deleteNote={handleDelete}
    on:updateNote={handleUpdate}
  />
  <div
    on:click={handleOpenModal}
    class="w-full h-60 md:h-72 shadow-xl rounded-xl p-4 flex flex-col justify-between cursor-pointer"
  >
    <div>
      <strong>{title}</strong>
      <p class="text-sm line-clamp-6">
        {content}
      </p>
    </div>
    <div class="text-xs ">
      <ul class="flex gap-2 overflow-hidden h-6">
        {#each tags.split(",").filter((v, i) => i < 3) as tag}
          <li class="bg-gray-600 text-white rounded-full px-2.5 py-1">
            {tag}
          </li>
        {/each}
      </ul>
      <div class="mt-2 flex justify-between">
        <p>{lastModified}</p>
        <svg
          id="star"
          on:click={() => {
            noteData.starred = !noteData.starred;
            toggleStarred();
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20"
          height="20"
          viewBox="0 0 122.88 116.864"
          enable-background="new 0 0 122.88 116.864"
          xml:space="preserve"
          class={starred ? "fill-yellow-400" : "fill-gray-300"}
          ><g
            ><polygon
              id="star"
              fill-rule="evenodd"
              clip-rule="evenodd"
              points="61.44,0 78.351,41.326 122.88,44.638 88.803,73.491 99.412,116.864 61.44,93.371 23.468,116.864 34.078,73.491 0,44.638 44.529,41.326 61.44,0"
            /></g
          ></svg
        >
      </div>
    </div>
  </div>
</div>
