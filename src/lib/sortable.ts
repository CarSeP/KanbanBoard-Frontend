import { toast } from "sonner";
import type Sortable from "sortablejs";

const URL = import.meta.env.VITE_BACKEND_API_URL;

export const moveColumn = {
  animation: 150,
  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  onEnd: async function (evt: Sortable.SortableEvent) {
    try {
      const id = evt.item.id;
      const newIndex = evt.newIndex;

      const response = await fetch(`${URL}/column/${id}/${newIndex}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error();
      }
    } catch {
      toast.error("An error occurred while moving the column.");
    }
  },
};

export const moveCard = {
  animation: 50,
  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  group: "cards",
  onEnd: async function (evt: Sortable.SortableEvent) {
    try {
      const id = evt.item.id;
      const newIndex = evt.newIndex;
      const toColumnId = evt.to.closest("article")?.id;

      console.log({ id, evt });

      const response = await fetch(
        `${URL}/card/${id}/${toColumnId}/${newIndex}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error();
      }
    } catch {
      toast.error("An error occurred while moving the card.");
    }
  },
};
