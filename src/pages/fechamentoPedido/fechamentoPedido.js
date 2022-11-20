import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link, useParams, useLocation, UNSAFE_LocationContext} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import {Row, Col} from 'antd';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const FechamentoPedido = props =>{
  const location = useLocation();


  const {type} = useParams();
  const stateParamVal = useLocation().state.stateParam;
  
    return(
        <>
  <HeaderCliente/>
  
  
           <section className='sessaoTipoPagamento'>
           <Tabs className='tiposPagamento' defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab  eventKey={1} title="Cartão de crédito">
                <Form >
          <Row>
            <Col md={0}>
              <FormGroup>
                <Label for="numCartao">Numero do cartão</Label>
                <Input
                  id="numCartao"
                  name="numCartao"
                  placeholder="Numero do cartão"
                  type="number"
           
                />
              </FormGroup>
            </Col>

            <Col md={0}>
              <FormGroup>
                <Label for="codVerificador">Codigo verificador</Label>
                <Input
                  id="codVerificador"
                  name="codVerificador"
                  placeholder="Codigo verificador"
                  type="number"
           
                />
              </FormGroup>
            </Col>

            <Col md={0}>
              <FormGroup>
                <Label for="nomeTitular">Nome do titular</Label>
                <Input
                  id="nomeTitular"
                  name="nomeTitular"
                  placeholder="Nome do titular"
                  type="text"
           
                />
              </FormGroup>
            </Col>

            <Col md={6}>
            <FormGroup>
                <Label for="data_nascimento">
                Data de nascimento
                </Label>
                <Input
                id="data_nascimento"
                name="data_nascimento"
                placeholder="Data nascimento"
                type="date"
                />
            </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="parcelas">Quantidade de parcelas</Label>
                <Input
                  id="parcelas"
                  name="parcelas"
                  placeholder="Quantidade de parcelas"
                  type="select"

                >
                  <option></option>
                  <option>2x</option>
                  <option>3x</option>
                  <option>4x</option>
                  <option>5x</option>
                  <option>6x</option>
                  <option>7x</option>
                  <option>8x</option>
                </Input>
              </FormGroup>
            </Col>
          
            </Row>

               
        </Form>
                </Tab>
                <Tab eventKey={2} title="Boleto">
                    <ul>
                        <li>imprima o boleto e pague no banco</li>
                        <li>ou pague pela internet utilizando o código de barras do boleto</li>
                        <li>o prazo de validade do boleto é de 1 dia util</li>
                    </ul>
                </Tab>
            </Tabs>

            <Button className="btnCadastrarProdutoFinal" >Fechar Pedido</Button>
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

export default FechamentoPedido;