import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import User from './pages/User.jsx';
import Products from './pages/Products.jsx';
import Oder from './pages/Oder.jsx';
import OrderDetail from './pages/OrderDetail.jsx'; // Import OrderDetail component

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>}>
          {/* Default Route */}
          <Route index element={<Products />} />
          {/* Nested Routes */}
          <Route path="products" element={<Products />} />
          <Route path="users" element={<User />} />
          <Route path="orders" element={<Oder />} /> {/* Route cho danh sách đơn hàng */}
          <Route path="orders/:userId/:orderId" element={<OrderDetail />} />
     </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
