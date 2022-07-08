<script>
  import "./app.css";
  import AddNote from "./components/AddNote.svelte";
  import Note from "./components/Note.svelte";
  import { noteStore } from "./data/noteStore";

  let notes;

  noteStore.subscribe((value) => {
    notes = value;
    localStorage.setItem("notes", JSON.stringify(value));
  });
</script>

<div>
  <header class="fixed inset-x-0 top-0 bg-zinc-700 text-white w-full">
    <div class="container mx-auto p-4">
      <h1>Notes App</h1>
      <p>Start making notes!</p>
    </div>
  </header>
  <main
    class="mt-24 container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6"
  >
    <AddNote />
    {#each notes as note (note.id)}
      <Note {...note} />
    {/each}
  </main>
</div>
