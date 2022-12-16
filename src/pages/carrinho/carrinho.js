import { useState, useEffect, React } from "react";
import HeaderUser from "./../../components/HeaderUser"; 

import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link, useLocation} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import cart from "../../assets/imagens/cart-69-24.png";

//import {updatePassword} from 'firebase/auth';

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Query,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { async } from "@firebase/util";
import { Label, Form, Table, FormGroup, Col, Input } from "reactstrap";

import updateButton from "../../assets/pencil.png";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import "../../styles/home.css";

import facebook from "../../assets/facebook(1).png";
import instagram from "../../assets/instagram(1).png";
import twitter from "../../assets/twitter(1).png";

import { db } from "../../firebase";
import Modal from "react-modal";
import { productSchema } from './../../validations/ProductValidation';
import Header from "../../components/Header";

const Carrinho = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    let shoppingCart;
    let totalQty;
    let totalPrice = 0;
    let totalItens = 0;
    let product;
    let index;
    let updatedPrice;
    let updatedQty;


    console.log(location);

    const logoutUser = async () => {
        await auth.signOut();
        navigate('/')
      }


    //Constantes do update
    const [newNome, setNewNome]= useState("");
    const [newAvaliacao, setNewAvaliacao]= useState("");
    const [newDescricao, setNewDescricao]= useState("");
    const [newPreco, setNewPreco]= useState(0);
    const [newQuantidade, setNewQuantidade]= useState(0);
    const [newStatus, setNewStatus]= useState("");

    //CARREGA DADOS
  const carregaDados = async (product, tipo_usuario) =>{
    const docRef = doc(db, "products", product.id)
    const docSnap = await getDoc(docRef);

    docSnap.data();

    
    let docId = JSON.stringify(docSnap.id);
    docId = JSON.parse(docId);
    
  }

  //Camada de update


  //constante de produtos
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const [counter, setCounter] = useState(0);  

  //Constante de usuarios
  const cartCollectionRef = collection(db, "cart");
  

  //Variavel para criar os indices na listagem
  var number = 0;

  const deleteProduct = async (id) => {
    const cartDoc = doc(db, "cart", id);
    await deleteDoc(cartDoc);
    alert("Produto deletado");
  };


  const incrementCount = () => {  
    // Update state with incremented value  
    setCounter(counter + 1);  
  };  
  const decrementCount = () => {  
    // Update state with incremented value  
    setCounter((c) => Math.max(c - 1, 0));  
  }; 


  // Faz o load dos pedidos
  useEffect(() => {
    const getCart = async () => {
      
      const cartQuery = query(cartCollectionRef, where("user_id", "==", location.state.id , " AND "));
      console.log(location.state.id + "STATE");
      console.log(cartQuery + "cartQuery");

      const data = await getDocs(cartQuery);
      setProducts(data.docs.map((doc) => (
        { ...doc.data(), id: doc.id }
        )));
      getTotalPrice(products);
      
    };
    getCart();
  }, []);

  console.log(products);
  

  const [queri, setQueri] = useState("");

  const getTotalPrice = (products) => {
    console.log(products)
    products.forEach(prod => {
      let auxTotal = 0;
      auxTotal = JSON.parse(prod.price);
      console.log(auxTotal);
      totalPrice += auxTotal;
      console.log(totalPrice);
    });
    return totalPrice;

  }

  const getTotalQty = (products) => {
    totalItens = products.length;
    return totalPrice;

  }
return (
        <>
          <Header user={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}}
      />

      <section className="listaProdutosRegistrados">
        <div>
          <Table dark>
            <thead>

            <div className="listaCabeçalho">Produtos do pedido: </div>
              <tr>
                <th>Cod. Produto</th>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Ação</th>
              </tr>
            </thead>

            {products.filter(product => product.nome.toLowerCase().includes(queri))
            .map((product) => {
              return (

                <tbody>
                  <tr>
                    <th scope="row">{product.id}</th>
                    <td>{product.nome}</td>
                    <td>
                    <div className="btn-group" width="50px" role="group"> <button type="button" className="btn btn-warning" onClick={decrementCount} > - -</button>  
                          <input type="number" min="1" defaultValue={counter} className="form-controlA" />  
                          <Button  type="button"  className="btn btn-warning"  onClick={incrementCount} > + </Button> 
                      </div>
                    </td>
                    
                    <td class="tableUserData">
                      <Button className="buttonUpdateUser" onClick={() => carregaDados(product, location.state.tipo_usuario)}>
                        <img
                          height="10px"
                          width="10px"
                          src={updateButton}
                        ></img>
                      </Button>
        
                      <Button
                        className="btnInativarUsuario"
                        height="10px"
                        width="10px"
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                      >
                        x
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      </section>
      

      
      <Table className="resumoPedido">
            <thead className="tentativa">

            <div className="listaCabeçalhoPedido">Resumo do pedido: </div>
              <tr className="fechamentoPedido">
                <th>Total de itens: {products.length}</th>
                <th>Subtotal: {getTotalPrice(products)} R$</th>
                <th>Frete: </th>
                
              </tr>
              <button className="btnFecharPedido" >
                <Link state={{total:totalPrice , produtos:products, endereco:location.state.endereco}} to='/fechamentoPedido' className="nav-link px-2 " >
                  Finalizar compra
                </Link></button>      
            </thead>

            
          </Table>

      <footer className="footer-principal">
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">
              © 2022 Delivery, JáDelivery
            </p>
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
                <img height="30px" src={facebook}></img>
              </li>
              <li className="nav-item logo-itens">
                <img height="30px" src={instagram}></img>
              </li>
              <li className="nav-item logo-itens">
                <img height="30px" src={twitter}></img>
              </li>
            </ul>
          </footer>
        </div>
      </footer>
    </>
)};

export default Carrinho;
