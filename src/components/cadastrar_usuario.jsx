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

const Cadastrar_Usuario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      //Vamos enviar os dados digitados para a rota /user do backend
      await api.post("user/createUsers", campos);
      setAviso("Usuário cadastrado com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar usuário!");
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
          Log-in  
        </Typography>
        <form onSubmit={handleSubmit(salvar)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                required
                autoFocus
                {...register("username")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                required
                {...register("password")}
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

export default Cadastrar_Usuario;
