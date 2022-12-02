import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Label, Form, FormGroup, Input , FormText, Button, Col, Row} from 'reactstrap';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../../components/Header';
import Select from 'react-select';
import validaCpf from '../../validations/CpfValidation';
import axios from 'axios';
import { userSchema, cpfSchema } from '../../validations/UserValidation';
import HeaderVisit from '../../components/HeaderVisit';
import { registerVersion } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { Table } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import HeaderCliente from '../../components/HeaderCliente';


const ListaPedidos = () => {


    //variavel para index dos pedidos
    let number = 0;

    //Array de clientes
    const [clientes, setClientes] = useState([]);

    const [pedidos, setPedidos] = useState([]);

    const pedidosCollectionRef = collection(db, "pedidos");

    //Query para busca dos pedidos
    const [query, setQuery] = useState("");
    
    //Faz o get dos clientes já cadastrados
    useEffect(() => {
      const getPedidos = async () => {
        const data = await getDocs(pedidosCollectionRef);
        setPedidos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
      };
      getPedidos();
    }, []);
  
    // dados da api viacep
    const [dados, setDados] = useState(null);

    //Valores dos inputs
    const [newTelefone, setNewTelefone]= useState(0); // 
    const [newEmail, setNewEmail]= useState(""); //
    const [newCpf, setNewCpf]= useState(""); //
    const [newSenha, setNewSenha]= useState(""); // 
    const [newEndereco, setNewEndereco] = useState(""); // NW
    const [newCep , setNewCep] = useState(""); 


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

    <section className="listaPedidos">
        <div>
          <br></br>
          <h2>Lista de pedidos: </h2>
          <br/>
          <Table dark>
            <thead>
              <tr>
                <th>Numero Pedido</th>
                <th>Data do pedido</th>
                <th>Cod Pedido</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>

            {pedidos
            .map((pedido) => {
              return (

                <tbody>
                  <tr>
                    <th scope="row">{number += 1}</th>
                    <td>{pedido.data}</td>
                    <td>{pedido.nrPedido}</td>
                    <td>{pedido.valorTotal}</td>
                    <td>{pedido.status}</td>  
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
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

export default ListaPedidos;