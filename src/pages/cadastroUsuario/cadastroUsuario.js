import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Label, Form, FormGroup, Input , FormText, Button, Col, Row} from 'reactstrap';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../../components/Header';


const initialState = {
  nome:"",
  email : "",
  telefone : "",
  data_nascimento:"",
  tipo_usuario:"",
  senha:""
};

export default function CadastroUsuario(){

    const [newNome, setNewNome]= useState("");
    const [newTelefone, setNewTelefone]= useState(0);
    const [newEmail, setNewEmail]= useState("");
    const [newDataNascimento, setNewDataNascimento]= useState("");
    const [newTipoUsuario, setNewTipoUsuario]= useState("");
    const [newSenha, setNewSenha]= useState("");

    const usersCollectionRef = collection(db, "users");

    const createUser = async () =>{
      await addDoc(usersCollectionRef, {nome: newNome, telefone: newTelefone, 
        email:newEmail, data_nascimento:newDataNascimento, tipo_usuario:newTipoUsuario, 
         senha: newSenha})

         const signIn = () =>{
          createUserWithEmailAndPassword(auth, newEmail, newSenha)
          .then(auth=> console.log(auth))
          .catch(error => console.error(error))
         }

         signIn();
         alert("Usuario cadastrado com sucesso");
    }
    

    return(
        <>
    
    <Header/>

    <section className='FormUsuario'>
    <Form>
      
    
  <Row>
  <Col md={6}>
      <FormGroup>
        <Label for="nome">
          Nome
        </Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Nome"
          type="text"
          onChange={(event) => {setNewNome(event.target.value)}}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          onChange={(event) => {setNewEmail(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={6}>
      <FormGroup>
        <Label for="telefone">
          Telefone
        </Label>
        <Input
          id="telefone"
          name="telefone"
          placeholder="Telefone"
          type="tel"
          onChange={(event) => {setNewTelefone(event.target.value)}}
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
          onChange={(event) => {setNewDataNascimento(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col sm={10}>
        <FormGroup>
        <Label for="tipo_usuario">Tipo de usuário</Label>
      <Input
        id="tipo_usuario"
        name="tipo_usuario"
        type="select"
        onChange={(event) => {setNewTipoUsuario(event.target.value)}}
      >
        <option>
          Administrador
        </option>
        <option>
          Estoquista
        </option>
      </Input>
      </FormGroup>
    </Col>

    <Col md={6}>
      <FormGroup>
        <Label for="senha">
          Password
        </Label>
        <Input
          id="senha"
          name="senha"
          placeholder="Senha"
          type="password"
          onChange={(event) => {setNewSenha(event.target.value)}}
        />
      </FormGroup>
    </Col>
  </Row>
  
  <Button onClick={createUser}>
    Sign in
  </Button>
  
</Form>
    </section>

  <footer>
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2022 Company, Inc</p>
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