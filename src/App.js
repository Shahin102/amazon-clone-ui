import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import Payment from "./Payment"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe("pk_test_51K1lz0Apr0IY9zJlZFQQmCqKIz3gw5wYjDoRB7ekmIixdlPDr9imRNHjJ2c3VxCFGmZJpaTr51kx6DdYjKUt0Ht80037a1q73Q");

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged(authUser => {
      // console.log('The USER IS >>> ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  }, [])

  return (
    // BEM
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/checkout" element={<Header />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Routes>
          <Route path="/payment" element={<Header />} />
        </Routes>
        <Elements stripe={promise}>
          <Routes>
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Elements>
      </div>
    </BrowserRouter>
  );
}

export default App;
