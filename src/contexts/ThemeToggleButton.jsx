import { Button } from '@mui/material';
import lightModeIcon from './lightmode1.svg';
import darkModeIcon from './darkmode2.svg';

const ThemeToggleButton = ({ isDarkMode, toggleTheme }) => {
  return (
    <Button color="inherit" onClick={toggleTheme} sx={{ marginLeft: 1 }}>
      <img src={isDarkMode ? darkModeIcon : lightModeIcon} alt={isDarkMode ? 'Dark Mode' : 'Light Mode'} />
    </Button>
  );
};

export default ThemeToggleButton;