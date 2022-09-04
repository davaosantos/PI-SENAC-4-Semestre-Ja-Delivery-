import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoJaDelivery  from "./assets/pngtree-cartoon-delivery-staff_cb.png"


import { signup, login, logout, useAuth } from "./firebase";

function App() {

  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    // try {
      await signup(emailRef.current.value, passwordRef.current.value);
    // } catch {
      // alert("Error!");
    // }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div className="wrapper">
  <div className="logo">
    <img src={logoJaDelivery} alt="" />
  </div>
  <div className="text-center mt-4 name jaDeliveryTexto">Já Delivery</div>
  <form className="p-3 mt-3">
    <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input type="text" ref={emailRef} name="emailRef" id="emailRef" placeholder="Email" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-key" />
      <input type="password" ref={passwordRef} name="password" id="pwd" placeholder="Password" />
    </div>
    <button className="btn mt-3" disabled={ loading || currentUser } onClick={handleLogin}>Login</button>
  </form>
  <div className="text-center fs-6">
    
   <a href="#">Forget password?</a> or <a href="#">Sign up</a>
  </div>
</div>

  );
}

export default App;
