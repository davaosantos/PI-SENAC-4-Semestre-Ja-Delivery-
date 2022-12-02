






import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, UNSAFE_LocationContext, useNavigate } from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { db, logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import {Row, Col} from 'antd';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow
  } from "mdb-react-ui-kit";


import Header from './../../components/Header';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import HeaderCliente from '../../components/HeaderCliente';
import { Form } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Label, Button } from 'reactstrap';
import { Input } from 'reactstrap';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const ResumoPedido = props =>{
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);


  const {type} = useParams();
  const stateParamVal = useLocation().state.stateParam;

  //Array de usuarios
  const [pedido, setPedido] = React.useState([]);
  //Valores dos inputs
  const [newNrCartao, setNewNrCartao]= useState("");
  const [newCodVerificador, setNewCodVerificador]= useState(0);
  const [newNmTitular, setNewNmTitular]= useState("");
  const [newDataNascimento, setNewDataNascimento]= useState("");
  const [newQtdParcela, setNewQtdParcela]= useState("");

  //Cria uma referencia para o banco
  const pedidosCollectionRef = collection(db, "pedidos");


  //Cria o pedido
  const createPedido = async () => {

      //Se o formulario e o email forem validos
    await addDoc(pedidosCollectionRef, {
      nomeTitular: location.state.nomeTitular,
      nrCartao: location.state.nrCartao,
      produtos: location.state.produtos,
      valorTotal: location.state.valorTotal
    });
    //signIn();
    alert("Produto cadastrado com sucesso");
    
    
  };
  
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
            <Link to='/home'>
            <img
        
              src={logoJaDelivery}
              alt=""
              className="logoJaDelivery"
              height="45px"
              
            />
            </Link>
          </div>
       
          <li>
          <Link to='/listaProdutos' href="#" className="nav-link px-2 text-white">
                  Lista Produtos
            </Link>
          </li>
          <li>
            <Link  to='/cadastroUsuario' href="#" className="nav-link px-2 text-white">
              Cadastrar Usuário
            </Link>
          </li>
          
          <li>
          <Link  to='/listaUsuarios' className="nav-link px-2 text-white">
              Lista Usuários
            </Link>
          </li>

          <li>
          <Link  to='/resumoPedido' className="nav-link px-2 text-white">
              Pedidos
            </Link>
          </li>

          <li>
          <Link  to='/carrinho' className="nav-link px-2 text-white">
          <img ></img>
            </Link>
          </li>
        </ul>
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="form-control form-control-dark text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <div className="text-end">
        <Button className='btnLogout' >
            Logout
        </Button>
        </div>
      </div>
    </div>
  </header>
  
  
  <section className="h-100 h-custom" style={{ backgroundColor: "#FFA200" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Resumo do pedido
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>10 April 2021</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>012j1gvs356c</p>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                  <MDBCol className="mb-3">
                            <p className="small text-muted mb-1">Numero cartão: </p>
                            <p>{location.state.nrCartao}</p>
                            </MDBCol>
                        <MDBCol className="mb-3">
                            <p className="small text-muted mb-1">Nome do titular: </p>
                            <p>{location.state.nomeTitular}</p>
                            </MDBCol>
                    </MDBRow>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p>BEATS Solo 3 Wireless Headphones</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p>{location.state.valorTotal}</p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="8" lg="9">
                        <p className="mb-0">Shipping</p>
                      </MDBCol>
                      <MDBCol md="4" lg="3">
                        <p className="mb-0">£33.00</p>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        R${location.state.valorTotal}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    <Button className="btnCadastrarProdutoFinal" onClick={createPedido} >Fechar Pedido</Button>
                  </p>
            
               
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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

export default ResumoPedido;