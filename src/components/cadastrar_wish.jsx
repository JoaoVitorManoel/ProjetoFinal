import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Grid
} from '@mui/material';

const Cadastrar_wish = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      await api.post("wish/createWish", campos);
      setAviso("Jogo adicionado a wishList.");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar na WishList");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        component={Paper}
        elevation={6}
        p={4}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Wish
        </Typography>
        <form onSubmit={handleSubmit(salvar)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Jogo"
                variant="outlined"
                required
                autoFocus
                {...register("game")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comentários"
                variant="outlined"
                required
                {...register("description")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preço"
                variant="outlined"
                type="number"
                required
                step="0.01"
                {...register("price")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Enviar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => reset()}
              >
                Limpar
              </Button>
            </Grid>
          </Grid>
        </form>
        {aviso && (
          <Alert severity={aviso.includes("sucesso") ? "success" : "error"} sx={{ mt: 2 }}>
            {aviso}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Cadastrar_wish;
