import {
  Box,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { useGrocery } from "@/context/GroceryContext/GroceryContext";

import classes from "./Column.module.css";

interface ColumnProps {
  children?: React.ReactNode;
  title: "Buy" | "Bought";
}

export const Column = ({ children, title, ...other }: ColumnProps) => {
  const list = useGrocery();
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
        <Stack gap={rem(16)}>
          <TextInput
            h={rem(45)}
            placeholder="Add new item"
            classNames={{ input: classes.input, wrapper: classes.inputWrapper }}
          />
          <UnstyledButton
            className={classes.button}
            onClick={() => console.log(list.contextState)}
          >
            Add
          </UnstyledButton>
        </Stack>
      )}
    </Box>
  );
};
