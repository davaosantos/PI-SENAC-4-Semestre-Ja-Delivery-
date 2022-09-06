import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoJaDelivery  from "./assets/pngtree-cartoon-delivery-staff_cb.png"


function App() {

  return (
    <div className="wrapper">
  <div className="logo">
    <img src={logoJaDelivery} alt="" />
  </div>
  <div className="text-center mt-4 name jaDeliveryTexto">Já Delivery</div>
  <form className="p-3 mt-3">
    <div className="form-field d-flex align-items-center">
      <span className="far fa-user" />
      <input type="text"  name="emailRef" id="emailRef" placeholder="Email" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-key" />
      <input type="password"  name="password" id="pwd" placeholder="Password" />
    </div>
    <button className="btn mt-3">Login</button>
  </form>
  <div className="text-center fs-6">
    
   <a href="#">Forget password?</a> or <a href="#">Sign up</a>
  </div>
</div>

  );
}

export default App;
