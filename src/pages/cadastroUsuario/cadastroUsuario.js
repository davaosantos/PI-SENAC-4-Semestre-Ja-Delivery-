import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Label, Form, FormGroup, Input , FormText, Button, Col, Row} from 'reactstrap';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import { useState, useEffect } from 'react';
import fire from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';




const initialState = {
  nome:"",
  email : "",
  telefone : "",
  data_nascimento:"",
  tipo_usuario:"",
  senha:""
};

export default function CadastroUsuario(){

    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {nome, email, telefone, data_nascimento, tipo_usuario, senha} = state;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({...state, [name]: value})
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!nome || !email || !senha){
        toast.error("Por favor , insira um valor em cada campo do cadastro");
      }else{
        fire.child("usuarios").push(state, (err) => {
          if(err){
            toast.error(err);
          }else{
            toast.success("Usuario cadastrado com sucesso");
          }
        });
        setTimeout(() => navigate.push("/home"), 500);
      }
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
            <Link to='/cadastroProduto' className="nav-link px-2 text-white">
              Cadastro Produto
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link px-2 text-white">
              Lista Produtos
            </a>
          </li>
          <li>
            <Link to='/cadastroUsuario' href="#" className="nav-link px-2 text-white">
              Cadastrar Usuário
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link px-2 text-white">
              Carrinho
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 text-white">
              Lista Usuários
            </a>
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
          <Link to='/' type="button" className="btn btn-warning">
            logout
          </Link>
        </div>
      </div>
    </div>
  </header>

    <section className='FormUsuario'>
    <Form onSubmit={handleSubmit}>
      
    
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
          value={nome}
          onChange={handleInputChange}
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
          value={email}
          onChange={handleInputChange}
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
          value={telefone}
          onChange={handleInputChange}
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
          value={data_nascimento}
          onChange={handleInputChange}
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
        value={tipo_usuario}
        onChange={handleInputChange}
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
          value={senha}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
  
  <Button type="submit" value="save">
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