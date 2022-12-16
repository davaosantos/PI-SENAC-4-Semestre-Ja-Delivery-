import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoJaDelivery  from "./assets/pngtree-cartoon-delivery-staff_cb.png"
import { auth, db } from "./firebase";
import { useNavigate } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';



function App() {

    let navigate = useNavigate();


    const [newEmail, setNewEmail]= useState("");
    const [newSenha, setNewSenha]= useState("");
    const [error, setError]= useState("");

    const [users, setUsers] = useState([]);
    const [clientes, setClientes] = useState([]);


    const usersCollectionRef = collection(db, "users");
    const clientesCollectionRef = collection(db, "clientes");

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          console.log(data);
          console.log("teste");
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
      }, []);
    
      useEffect(() => {
        const getClientes = async () => {
          const data = await getDocs(clientesCollectionRef);
          console.log(data);
          console.log("teste");
          setClientes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getClientes();
      }, []);

    const loginUser = async () => {
      await signInWithEmailAndPassword(auth, newEmail, newSenha)
      .then((auth) => {        

        let tipoUsuario = "";

            //Itera o banco para verificar se o email já existe
          for(const user of users){
            if(user.email == newEmail){
              tipoUsuario = "usuario"
              let userName = user.nome;
              let userId = user.id;
              let userType = user.tipo_usuario;

              console.log(userName);

              navigate('/home', {
                state: {
                  nome : userName,
                  id : userId,
                  tipo_usuario : userType
                }
              })
            }
          };

          for(const cliente of clientes){
            if(cliente.email == newEmail ){
              tipoUsuario = "cliente"
              let clienteName = cliente.nome;
              let clienteId = cliente.id;
              let clienteType = cliente.tipo_usuario;

              navigate('/homeCliente', {
                state: {
                  nome : clienteName,
                  id : cliente.id,
                  tipo_usuario : "cliente",
                  endereco:cliente.endereco
                }
              })
            }
          };

          console.log(tipoUsuario);

          

        
      } )
      .catch((err) => setError(err.message))
    }

  return (
    <div className="wrapper">
  <div className="logo">
    <img src={logoJaDelivery} alt="" />
  </div>
  <div className="text-center mt-4 name jaDeliveryTexto">Já Delivery</div>
  {error && <p className="errorLogin">{error}</p>}
  <form className="p-3 mt-3">
    <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input type="text"  name="emailRef" id="emailRef" placeholder="Email"
      onChange={(event) => setNewEmail(event.target.value)} />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-key" />
      <input type="password"  name="password" id="pwd" placeholder="Password"
      onChange={(event) => setNewSenha(event.target.value)} />
    </div>
    <Button onClick={loginUser}>
    Login
  </Button>
  </form>
  <div className="text-center fs-6">
    
   <a href="#">Forget password?</a> or <Link to='/cadastroCliente'>Sign up</Link>
  </div>
</div>

  );
}

export default App;
