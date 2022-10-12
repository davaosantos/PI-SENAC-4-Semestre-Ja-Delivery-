import { useState, useEffect, React } from "react";
import HeaderUser from "./../../components/HeaderUser"; 

import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
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
  updateDoc,
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

function ListaProdutos() {

    const navigate = useNavigate();
    const logoutUser = async () => {
        await auth.signOut();
        navigate('/')
      }

      const [modelData, setModelData] = useState({
        id: "",
        nome : "",
        avaliacao : "",
        descricao : "",
        preco : "",
        quantidade : ""
      });

      const[modelId , setModelId] = useState("");

  //Constantes do update
    const [newNome, setNewNome]= useState("");
    const [newAvaliacao, setNewAvaliacao]= useState("");
    const [newDescricao, setNewDescricao]= useState("");
    const [newPreco, setNewPreco]= useState(0);
    const [newQuantidade, setNewQuantidade]= useState(0);
    const [newStatus, setNewStatus]= useState("");

    //CARREGA DADOS
  const carregaDados = async (product) =>{
    const docRef = doc(db, "products", product.id)
    const docSnap = await getDoc(docRef);

    docSnap.data();

    toggleShow();

    let docId = JSON.stringify(docSnap.id);
    docId = JSON.parse(docId);
    
    console.log("docsnap ida" + docSnap.id);
    console.log(docSnap.data());
    setModelData(docSnap.data());
    setModelId(docId);

    console.log(docSnap.nome);
    console.log("Model data" + modelData.id + docId + modelData.nome + modelData.data_nascimento);

  }

  //Camada de update

  const updateProducts = async (
    id,
    nome,
    avaliacao,
    descricao,
    preco,
    quantidade,
    status
  ) => {
    const productDoc = doc(db, "products", id);
    
    const newFields = {
      nome: modelData.nome,
      avaliacao: modelData.avaliacao,
      descricao : modelData.descricao, 
      preco: modelData.preco,
      quantidade: modelData.quantidade,
      status: modelData.status, // nao altera
    }

     //                0         1           2                 3               4
     let auxNewFields = [newNome, newAvaliacao, newDescricao, newPreco, newQuantidade];
     let index;
 
     console.log(auxNewFields[0]);
 
     for(index = 0; index < auxNewFields.length; index ++){
       if(auxNewFields[index] != ""){
         let escolha = index;
 
         switch(escolha){
           case 0 : 
            newFields.nome = newNome;
             break;
 
           case 1 : 
           newFields.avaliacao = newAvaliacao;
             break;
 
           case 2 : 
           newFields.descricao = newDescricao;
             break;
 
           case 3 : 
           newFields.preco = newPreco;
             break;
 
           case 4 : 
           newFields.quantidade = newQuantidade;
             break;
 
           default:
             console.log("Valores em branco");
         }
       }
     }

     const isValid = await productSchema.isValid(newFields);


     if(isValid){
      await updateDoc(productDoc, newFields);
      alert("Produto alterado com sucesso");
      window.location.reload();
     }
    }

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);


  //constante de produtos
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  //Variavel para criar os indices na listagem
  var number = 0;

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    alert("Produto deletado");
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  const [query, setQuery] = useState("");

