import { useState } from "react";
import { Box, Container, rem } from "@mantine/core";
import { Column } from "../Column/Column";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { GroceryType } from "@/context/GroceryContext/GroceryContext";
import { GroceryItem } from "../GroceryItem/GroceryItem";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";
import { reorder } from "@/utils/reorder";

import classes from "./Board.module.css";

export function Board() {
  const context = useGrocery();
  const { setContextState } = context;
  const dragItems = context.contextState;

  const handleDragAndDrop = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const reorderedList = reorder({
        array: dragItems,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });

      return setContextState(reorderedList);
    }
  };

  const items = dragItems.map((item, index) => (
    <Draggable draggableId={item.id} key={item.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <GroceryItem name={item.name} id={item.id} />
        </div>
      )}
    </Draggable>
  ));

  return (
    <Container size={1440}>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Box className={classes.boardLayout}>
          <Droppable droppableId="Buy" type="column">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column title="Buy" key="buy">
                  {items}
                  {provided.placeholder}
                </Column>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="bought" type="column">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: rem(200), height: "100%" }}
              >
                <Column title="Bought" key="bought">
                  {provided.placeholder}
                </Column>
              </div>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </Container>
  );
}
