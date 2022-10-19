import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Shop></Shop>} />
          <Route exact path="/shop" element={<Shop></Shop>} />
          <Route exact path="/review" element={<Review></Review>} />
          <Route exact path="/inventory" element={<Inventory></Inventory>} />
          <Route path="/product/:productKey" element={<ProductDetails></ProductDetails>} />
          <Route exact path="*" element={<NotFound></NotFound>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;