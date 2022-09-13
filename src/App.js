import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoJaDelivery  from "./assets/pngtree-cartoon-delivery-staff_cb.png"
import { auth } from "./firebase";
import { useNavigate } from 'react-router';



function App() {

    let navigate = useNavigate();


    const [newEmail, setNewEmail]= useState("");
    const [newSenha, setNewSenha]= useState("");
    const [error, setError]= useState("");

    const loginUser = async () => {
      await signInWithEmailAndPassword(auth, newEmail, newSenha)
      .then((auth) => {navigate('/home')} )
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
    
   <a href="#">Forget password?</a> or <a href="#">Sign up</a>
  </div>
</div>

  );
}

export default App;
