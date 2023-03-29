import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  extendTheme,
} from "@chakra-ui/react"
import BasicDice from "./component/BasicDice"

// 2. declare your configuration, these are the defaults
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}
// 3. extend the theme
const customTheme = extendTheme({ config })

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <BasicDice />
      </Grid>
    </Box>
  </ChakraProvider>
)
