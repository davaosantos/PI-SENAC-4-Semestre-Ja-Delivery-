import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"


import ProductSlider from '../../components/ProductSlider';
import Header from './../../components/Header';
import { useState } from 'react';
import { MDBModal } from 'mdb-react-ui-kit';

export default function Home(){
  
    return(
        <>
  <Header/>

  <section className='carroselProdutos'>
      <h1>FAIXA DA LANDING</h1>
  </section>

  <section className='carroselProdutos'>
      <ProductSlider/>
  </section>

  <footer className="footer-principal">
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2022 Delivery, JáDelivery</p>
        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <svg className="bi me-2" width={40} height={32}>
            <use xlinkHref="#bootstrap" />
          </svg>
        </a>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item logo-itens">
            <img height='30px' src={facebook}></img>
          </li>
          <li className="nav-item logo-itens">
            <img height='30px' src={instagram}></img>
          </li>
          <li className="nav-item logo-itens">
            <img height='30px' src={twitter}></img>
          </li>
          
        </ul>
      </footer>
    </div>
  </footer>
</>

    )
}