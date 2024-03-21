import { GroceryType } from "@/context/GroceryContext/GroceryContext";

interface ReorderArgs {
  array: GroceryType[];
  sourceIndex: number;
  destinationIndex: number;
}

export function reorder({ array, sourceIndex, destinationIndex }: ReorderArgs) {
  const reordered = [...array];
  const [touchedItem] = reordered.splice(sourceIndex, 1);
  reordered.splice(destinationIndex, 0, touchedItem);
  return reordered;
}
