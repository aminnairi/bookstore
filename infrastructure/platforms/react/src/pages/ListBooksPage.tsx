import { useEffect, useState } from "react";
import { Books, booksSchema } from "../schemas/booksSchema";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ListBooksPage = () => {
  const [books, setBooks] = useState<Books>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const abortController = new AbortController();

    fetch("http://localhost:8000/books", {
      signal: abortController.signal
     }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Bad response from the server");
    }).then(json => {
      return booksSchema.parse(json);
    }).then(books => {
      setBooks(books);
    }).catch(error => {
      alert(`Une erreur est survenue : ${error}`);
    }).finally(() => {
      setLoading(false);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <Stack 
        justifyContent="center" 
        alignItems="center" 
        spacing={3}>
        <Typography variant="h3">
          Chargement en cours
        </Typography>
        <Typography>
          Merci de patienter quelques instants...
        </Typography>
      </Stack>
    );
  }

  if (books.length === 0) {
    return (
      <Typography align="center">
        Aucun livre disponible, merci d'en ajouter au moins un avant d'afficher cette page.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography 
        variant="h3" 
        align="center">
        Liste des livres
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ISBN
              </TableCell>
              <TableCell>
                Titre
              </TableCell>
              <TableCell>
                Nombre de copies disponibles
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.isbn}>
                <TableCell>
                  {book.isbn}
                </TableCell>
                <TableCell>
                  {book.title}
                </TableCell>
                <TableCell>
                  {book.availableCopies}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};