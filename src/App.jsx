import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './style.css';
import { Header, HomePage, Reg, Login, Cart, Order } from './components';
import uuid from 'react-uuid';

function App() {
  const [pets, setPets] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [order,setOrder] = React.useState([])
  const [loading,setLoading] = React.useState(false)

  const fetchPets = async () => {
    await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=pending')
      .then((res) => res.json())
      .then((pet) => setPets(pet))
      .catch((err) => {
        console.log(err);
      });
      fetchPets().finally(() => {
        setLoading(false)
      })
  };

  React.useEffect(() => {
    setLoading(true)
    fetchPets();
    console.log(fetchPets)
  }, []);

  const [login, setLogin] = React.useState(false); //Установить на false для корректной работы

  const [account, setAccount] = React.useState([
    { id: uuid(), name: 'admin', password: 'admin' },
    { id: uuid(), name: 'zekrin', password: '123' },
  ]);

  const len = cart.length;

  const lenOrder = order.length

  return (
    <Router>
      <Header login={login} lenOrder={lenOrder} setLogin={setLogin} len={len}></Header>
      <Routes>
        <Route
          path='/'
          element={<HomePage loading={loading} cart={cart} setCart={setCart} pets={pets} login={login} />}
        ></Route>
        <Route
          path='/cart'
          element={<Cart login={login} cart={cart} setCart={setCart} setOrder={setOrder} />}
        ></Route>
        <Route
          path='*'
          element={
            <p className='grid-img'>Такого пути не существует,проверьте правильность маршрута.</p>
          }
        ></Route>
        <Route
          path='/reg'
          element={
            <Reg
              propName={''}
              propPassword={''}
              propEmail={''}
              account={account}
              setAccount={setAccount}
            />
          }
        ></Route>
        <Route path='/login' element={<Login setLogin={setLogin} account={account} />}></Route>
        <Route path="/order" element={<Order login = {login} order={order} setOrder={setOrder} setCart={setCart}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
