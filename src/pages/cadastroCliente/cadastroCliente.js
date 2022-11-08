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
import Select from 'react-select';
import validaCpf from '../../validations/CpfValidation';
import axios from 'axios';
import { userSchema, cpfSchema } from '../../validations/UserValidation';
import HeaderVisit from './../../components/HeaderVisit';
import { registerVersion } from 'firebase/app';
import { useForm } from 'react-hook-form';


const CadastroCliente = (props) => {

    //Array de clientes
    const [clientes, setClientes] = useState([]);

    const [users, setUsers] = useState([]);
    
    //Faz o get dos clientes já cadastrados
    useEffect(() => {
      const getClientes = async () => {
        const dataC = await getDocs(clientesCollectionRef);
        setClientes(dataC.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
      };
      getClientes();
    }, []);


    //Faz o get dos usuarios já cadastrados
    useEffect(() => {
      const getUsers = async () => {
        const dataU = await getDocs(usersCollectionRef);
        setUsers(dataU.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       
      };
      getUsers();
    }, []);
  
    // dados da api viacep
    const [dados, setDados] = useState(null);

    //Valores dos inputs
    const [newNome, setNewNome]= useState(""); //
    const [newTelefone, setNewTelefone]= useState(0); // 
    const [newEmail, setNewEmail]= useState(""); //
    const [newDataNascimento, setNewDataNascimento]= useState(""); //
    const [newCpf, setNewCpf]= useState(""); //
    const [newSenha, setNewSenha]= useState(""); // 
    const [newEndereco, setNewEndereco] = useState(""); // NW
    const [newCep , setNewCep] = useState(""); //
    const [newLogradouro , setNewLogradouro] = useState("");
    const [newNumero , setNewNumero] = useState("");
    const [newComplemento , setNewComplemento] = useState("");
    const [newBairro , setNewBairro] = useState("");
    const [newCidade , setNewCidade] = useState("");
    const [newUf , setNewUf] = useState("");


    //Variaveis do checkCep
    const [values, setValues] = useState({
      bairro:'',
      complemento:'',
      localidade:'',
      logradouro:'',
      uf:''
    })
    
    
    //Valores dos erros
    const [errorCpf, setErrorCpf ] = useState("");
    const [errorValores , setErrorValores] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    

    const checkCEP = (e) => {
      const cep = e.target.value.replace(/\D/g,'');
      axios.get(`https://viacep.com.br/ws/${cep}/json`)
      .then(data => {

        setValues(data.data);
    
      })
      
    }

    //verificação de email
    let emailValid = true;

    //Cria uma referencia para o banco
    const clientesCollectionRef = collection(db, "clientes");

    const usersCollectionRef = collection(db, "users");

    //Cria os usuarios
    const createUser = async () =>{

      //Formulario para validação 
      let formData = {
        nome: newNome,
        telefone : newTelefone,
        email: newEmail,
        data_nascimento : newDataNascimento,
        cpf:newCpf,
        senha:newSenha
      }
      

      //Objeto cpf para validação
      let formCpf = {
        cpf: newCpf
      }

      //Itera o banco para verificar se o email já existe
      for(const cliente of clientes){
        if(cliente.email == newEmail){
          emailValid = false;
        
          setErrorEmail("Email já cadastrado")
        }
      };

      for(const user of users){
        if(user.email == newEmail){
          emailValid = false;

          setErrorEmail("Email já cadastrado")
        }
      }

      //Verifica se o formulário é valido
      const isValid = await userSchema.isValid(formData);

      //Verifica se o cpf é valido
      //const cpfValid = await cpfSchema.isValid(formCpf);

      let cpfValido = validaCpf(formCpf.cpf);

      //Mensagem de erro CPF
      if(cpfValido != true){
        setErrorCpf("CPF Inválido");
      }

      //Se o formulario e o email forem validos
      if(emailValid && cpfValido == true){
        await addDoc(clientesCollectionRef, {nome: newNome, telefone: newTelefone, 
          email:newEmail, data_nascimento:newDataNascimento, cpf:newCpf, 
           senha: newSenha, endereco:newEndereco, cep:newCep, logradouro:newLogradouro,
        numero:newNumero, complemento:newComplemento, bairro:newBairro, cidade:newCidade,
    uf:newUf})
  
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
    
    <HeaderVisit/>

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
        <Label for="endereco">
          Endereço
        </Label>
        <Input
          id="endereco"
          name="endereco"
          placeholder="Endereço"
          value={values.logradouro}
          type="endereco"
          onChange={(event) => {setNewEndereco(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={4}>
      <FormGroup>
        <Label for="cep">
          CEP
        </Label>
        <Input
          id="cep"
          name="cep"
          placeholder="Cep"
          type="text"
          onBlur={checkCEP}
          onChange={(event) => {setNewCep(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={1}>
      <FormGroup>
        <Label for="logradouro">
          Logradouro
        </Label>
        <Input
          id="logradouro"
          name="logradouro"
          placeholder="Logradouro"
          type="text"
          onChange={(event) => {setNewLogradouro(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={1}>
      <FormGroup>
        <Label for="numero">
          Numero
        </Label>
        <Input
          id="numero"
          name="numero"
          placeholder="Numero"
          type="number"
          onChange={(event) => {setNewNumero(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={1}>
      <FormGroup>
        <Label for="complemento">
         Complemento
        </Label>
        <Input
          id="complemento"
          name="complemento"
          value={values.complemento}
          placeholder="complemento"
          type="complemento"
          onChange={(event) => {setNewComplemento(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={3}>
      <FormGroup>
        <Label for="bairro">
         bairro
        </Label>
        <Input
          id="bairro"
          name="bairro"
          value={values.bairro}
          className="bairro"
          placeholder="bairro"
          type="text"
          onChange={(event) => {setNewBairro(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={4}>
      <FormGroup>
        <Label for="cidade">
        cidade
        </Label>
        <Input
          id="cidade"
          name="cidade"
          value={values.localidade}
          placeholder="cidade"
          type="cidade"
          onChange={(event) => {setNewCidade(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={1}>
      <FormGroup>
        <Label for="uf">
        UF
        </Label>
        <Input
          id="uf"
          name="uf"
          value={values.uf}
          placeholder="uf"
          type="uf"
          onChange={(event) => {setNewUf(event.target.value)}}
        />
      </FormGroup>
    </Col>

    <Col md={1}>
    <FormGroup tag="fieldset">
        <span>Gênero</span>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onChange={(event) => {setNewUf(event.target.value)}}/> Masculino
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onChange={(event) => {setNewUf(event.target.value)}}/> Feminino
          </Label>
        </FormGroup>
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

  <footer className="footer-principal" >
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

export default CadastroCliente;