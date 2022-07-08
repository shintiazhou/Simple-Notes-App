
import { writable } from "svelte/store";

const localData = localStorage.getItem('notes')

export let noteStore = writable(
  localData ? JSON.parse(localData) :
    [
      {
        id: "0",
        title: "Note 1",
        content: "Water the plant, take out trash..",
        tags: "Daily, todo",
        lastModified: "01-07-2021",
        starred: false,
      },
    ]);
