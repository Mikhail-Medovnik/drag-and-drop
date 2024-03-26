import { Container } from "@mantine/core";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";
import { reorder } from "@/utils/reorder";
import { moveItem } from "@/utils/move-item";
import { InitialColumnsData } from "@/App";
import { Column } from "../Column/Column";

import classes from "./Board.module.css";

export function Board() {
  const context = useGrocery();
  const { setContextState, contextState } = context;

  const handleDragAndDrop = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = contextState[source.droppableId as "buy" | "bought"];
    const end = contextState[destination.droppableId as "buy" | "bought"];

    if (type === "columnList") {
      if (start === end) {
        const reorderedList = reorder({
          array: start.itemList,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });

        if (source.droppableId === "buy") {
          const newBuy = { ...contextState["buy"], itemList: reorderedList };
          const newState: InitialColumnsData = {
            buy: newBuy,
            bought: contextState["bought"],
          };
          setContextState(newState);
          return;
        } else {
          const newBought = {
            ...contextState["bought"],
            itemList: reorderedList,
          };
          const newState: InitialColumnsData = {
            buy: contextState["buy"],
            bought: newBought,
          };
          setContextState(newState);
        }
      } else {
        const { newSourceWithoutTouched, newDestination } = moveItem({
          source: start.itemList,
          destination: end.itemList,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
        start.itemList = newSourceWithoutTouched;
        end.itemList = newDestination;

        const newState = {
          ...contextState,
          [start.id]: start,
          [end.id]: end,
        };
        setContextState(newState);
        return;
      }
    }

    return;
  };

  const { ...columns } = contextState;

  return (
    <Container size={1440}>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className={classes.boardLayout}>
          {Object.values(columns).map((col: any) => (
            <Column
              title={col.title}
              id={col.id}
              itemList={col.itemList}
              key={col.id}
            />
          ))}
        </div>
      </DragDropContext>
    </Container>
  );
}
