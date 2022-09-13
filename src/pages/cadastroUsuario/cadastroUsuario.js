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

import { userSchema, cpfSchema } from '../../validations/UserValidation';



export default function CadastroUsuario(){

    //Array de usuarios
    const [users, setUsers] = useState([]);

    //Faz o get dos usuários já cadastrados
    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
    }, []);


    //Valores dos inputs
    const [newNome, setNewNome]= useState("");
    const [newTelefone, setNewTelefone]= useState(0);
    const [newEmail, setNewEmail]= useState("");
    const [newDataNascimento, setNewDataNascimento]= useState("");
    const [newTipoUsuario, setNewTipoUsuario]= useState("");
    const [newCpf, setNewCpf]= useState("");
    const [newSenha, setNewSenha]= useState("");

    //Valores dos erros
    const [errorCpf, setErrorCpf ] = useState("");
    const [errorValores , setErrorValores] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    
    //verificação de email
    let emailValid = true;

    //Cria uma referencia para o banco
    const usersCollectionRef = collection(db, "users");

    //Cria os usuarios
    const createUser = async () =>{

      //Formulario para validação 
      let formData = {
        nome: newNome,
        telefone : newTelefone,
        email: newEmail,
        data_nascimento : newDataNascimento,
        tipo_usuario:newTipoUsuario,
        cpf:newCpf,
        senha:newSenha
      }
      

      //Objeto cpf para validação
      let formCpf = {
        cpf: newCpf
      }

      //Itera o banco para verificar se o email já existe
      for(const user of users){
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
      
      //Se o formulario e o email forem validos
      if(isValid && emailValid){
        await addDoc(usersCollectionRef, {nome: newNome, telefone: newTelefone, 
          email:newEmail, data_nascimento:newDataNascimento, tipo_usuario:newTipoUsuario,cpf:newCpf, 
           senha: newSenha})
  
           const signIn = () =>{
            createUserWithEmailAndPassword(auth, newEmail, newSenha)
            .then(auth=> console.log(auth))
            .catch(error => console.error(error))
           }
  
           signIn();
           alert("Usuario cadastrado com sucesso");
      }else{
        setErrorValores("Revise os valores do cadastro")
      }

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
        {errorEmail && <p className="errorEmail">{errorEmail}</p>}
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

    <Col md={6}>
      <FormGroup>
        <Label for="CPF">
          CPF
        </Label>
        <Input
          id="cpf"
          name="cpf"
          placeholder="CPF"
          type="text"
          onChange={(event) => {setNewCpf(event.target.value)}}
        />
      </FormGroup>
      {errorCpf && <p className="errorCpf">{errorCpf}</p>}
    </Col>
    

    <Col sm={10}>
        <FormGroup>
        <Label for="tipo_usuario">Tipo de usuário</Label>
      <Input
        id="tipo_usuario"
        name="tipo_usuario"
        type="select"
        defaultValue={"Estoquista"}
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

  {errorValores && <p className="errorValores">{errorValores}</p>}
  
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