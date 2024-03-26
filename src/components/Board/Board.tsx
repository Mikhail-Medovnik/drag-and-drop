import { Container } from "@mantine/core";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
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

    if (type === "all-columns" && source.index !== destination.index) {
      const contextCopy = { ...contextState };
      const replacedColumns = Object.keys(contextCopy).reverse();
      const newState = {
        [replacedColumns[0]]:
          contextCopy[replacedColumns[0] as "buy" | "bought"],
        [replacedColumns[1]]:
          contextCopy[replacedColumns[1] as "buy" | "bought"],
      } as InitialColumnsData;

      setContextState(newState);
    }

    return;
  };

  const { ...columns } = contextState;

  return (
    <Container size={1440}>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="all-columns"
        >
          {(provided) => (
            <div
              className={classes.boardLayout}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.values(columns).map((col: any, index: number) => (
                <Column
                  title={col.title}
                  id={col.id}
                  itemList={col.itemList}
                  key={col.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
