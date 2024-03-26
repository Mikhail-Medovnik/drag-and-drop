import { useRef, useState } from "react";
import {
  Box,
  ListItem,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";
import { GroceryItem, GroceryType } from "../GroceryItem/GroceryItem";

import classes from "./Column.module.css";
import { capitalizeWord } from "@/utils/capitalize-word";
import { Droppable } from "react-beautiful-dnd";

export interface ColumnProps {
  title: "Buy" | "Bought";
  id: "buy" | "bought";
  itemList: GroceryType[] | [];
}

export const Column = ({ title, itemList, id, ...other }: ColumnProps) => {
  const [inputError, setInputError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const appState = useGrocery();
  const { contextState, setContextState } = appState;

  const handleAddClick = (arr: GroceryType[]) => {
    setInputError("");
    const inputValue = inputRef.current?.value;

    if (!inputValue) {
      setInputError("Field should not be empty");
      return;
    }

    if (arr.some((item) => item.id === inputValue.toLowerCase())) {
      setInputError("Item name should be unique");
      return;
    }

    const newItem: GroceryType = {
      name: capitalizeWord(inputValue),
      id: inputValue.toLowerCase(),
    };

    const newArr = [...arr, newItem];
    inputRef.current.value = "";
    const newState = { ...contextState };
    newState.buy.itemList = newArr;
    setContextState(newState);

    return;
  };
  return (
    <div className={classes.root} {...other}>
      <Box className={classes.columnHeader}>
        <IconGripVertical
          style={{ width: rem(20), height: rem(20), marginBlock: "auto" }}
          stroke={1.5}
        />
        <Text
          component="h3"
          ta="center"
          c="card-text-color"
          fw={500}
          fz={rem(24)}
        >
          {title}
        </Text>
      </Box>

      <Droppable droppableId={id} type="columnList">
        {(provided) => (
          <div
            className={classes.columnItems}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {itemList.map((item, index) => (
              <GroceryItem
                key={item.id}
                name={item.name}
                index={index}
                id={item.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {title === "Buy" && (
        <Stack gap={inputError ? rem(32) : rem(16)}>
          <TextInput
            ref={inputRef}
            h={rem(45)}
            error={inputError || undefined}
            placeholder="Add new item"
            classNames={{ input: classes.input, wrapper: classes.inputWrapper }}
          />
          <UnstyledButton
            className={classes.button}
            onClick={() => {
              handleAddClick(contextState.buy.itemList);
            }}
          >
            Add
          </UnstyledButton>
        </Stack>
      )}
    </div>
  );
};
