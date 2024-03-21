import { useRef } from "react";
import { Text, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { GroceryType } from "@/context/GroceryContext/GroceryContext";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";

import classes from "./GroceryItem.module.css";

export function GroceryItem({ name, id }: GroceryType) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { contextState, setContextState } = useGrocery();

  const removeItemHandler = (arr: GroceryType[]) => {
    const shallow = [...arr];
    const clickedItem = itemRef.current?.getAttribute("data-item");
    return setContextState(shallow.filter((item) => item.id !== clickedItem));
  };

  return (
    <div className={classes.root} ref={itemRef} data-item={id}>
      <Text>{name}</Text>
      <UnstyledButton
        className={classes.removeButton}
        onClick={() => removeItemHandler(contextState)}
      >
        {<IconTrash stroke={1.5} className={classes.trashIcon} />}
      </UnstyledButton>
    </div>
  );
}
