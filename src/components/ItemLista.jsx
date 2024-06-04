import { TableCell, TableRow, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'; // Renomeando os imports dos ícones para evitar conflitos de nome
import { useTheme } from '../contexts/ThemeToggleProvider'; // Importando useTheme do ThemeToggleProvider

const ItemLista = ({ id, game, description, price, excluirClick, alterarClick }) => {
    const { theme } = useTheme(); // Obtendo o objeto de tema do ThemeToggleProvider

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{game}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
                <IconButton onClick={alterarClick} style={{ color: theme.palette.primary.main }}> {/* Definindo a cor do ícone de acordo com o tema */}
                    <EditIcon />
                </IconButton>
                <IconButton onClick={excluirClick} style={{ color: theme.palette.secondary.main }}> {/* Definindo a cor do ícone de acordo com o tema */}
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default ItemLista;
