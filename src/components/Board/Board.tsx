import { Box, Container } from "@mantine/core";
import { Column } from "../Column/Column";
import type { GroceryType } from "../../../mock-data/groceries";
import { initial_list } from "../../../mock-data/groceries";
import { GroceryItem } from "../GroceryItem/GroceryItem";

import classes from "./Board.module.css";
import { useState } from "react";

export function Board() {
  const [groceryItems, setGroceryItems] = useState<GroceryType[] | null>(
    initial_list
  );

  const items = groceryItems?.map((item) => (
    <GroceryItem name={item.name} id={item.id} />
  ));

  return (
    <Container size={1440}>
      <Box className={classes.boardLayout}>
        <Column title="Buy">{items}</Column>

        <Column title="Bought"></Column>
      </Box>
    </Container>
  );
}
