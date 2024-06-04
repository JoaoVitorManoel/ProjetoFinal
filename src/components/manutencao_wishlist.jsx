import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Box,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const ManutencaoWishList = () => {
    const { register, handleSubmit, reset } = useForm();
    const [wish, setWish] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("wish/all");
            setWish(lista.data);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }

    useEffect(() => {
        obterLista();
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`wish/filtro/${campos.palavra}`);
            lista.data.length
                ? setWish(lista.data)
                : alert("Não há desejos cadastrados com a palavra-chave pesquisada");
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }

    const excluir = async (id, titulo) => {
        if (!window.confirm(`Confirma a exclusão do Desejo ${titulo}?`)) {
            return;
        }
        try {
            await api.delete(`wish/deleteWish/${id}`);
            setWish(wish.filter(desejo => desejo.id !== id));
            obterLista();
        } catch (error) {
            alert(`Erro: Não foi possível excluir o desejo ${titulo}: ${error}`);
        }
    }

    const alterar = async (id, game, description, price) => {
        const novoGame = prompt(`Digite o novo nome do game ${game}`);
        if (novoGame === "") {
            alert('Digite um status válido! (status em branco)');
            return;
        }
        const dados = {
            id: id,
            game: novoGame,
            description: description,
            price: price
        }
        try {
            await api.put(`wish/updateWish`, dados);
            const wishAtualizado = wish.map(desejo => {
                if (desejo.id === id) {
                    return { ...desejo, game: novoGame };
                }
                return desejo;
            });
            setWish(wishAtualizado);
            obterLista();
        } catch (error) {
            alert(`Erro: Não foi possível alterar o desejo ${game}: ${error}`);
        }
    }

    return (
        <Container>
            <Box mt={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Manutenção da WishList
                </Typography>
            </Box>
            <Box mt={3}>
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Titulo"
                                required
                                {...register("palavra")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                fullWidth
                            >
                                Pesquisar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ClearIcon />}
                                fullWidth
                                onClick={() => { reset({ palavra: "" }); obterLista(); }}
                            >
                                Todos
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box mt={3}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cód.</TableCell>
                                <TableCell>Game</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wish.map((desejo) => (
                                <ItemLista
                                    key={desejo.id}
                                    id={desejo.id}
                                    game={desejo.game}
                                    description={desejo.description}
                                    price={desejo.price}
                                    excluirClick={() => excluir(desejo.id, desejo.game)}
                                    alterarClick={() => alterar(desejo.id, desejo.game, desejo.description, desejo.price)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default ManutencaoWishList;
