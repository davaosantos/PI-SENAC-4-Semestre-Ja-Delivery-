import "../../styles/home.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Label,
  Form,
  FormGroup,
  Input,
  FormText,
  Button,
  Col,
  Row,
} from "reactstrap";
import logoJaDelivery from "../../assets/pngtree-cartoon-delivery-staff_cb.png";
import facebook from "../../assets/facebook(1).png";
import instagram from "../../assets/instagram(1).png";
import twitter from "../../assets/twitter(1).png";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth, storage } from "./../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Header from "../../components/Header";
import Select from "react-select";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nomeProductSchema, productSchema, descricaoProductSchema } from './../../validations/ProductValidation';
import { Progress } from 'reactstrap';

export default function CadastroProduto() {
  //Array de produtos
  const [products, setProducts] = useState([]);

  //Constantes de erro
  const [errorDescricao, setErrorDesc] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorNulo, setErrorNulo] = useState("");

  //Faz o get dos produtos já cadastrados
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  //Valores dos inputs
  const [newNome, setNewNome] = useState("");
  const [newAvaliacao, setNewAvaliacao] = useState("");
  const [newDescricao, setNewDescricao] = useState("");
  const [newPreco, setNewPreco] = useState(0);
  const [newQuantidade, setNewQuantidade] = useState(0);
  const [newStatus, setNewStatus] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpload = (event) => {
    event.preventDefault(); // para nao recarregar a pag

    console.log(event.target[6]?.files[0]);
    const file = event.target[6]?.files[0]; // selecionar primeira imagem

    if (!file) return;

    const storageRef = ref(storage, `ìmages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };

  //Cria uma referencia para o banco
  const productsCollectionRef = collection(db, "products");

  //Cria os usuarios
  const createProducts = async () => {
    //Formulario para validação
    let formData = {
      nome: newNome,
      avaliacao: newAvaliacao,
      descricao: newDescricao,
      quantidade: newQuantidade,
      preco: newPreco,
      status: newStatus,
    };

    //Formulario para validação
    let nomeData = {
      nome: newNome
    };

    let descricaoData = {
      descricao: newDescricao
    };

    //Verifica se o formulário é valido
    const isValid = await productSchema.isValid(formData);

    const nomeValid = await nomeProductSchema.isValid(nomeData);

    const descricaoValid = await descricaoProductSchema.isValid(descricaoData);

    if(!nomeValid){
      setErrorNome("O nome do produto deve ter no minimo 1 e no maximo 200 caracteres")
    }

    if(!descricaoValid){
      setErrorDesc("A descricao deve ter no minimo 1 e no maximo 2000 caracteres")
    }

    if(isValid){
      //Se o formulario e o email forem validos
    await addDoc(productsCollectionRef, {
      nome: newNome,
      avaliacao: newAvaliacao,
      descricao: newDescricao,
      quantidade: newQuantidade,
      preco: newPreco,
      status: newStatus,
    });
    //signIn();
    alert("Produto cadastrado com sucesso");
    }else{
      setErrorNulo("Revise os valores do cadastro")
    }
    
    
  };

  return (
    <>
      <Header />

      <section className="FormUsuario">
        <Form onSubmit={handleUpload}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="nome">Nome do produto</Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Produto"
                  type="text"
                  onChange={(event) => {
                    setNewNome(event.target.value);
                  }}
                />
                {errorNome && <p className="errorNome">{errorNome}</p>}
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="avaliacao">Avaliação</Label>
                <Input
                  id="avaliacao"
                  name="avaliacao"
                  placeholder="Avaliacao"
                  type="select"
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
              </FormGroup>
            </Col>

            <FormGroup>
              <Label for="descricao">Descrição :</Label>
              <Input
                type="textarea"
                placeholder="Descrição"
                name="descricao"
                id="descricao"
                rows={2}
                onChange={(event) => {
                  setNewDescricao(event.target.value);
                }}
              />
              {errorDescricao && <p className="errorDescricao">{errorDescricao}</p>}
            </FormGroup>

            <Col md={6}>
              <FormGroup>
                <Label for="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  name="quantidade"
                  placeholder="Quantidade"
                  type="number"
                  onChange={(event) => {
                    setNewQuantidade(event.target.value);
                  }}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="preco">Valor</Label>
                <Input
                  id="preco"
                  name="preco"
                  placeholder="Preço"
                  type="number"
                  onChange={(event) => {
                    setNewPreco(event.target.value);
                  }}
                />
              </FormGroup>
            </Col>

            <Col sm={10}>
                <FormGroup>
                <Label for="status">Status do produto</Label>
              <Input
                id="status"
                name="status"
                type="select"
                onChange={(event) => {setNewStatus(event.target.value)}}
              >
                <option></option>
                <option>
                  Disponivel
                </option>
                <option>
                  Indisponivel
                </option>
              </Input>
              </FormGroup>
    </Col>

        <Label for="imagem">Imagem do produto</Label>
            <FormGroup className="formCarregaImagem">
              
              <Input  className="InputImagens" type="file" name="file" id="imgProduto"></Input>
              <br></br>
              <Button type="submit">Anexar</Button>
              <br></br>
              {!imgUrl && <Progress className="barraProgresso" value={progress} />}
               
            </FormGroup>
    
            {imgUrl && <img src={imgUrl} className='imgCarregada' alt="imagem" height={100} />}
          </Row>

          
          <br></br>
          <Button onClick={createProducts}>Cadastrar</Button>
          {errorNulo && <span className="errorNulo">{errorNulo}</span>}
          
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
