import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import type { GroceryType } from "./context/GroceryContext/GroceryContext";
import { GroceryProvider } from "./context/GroceryContext/GroceryContext";

const productList: GroceryType[] = [
  { id: "apples", name: "Apples" },
  { id: "milk", name: "Milk" },
  { id: "bread", name: "Bread" },
  { id: "eggs", name: "Eggs" },
  { id: "chicken", name: "Chicken" },
  { id: "rice", name: "Rice" },
  { id: "spinach", name: "Spinach" },
];

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <GroceryProvider value={productList}>
        <Router />
      </GroceryProvider>
    </MantineProvider>
  );
}
