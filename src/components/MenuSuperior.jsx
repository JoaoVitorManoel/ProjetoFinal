// src/components/MenuSuperior.jsx
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeToggleProvider';

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  margin: theme.spacing(1),
}));

const MenuSuperior = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar position="sticky" sx={{ bgcolor: isDarkMode ? 'black' : 'primary.main' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to="/">
            <Typography variant="h6">
              Lista de desejos
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/">
            <Button color="inherit">Wish</Button>
          </NavLink>
          <NavLink to="/manutencao">
            <Button color="inherit">WishList</Button>
          </NavLink>
          <NavLink to="/user">
            <Button color="inherit">Log-in</Button>
          </NavLink>
          <Button color="inherit" variant="outlined" sx={{ marginLeft: 1 }}>
            Logout
          </Button> <Button color="inherit" onClick={toggleTheme} sx={{ marginLeft: 1 }}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuSuperior;
