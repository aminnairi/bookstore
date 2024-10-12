import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HomePage } from "../pages/HomePage";
import { AddBookPage } from "../pages/AddBookPage";
import { ListBooksPage } from "../pages/ListBooksPage";

export const App = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h3">Bookstore</Typography>
        </Toolbar>
      </AppBar>
      <Box paddingTop="100px">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/add" element={<AddBookPage />} />
            <Route path="/books/list" element={<ListBooksPage />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}