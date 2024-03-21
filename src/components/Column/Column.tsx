import { useRef, useState } from "react";
import {
  Box,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import {
  GroceryType,
  useGrocery,
} from "@/context/GroceryContext/GroceryContext";

import classes from "./Column.module.css";
import { capitalizeWord } from "@/utils/capitalize-word";

interface ColumnProps {
  children?: React.ReactNode;
  title: "Buy" | "Bought";
}

export const Column = ({ children, title, ...other }: ColumnProps) => {
  const [inputError, setInputError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const list = useGrocery();
  const { contextState, setContextState } = list;

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
    setContextState(newArr);

    return;
  };

  return (
    <Box className={classes.root} {...other}>
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

      <Stack className={classes.columnItems} gap={14} pt={10} pb={10}>
        {children}
      </Stack>

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
              handleAddClick(contextState);
            }}
          >
            Add
          </UnstyledButton>
        </Stack>
      )}
    </Box>
  );
};
