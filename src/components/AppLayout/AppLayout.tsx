import { Box, Container, Text } from "@mantine/core";
import { Board } from "../Board/Board";

import classes from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <Box className={classes.root}>
      <header className={classes.header}>
        <Container className={classes.headerInner} size={1440}>
          <Text component="h1" className={classes.title}>
            Drag and Drop
          </Text>
        </Container>
      </header>

      <main className={classes.main}>
        <Board />
      </main>
    </Box>
  );
}
