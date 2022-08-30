import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import ShopCard from './Components/ShopCard';
import Shops from './Components/Shops';
import Shop from './Components/Shop';

function App() {
  return (
    <main>
      <header>
        <h1>Free Bike Finder</h1>
      </header>
      <nav className='navbar'>
        <Link className='navbar__link' to='/'>
          Home
        </Link>
        <Link className='navbar__link' to='/shops'>
          Bikes
        </Link>
        <Link className='navbar__link' to='/helmets'>
          Helmets
        </Link>
        <Link className='navbar__link' to='/other'>
          Other
        </Link>
      </nav>
      <container>
        {/* <Routes>
          <Route path='/'></Route>
          <Route path='/shops' element={<Shops />}></Route>
          <Route path='/shops/:state' element={<Shops />}></Route>
          <Route path='/shop/:shopId' element={<Shop />}></Route>
        </Routes> */}
        <ShopCard title='Bike Donation Home' />
      </container>
    </main>
  );
}

export default App;
