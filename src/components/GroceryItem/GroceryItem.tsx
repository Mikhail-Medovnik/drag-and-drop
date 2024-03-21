import { Text, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { GroceryType } from "../../../mock-data/groceries";

import classes from "./GroceryItem.module.css";

export function GroceryItem({ name, id }: GroceryType) {
  return (
    <div className={classes.root}>
      <Text>{name}</Text>
      <UnstyledButton
        className={classes.removeButton}
        mod={{ "data-id": id }}
        onClick={(e) => console.log(e.target)}
      >
        {<IconTrash stroke={1.5} className={classes.trashIcon} />}
      </UnstyledButton>
    </div>
  );
}
