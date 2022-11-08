import '../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
import logoJaDelivery  from "../assets/pngtree-cartoon-delivery-staff_cb.png"
import { signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import cart from "../assets/imagens/cart-69-24.png";

import { useState } from 'react';

export default function HeaderCliente(){

    const [query, setQuery] = useState("");
    const search = (data) => {
        return data.filter((item) => item.name.toLowerCase().includes(query))
    }

    const navigate = useNavigate();
    const logoutUser = async () => {
        await auth.signOut();
        navigate('/')
      }

    return(
        <>
  <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a
          href="/"
          className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <svg
            className="bi me-2"
            width={40}
            height={32}
            role="img"
            aria-label="Bootstrap"
          >
            <use xlinkHref="#bootstrap" />
          </svg>
        </a>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <div>
          <Link to='/homeCliente'>
          <img
              src={logoJaDelivery}
              alt=""
              className="logoJaDelivery"
              height="45px"
            />
          </Link>

            

          </div>
          <li>
          <li>
          <Link to='/updateCliente' href="#" className="nav-link px-2 text-white">
                  Alterar Cadastro
            </Link>
          </li>
          </li>
        </ul>
       
        <a href="#" className="nav-link px-2 text-white">
            <img src={cart}></img>
        </a>
        
        <div className="text-end">
        
        <Button className='btnLogout' onClick={logoutUser}>
            Logout
        </Button>
        </div>
      </div>
    </div>
  </header>
</>

    )
}