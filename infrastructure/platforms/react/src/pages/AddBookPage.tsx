import { ChangeEventHandler, FormEventHandler, useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { badRequestSchema } from "../schemas/badRequestSchema";
import { exhaustive } from "exhaustive";

export const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [availableCopies, setAvailableCopies] = useState(0);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  const updateTitle: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const updateIsbn: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setIsbn(event.target.value);
  }, []);

  const updateAvailableCopies: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setAvailableCopies(Number(event.target.value) || 0);
  }, []);

  const addBook: FormEventHandler = useCallback((event) => {
    event.preventDefault();

    setLoading(true);

    fetch("http://localhost:8000/books", {
      signal: abortControllerRef.current.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        isbn,
        availableCopies
      })
    }).then(response => {
      if (response.ok) {
        alert("Livre ajouté avec succès");
      }

      if (response.status === 400) {
        return response.json().then(json => {
          return badRequestSchema.parse(json);
        }).then(error => {
          exhaustive(error.error, {
            BAD_REQUEST_ERROR_BECAUSE_INVALID_ISBN: () => {
              throw new Error("Le numéro ISBN est invalide");
            }
          })
        });
      }

      throw new Error("Une erreur innatendue est survenue, merci de réessayer ultérieurement");
    }).catch(error => {
      alert(error);
    }).finally(() => {
      setLoading(false);
    });
  }, [availableCopies, isbn, title]);

  useEffect(() => () => {
    abortControllerRef.current.abort();
  }, [abortControllerRef]);

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

  return (
    <Stack spacing={3}>
      <Typography 
        variant="h3" 
        align="center">
        Ajouter un livre
      </Typography>
      <Stack 
        component="form" 
        spacing={3}
        onSubmit={addBook}>
        <TextField
          type="text"
          label="Titre du livre"
          value={title}
          onChange={updateTitle}
          autoFocus />
        <TextField
          type="text"
          label="ISBN du livre"
          value={isbn}
          onChange={updateIsbn} />
        <TextField
          type="number"
          label="Quantité disponible"
          value={availableCopies}
          onChange={updateAvailableCopies} />
        <Button
          variant="contained"
          color="success"
          type="submit">
          Ajouter
        </Button>
      </Stack>
    </Stack>
  );
};