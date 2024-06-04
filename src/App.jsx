import React from 'react';
import Cadastrar_Tarefas from './components/cadastrar_wish';
import Menu_Superior from './components/MenuSuperior';
import Manutencao_Tarefas from './components/manutencao_wishlist';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  if (!autenticado) {
    navigate('/login'); // Redirect to login on unauthorized access
    return null;
  }
  
  const App = () => {
    return (
      <Router>
        <MenuSuperior />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/manutencao" element={<ManutencaoWishList />} />
          <Route path="/user" element={<div>User</div>} />
        </Routes>
      </Router>
    );
  };
  

  return children;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <Menu_Superior />}
      <Routes>
            <Route path="/login" component={FormularioLogin} />
            <Route path="/register" component={Cadastrar_Usuarios} />
        <Route path="/" element={autenticado ? (<Cadastrar_Tarefas /> // Use replace to prevent history stack issues
            ) : <FormularioLogin />}
        />
        <Route path="/tarefas" element={<ProtectedRoute><Cadastrar_Tarefas /></ProtectedRoute>} />
        <Route path="/manutencao" element={<ProtectedRoute><Manutencao_Tarefas /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><Cadastrar_Usuarios /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;
