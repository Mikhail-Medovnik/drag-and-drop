import { GroceryType } from "@/components/GroceryItem/GroceryItem";

interface ReorderArgs {
  source: GroceryType[] | [];
  destination: GroceryType[] | [];
  sourceIndex: number;
  destinationIndex: number;
}

export function moveItem({
  source,
  destination,
  sourceIndex,
  destinationIndex,
}: ReorderArgs) {
  const newSource = [...source];
  const [touchedItem] = newSource.splice(sourceIndex, 1);
  const newSourceWithoutTouched = newSource.filter(
    (element) => element.id !== touchedItem.id
  );
  const newDestination = [...destination];
  newDestination.splice(destinationIndex, 0, touchedItem);
  return { newSourceWithoutTouched, newDestination };
}