return (
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
              <Link to='/listaUsuarios' className="nav-link px-2 text-white">
                  Lista Usuários
                </Link>
              </li>
              <li>
                  <a href="#" className="nav-link px-2 text-white">
                    <img src={cart}></img>
                  </a>
              </li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              
            </form>
            <div className="text-end">
            <Button className='btnLogout' onClick={logoutUser}>
                Logout
            </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="listaProdutosRegistrados">
        <div>
          <Table dark>
            <thead>

            <div className="listaCabeçalho">Produtos</div>
              <tr>
                <th>Cod. Produto</th>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ação</th>
                <th><button className="btnAddProduct" >
                <Link className="nav-link px-2 text-white" to='/cadastroProduto' >
                  +
                </Link></button></th>
              </tr>
            </thead>

            {products.filter(product => product.nome.toLowerCase().includes(query))
            .map((product) => {
              return (

                <tbody>
                  <tr>
                    <th scope="row">{product.id}</th>
                    <td>{product.nome}</td>
                    <td>{product.quantidade}</td>
                    <td>{product.preco}</td>
                    <td>{product.status}</td>
                    
  

                    <td class="tableUserData">
                      <Button className="buttonUpdateUser" onClick={() => carregaDados(product)}>
                        <img
                          height="10px"
                          width="10px"
                          src={updateButton}
                        ></img>
                      </Button>
                      <MDBModal
                        show={basicModal}
                        setShow={setBasicModal}
                        tabIndex="-1"
                      >
                        <MDBModalDialog>
                          <MDBModalContent className="modalUserUpdate">
                            <MDBModalHeader>
                              <MDBModalTitle>Modal title</MDBModalTitle>
                              <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                              <Form className="form-update-user">
                              <FormGroup row>
                                  <Label for="id" sm={2}>
                                    ID
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="text"
                                      name="id"
                                      id="id"
                                      placeholder="id"
                                      value={modelId}
                                      disabled="true"
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="nome" sm={2}>
                                    Nome
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="text"
                                      name="nome"
                                      id="nome"
                                      placeholder="Nome"
                                      defaultValue={modelData.nome}
                                      onChange={(event) => {
                                        setNewNome(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="avaliacao" sm={2}>
                                    Tipo
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="select"
                                      name="avaliacao"
                                      id="avaliacao"
                                      defaultValue={modelData.avaliacao}
                                      onChange={(event) => {
                                        setNewAvaliacao(event.target.value);
                                      }}
                                    >  
                                      <option></option>
                                      <option>0</option>
                                      <option>0.5</option>
                                      <option>1.0</option>
                                      <option>1.5</option>
                                      <option>2.0</option>
                                      <option>2.5</option>
                                      <option>3.0</option>
                                      <option>3.5</option>
                                      <option>4.0</option>
                                      <option>4.5</option>
                                      <option>5.0</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="descricao">Descrição :</Label>
                                    <Input 
                                    type="textarea" 
                                    placeholder="Descrição"
                                    name="descricao" 
                                    defaultValue={modelData.descricao}
                                    id="descricao"                              
                                    rows={4}
                                    onChange={(event) => {
                                      setNewDescricao(event.target.value);
                                    }}/>
                              </FormGroup>

                                <FormGroup row>
                                  <Label for="quantidade" sm={2}>
                                    Qtd
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="number"
                                      name="quantidade"
                                      id="quantidade"
                                      placeholder="Quantidade"
                                      defaultValue={modelData.quantidade}
                                      onChange={(event) => {
                                        setNewQuantidade(
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
								
								<FormGroup row>
                                  <Label for="valor" sm={2}>
                                    Valor
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="number"
                                      name="preco"
                                      id="preco"
                                      placeholder="Valor"
                                      defaultValue={modelData.preco}
                                      onChange={(event) => {
                                        setNewPreco(
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                
                                <FormGroup row>
                                  <Label for="status" sm={2}>
                                    Tipo
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="status"
                                      name="status"
                                      id="status"
                                      disabled="true"
                                      defaultValue={modelData.status}
                                      onChange={(event) => {
                                        setNewStatus(event.target.value);
                                      }}
                                    >  
                                      <option></option>
                                      <option>Disponivel</option>
                                      <option>Indisponivel</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                              </Form>
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                className="modalEditCloseBtn"
                                color="secondary"
                                onClick={toggleShow}
                              >
                                Close
                              </MDBBtn>
                              <MDBBtn
                                className="modalEditSaveBtn"
                                onClick={() => {
                                  updateProducts(
                                    product.id,
                                    product.nome,
									product.quantidade,
									product.valor,
									product.status
                                  );
                                }}
                              >
                                Save changes
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
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
                    <td></td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      </section>

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

export default ListaProdutos;
