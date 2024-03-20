import { Text } from "@mantine/core";
import type { GroceryType } from "../../../mock-data/groceries";

import classes from "./GroceryItem.module.css";

export function GroceryItem({ name }: GroceryType) {
  return (
    <div className={classes.root}>
      <Text>{name}</Text>
    </div>
  );
}
