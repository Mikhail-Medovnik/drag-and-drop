import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import { GroceryProvider } from "./context/GroceryContext/GroceryContext";
import { GroceryType } from "./components/GroceryItem/GroceryItem";
import { ColumnProps } from "./components/Column/Column";

export interface InitialColumnsData
  extends Record<"buy" | "bought", ColumnProps> {}

const initialColumns: InitialColumnsData = {
  buy: {
    title: "Buy",
    id: "buy",
    itemList: [
      { id: "apples", name: "Apples" },
      { id: "milk", name: "Milk" },
      { id: "bread", name: "Bread" },
      { id: "eggs", name: "Eggs" },
      { id: "chicken", name: "Chicken" },
      { id: "rice", name: "Rice" },
      { id: "spinach", name: "Spinach" },
    ],
  },

  bought: {
    title: "Bought",
    id: "bought",
    itemList: [],
  },
};

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GroceryProvider value={initialColumns}>
        <Router />
      </GroceryProvider>
    </MantineProvider>
  );
}
