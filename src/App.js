import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

//////// context
export const UserContext = createContext();

function App() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
      <h3>Email: {loginUser.email}</h3>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Shop></Shop>} />
          <Route exact path="/shop" element={<Shop></Shop>} />
          <Route exact path="/review" element={<Review></Review>} />
          <Route exact path="/inventory" element={<Inventory></Inventory>} />

          <Route exact element={<PrivateRoute />}>
            <Route exact path="/shipment" element={<Shipment></Shipment>} />
          </Route>

          <Route exact path="/login" element={<Login></Login>} />
          <Route path="/product/:productKey" element={<ProductDetails></ProductDetails>} />
          <Route exact path="*" element={<NotFound></NotFound>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;