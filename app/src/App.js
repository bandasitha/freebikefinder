import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Shops from './Components/Shops';
import Shop from './Components/Shop';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function App() {
  return (
    <Container>
      <Navbar bg='light' expand='lg' sticky='top'>
        <Container>
          <Navbar.Brand href='/'>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/shops'>Bikes</Nav.Link>
              <Nav.Link href='/helmets'>Helmets</Nav.Link>
              <Nav.Link href='/nonprofits'>Nonprofits</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shops' element={<Shops asset='shops' key={1} />} />
          <Route path='/helmets' element={<Shops asset='helmets' key={2} />} />
          <Route
            path='/nonprofits'
            element={<Shops asset='nonprofits' key={3} />}
          />
          <Route path='/shops/:state' element={<Shops asset='shops' />} />
          <Route path='/helmets/:state' element={<Shops asset='helmets' />} />
          <Route
            path='/nonprofits/:state'
            element={<Shops asset='nonprofits' />}
          />

          <Route path='/shop/:id' element={<Shop asset='shops' />} />
          <Route path='/helmet/:id' element={<Shop asset='helmets' />} />
          <Route path='/nonprofit/:id' element={<Shop asset='nonprofits' />} />
          <Route path='/login' element={<Shop asset='nonprofits' />} />
        </Routes>
      </div>
    </Container>
  );
}
