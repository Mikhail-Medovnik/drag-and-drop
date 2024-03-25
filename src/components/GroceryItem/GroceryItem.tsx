import { useRef } from "react";
import { Box, Text, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";
import { Draggable } from "react-beautiful-dnd";

import classes from "./GroceryItem.module.css";

export interface GroceryType {
  id: string;
  name: string;
}

interface GroceryItemProps extends GroceryType {
  index: number;
}

export function GroceryItem({ name, id, index }: GroceryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { contextState, setContextState } = useGrocery();

  // const removeItemHandler = (arr: GroceryType[]) => {
  //   const shallow = [...arr];
  //   const clickedItem = itemRef.current?.getAttribute("data-item");
  //   return setContextState(shallow.filter((item) => item.id !== clickedItem));
  // };

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box ref={itemRef} data-item={id} className={classes.root} mb={14}>
            <Text>{name}</Text>
            <UnstyledButton
              className={classes.removeButton}
              // onClick={() => removeItemHandler(contextState)}
            >
              {<IconTrash stroke={1.5} className={classes.trashIcon} />}
            </UnstyledButton>
          </Box>
        </div>
      )}
    </Draggable>
  );
}
