import { useRef } from "react";
import { Box, Text, UnstyledButton } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";
import { IconTrash } from "@tabler/icons-react";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";
import { InitialColumnsData } from "@/App";

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

  const removeItemHandler = (obj: InitialColumnsData) => {
    const clickedItem = itemRef.current?.getAttribute("data-item");
    const columnId = itemRef.current?.parentNode?.parentElement?.getAttribute(
      "data-rbd-droppable-id",
    ) as "buy" | "bought";

    const shallow = { ...obj };
    const newItemList = shallow[columnId as keyof typeof obj].itemList.filter(
      (item) => item.id !== clickedItem,
    );

    shallow[columnId as keyof typeof obj].itemList = newItemList;
    const newState = { ...shallow };
    setContextState(newState);
    return;
  };

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
              onClick={() => removeItemHandler(contextState)}
            >
              {<IconTrash stroke={1.5} className={classes.trashIcon} />}
            </UnstyledButton>
          </Box>
        </div>
      )}
    </Draggable>
  );
}
