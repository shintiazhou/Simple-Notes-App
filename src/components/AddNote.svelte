<script>
  import Modal from "./Modal.svelte";
  let showModal = false;
  import { noteStore } from "../data/noteStore";
  import { format } from "date-fns";

  let noteData = {
    id: "",
    title: "",
    content: "",
    tags: "",
    lastModified: format(new Date(), "dd-MM-yyyy"),
    starred: false,
  };
  const handleAddNote = (event) =>
    noteStore.update((prev) => [event.detail.newNote, ...prev]);
</script>

<div>
  <Modal
    {...noteData}
    {showModal}
    isAddNote={true}
    on:closeModal={() => {
      showModal = false;
    }}
    on:addNote={handleAddNote}
  />
  <div
    on:click={() => (showModal = true)}
    class="bg-gray-200 text-gray-400 text-8xl rounded-xl flex items-center justify-center w-full h-60 md:h-72 pb-6 border-4 border-dashed border-gray-400 cursor-pointer"
  >
    +
  </div>
</div>
