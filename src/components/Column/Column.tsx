import {
  Box,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";

import classes from "./Column.module.css";

interface ColumnProps {
  children?: React.ReactNode;
  title: "Buy" | "Bought";
}

export function Column({ children, title, ...other }: ColumnProps) {
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
            classNames={{ input: classes.input }}
          />
          <UnstyledButton className={classes.button}>Add</UnstyledButton>
        </Stack>
      )}
    </Box>
  );
}
