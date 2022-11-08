import '../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
import logoJaDelivery  from "../assets/pngtree-cartoon-delivery-staff_cb.png"
import { signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function HeaderVisit(){

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

            <img
              src={logoJaDelivery}
              alt=""
              className="logoJaDelivery"
              height="45px"
            />

          </div>
          <li>

              Já Delivery
          </li>
        </ul>
        
        <div className="text-end">
        <Link to='/login' className='btnEntrar' >
            Entrar
        </Link>
        </div>
      </div>
    </div>
  </header>
</>

    )
}