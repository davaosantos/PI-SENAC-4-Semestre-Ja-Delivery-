import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import {button, Modal} from 'react-bootstrap'

import Brahma from '../../assets/imagens/Brahma.png'
import Budweiser from '../../assets/imagens/budweiser.png'
import Beats from '../../assets/imagens/beats.png'
import Absolut from '../../assets/imagens/absolut.png'


import ProductSlider from '../../components/ProductSlider';
import HeaderVisit from '../../components/HeaderVisit';
import { useState } from 'react';
import { MDBModal } from 'mdb-react-ui-kit';
import { Button } from 'reactstrap';
import ProductSliderVisit from '../../components/ProductSliderVisit';

export default function VisitPage(){

   const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return(
        <>
  <HeaderVisit/>


      <Modal className='modalVisit' show={show} onHide={handleClose}>
        <Modal.Header className='headerModalVisit'>
          <Modal.Title className='logoModalVisit'><img height='80px' src={logoJaDelivery}></img></Modal.Title>
        </Modal.Header>
        <Modal.Body className='textoModalVisit'>Você tem mais de 18 anos?</Modal.Body>
        <Modal.Footer className='buttonModalVisit footerModalVisit'>
          <Button variant="secondary" onClick={handleClose}>
            Sim
          </Button>
          <a className='mais18' href='https://www.ambev.com.br/consumo-responsavel-aviso'>
          <Button variant="primary" onClick={handleClose}>
              Não          
          </Button>
          </a>  
        </Modal.Footer>
      </Modal>

      <section>

      
      <div class="container">

  <h1 class="fw-light text-center text-lg-start mt-4 mb-0">Confira nossos produtos: </h1>

  <hr class="mt-2 mb-5"/>

  <div class="row text-center text-lg-start">

  
    <ProductSliderVisit></ProductSliderVisit>
   
  </div>

</div>

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