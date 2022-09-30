import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Label, Form, FormGroup, Input , FormText, Button, Col, Row} from 'reactstrap';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from './../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../../components/Header';
import Select from 'react-select'


export default function CadastroProduto(){

    


    //Valores dos inputs
    const [newNome, setNewNome]= useState("");
    const [newQuantidade, setNewQuantidade]= useState(0);
    const [newValor, setNewValor]= useState(0);
    const [newStatus, setNewStatus]= useState("");

   

    //Cria uma referencia para o banco
    const productsCollectionRef = collection(db, "products");

    //Cria os usuarios
    const createProducts = async () =>{



      //Itera o banco para verificar se o email já existe
     /* for(const user of users){
        if(user.email == newEmail){
          emailValid = false;
          setErrorEmail("Email já cadastrado")
        }
      }; 

      //Verifica se o formulário é valido
      const isValid = await userSchema.isValid(formData);

      //Verifica se o cpf é valido
      const cpfValid = await cpfSchema.isValid(formCpf);

      //Mensagem de erro CPF
      if(!cpfValid){
        setErrorCpf("CPF Inválido");
      }
	  */
      
      //Se o formulario e o email forem validos
        await addDoc(productsCollectionRef, {nome: newNome, quantidade : newQuantidade, 
          valor : newValor, status : newStatus}) 
 
           //signIn();
           alert("Produto cadastrado com sucesso");

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
        <Label for="quantidade">
          Quantidade
        </Label>
        <Input
          id="quantidade"
          name="quantidade"
          placeholder="Quantidade"
          type="number"
          onChange={(event) => {setNewQuantidade(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={6}>
      <FormGroup>
        <Label for="valor">
          Valor
        </Label>
        <Input
          id="valor"
          name="valor"
          placeholder="Valor"
          type="number"
          onChange={(event) => {setNewValor(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={6}>
      <FormGroup>
        <Label for="status">
          Status
        </Label>
        <Input
          id="status"
          name="status"
          placeholder="Status"
          type="text"
          onChange={(event) => {setNewStatus(event.target.value)}}
        />
      </FormGroup>
    </Col>
	
  </Row>
  
  <Button onClick={createProducts}>
    Cadastrar
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