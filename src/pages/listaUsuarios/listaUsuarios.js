import { useState, useEffect, React } from "react";
import HeaderUser from "./../../components/HeaderUser"; 

import '../../styles/home.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import { updateSchema } from "../../validations/UserValidation";
import { userSchema, modalSchema } from './../../validations/UserValidation';

const ListaUsuarios = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const logoutUser = async () => {
        await auth.signOut();
        navigate('/')
      }

      console.log(location)


    const [modelData, setModelData] = useState({
        id: "",
        nome : "",
        telefone : "",
        email : "",
        data_nascimento : "",
        tipo_usuario : "",
        cpf : "",
        senha : "",
        status : ""
      });

      const[modelId , setModelId] = useState("");

  //Constantes do update
  const [newNome, setNewNome] = useState("");
  const [newTelefone, setNewTelefone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newDataNascimento, setNewDataNascimento] = useState("");
  const [newTipoUsuario, setNewTipoUsuario] = useState("");
  const [newSenha, setNewSenha] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newCpf, setNewCpf] = useState(0);

  //CARREGA DADOS
  const carregaDados = async (user) =>{
    const docRef = doc(db, "users", user.id)
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

  const updateUser = async (
    id,
    nome,
    telefone,
    //email,
    data_nascimento,
    tipo_usuario,
   // cpf,
    senha,
    //status
  ) => {
    const userDoc = doc(db, "users", id);

    const oldFields = {
      nome: modelData.nome,
      telefone: modelData.telefone,
      email : modelData.email, // nao altera
      data_nascimento: modelData.data_nascimento,
      tipo_usuario: modelData.tipo_usuario,
      cpf : modelData.cpf, //nao altera
      senha: modelData.senha,
      //status: modelData.status // nao altera
    }

    //                0         1           2                 3               4
    let newFields = [newNome, newTelefone, newDataNascimento, newTipoUsuario, newSenha];
    let index;

    console.log(newFields[0]);

    for(index = 0; index < newFields.length; index ++){
      if(newFields[index] != ""){
        let escolha = index;

        switch(escolha){
          case 0 : 
            oldFields.nome = newNome;
            break;

          case 1 : 
            oldFields.telefone = newTelefone;
            break;

          case 2 : 
            oldFields.data_nascimento = newDataNascimento;
            break;

          case 3 : 
            oldFields.tipo_usuario = newTipoUsuario;
            break;

          case 4 : 
            oldFields.senha = newSenha;
            break;

          default:
            console.log("Valores em branco");
        }
      }
    }

    const newModal = {
      nome: newNome
    };

    let fields = JSON.stringify(newFields);


    console.log("Novos Campos" + fields)
    console.log(oldFields)
    const isValid = await updateSchema.isValid(oldFields);
    const eValid = await userSchema.isValid(newFields);
  

    console.log("isValid OldFields " + isValid);
    console.log("É valida " + eValid);

    if(isValid){
      await updateDoc(userDoc, oldFields);
     // updatePassword(userDoc.user, newSenha);
      alert("Usuario alterado com sucesso");
      window.location.reload();
    }else{
      alert("Existem valores em branco")
    }
  };

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  //Variavel para criar os indices na listagem
  var number = 0;

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    alert("Usuário deletado");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      console.log("teste");
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
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
                <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}} to='/home'>
                <img
                  src={logoJaDelivery}
                  alt=""
                  className="logoJaDelivery"
                  height="45px"
                />
                </Link>
              </div>
              
              <li>
              <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}} to='/listaProdutos'  className="nav-link px-2 text-white">
                  Lista Produtos
            </Link>
              </li>
              <li>
                <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}}  to='/cadastroUsuario' href="#" className="nav-link px-2 text-white">
                  Cadastrar Usuário
                </Link>
              </li>

              <li>
              <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}} to='/listaUsuarios' className="nav-link px-2 text-white">
                  Lista Usuários
                </Link>
              </li>

              <li>
          <Link to='/resumoPedido' className="nav-link px-2 text-white">
              Pedidos
            </Link>
          </li>

              <li>
                    <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}}  to='/carrinho' className="nav-link px-2 text-white">
                <img src={cart}></img>
                  </Link>
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

      <section className="listaUsuariosRegistros">
        <div>
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Data nascimento</th>
                <th>Tipo Usuario</th>
                <th>CPF</th>
                <th>Senha</th>

                <th>Status</th>

                <th>Ação</th>
              </tr>
            </thead>

            {users.filter(user => user.nome.toLowerCase().includes(query))
            .map((user) => {
              return (

                <tbody>
                  <tr>
                    <th scope="row">{number += 1}</th>
                    <td>{user.nome}</td>
                    <td>{user.telefone}</td>
                    <td>{user.email}</td>
                    <td>{user.data_nascimento}</td>
                    <td>{user.tipo_usuario}</td>
                    <td>{user.cpf}</td>
                    <td>{user.senha}</td>

                    <td>{user.status}</td>

                    <td class="tableUserData">
                      <Button className="buttonUpdateUser" onClick={() => carregaDados(user)}>
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
                                  <Label for="telefone" sm={2}>
                                      Telefone
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="number"
                                      name="telefone"
                                      id="telefone"
                                      placeholder="Telefone"
                                      defaultValue={modelData.telefone}
                                      onChange={(event) => {
                                        setNewTelefone(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="email" sm={2}>
                                    Email
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="text"
                                      name="email"
                                      id="email"
                                      placeholder="email"
                                      disabled="true"
                                      defaultValue={modelData.email}
                                      onChange={(event) => {
                                        setNewEmail(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Label for="data_nascimento" sm={2}>
                                    Data Nasc.
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="date"
                                      name="data_nascimento"
                                      id="data_nascimento"
                                      placeholder="Data de nascimento"
                                      defaultValue={modelData.data_nascimento}
                                      onChange={(event) => {
                                        setNewDataNascimento(
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                

                                <FormGroup row>
                                  <Label for="tipo_usuario" sm={2}>
                                    Tipo
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="select"
                                      name="select"
                                      id="exampleSelect"
                                      defaultValue={modelData.tipo_usuario}
                                      onChange={(event) => {
                                        setNewTipoUsuario(event.target.value);
                                      }}
                                    >  
                                      <option></option>
                                      <option>Administrador</option>
                                      <option>Estoquista</option>
                                    </Input>
                                  </Col>
                                </FormGroup>


                                <FormGroup row>
                                  <Label for="CPF" sm={2}>
                                      CPF
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="number"
                                      name="cpf"
                                      id="cpf"
                                      placeholder="CPF"
                                      defaultValue={modelData.cpf}
                                      disabled="true"
                                      onChange={(event) => {
                                        setNewCpf(event.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>


                                <FormGroup row>
                                  <Label for="senha" sm={2}>
                                    Senha
                                  </Label>
                                  <Col sm={10}>
                                    <Input
                                      type="text"
                                      name="senha"
                                      id="senha"
                                      placeholder="senha"
                                      defaultValue={modelData.senha}
                                      onChange={(event) => {
                                        setNewSenha(event.target.value);
                                      }}
                                    />
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
                                  updateUser(
                                    modelId,
                                    user.nome,
                                    user.telefone,
                                    "",
                                    "",
                                    user.senha
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
                          deleteUser(user.id);
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
  );
}

export default ListaUsuarios;
