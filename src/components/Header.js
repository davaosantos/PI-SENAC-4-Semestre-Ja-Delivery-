import '../styles/home.css'
import { BrowserRouter, Routes, Route  , Link, useLocation} from 'react-router-dom';
import logoJaDelivery  from "../assets/pngtree-cartoon-delivery-staff_cb.png"
import { signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import cart from "../assets/imagens/cart-69-24.png";

const Header = (props) => {
    const navigate = useNavigate();
    const location = useLocation();


    console.log("HEADER -----------")
    console.log(location);
    console.log("PROPS -----------")
    console.log(props);

    const logoutUser = async () => {
        await auth.signOut();
        navigate('/')
      }

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
            state={{nome: props.user.nome, id: props.user.id, tipo_usuario : props.user.tipo_usuario}}
              src={logoJaDelivery}
              alt=""
              className="logoJaDelivery"
              height="45px"
              
            />
            </Link>
          </div>
       
          <li>
          <Link state={{nome: props.user.nome, id: props.user.id, tipo_usuario : props.user.tipo_usuario}}  to='/listaProdutos' href="#" className="nav-link px-2 text-white">
                  Lista Produtos
            </Link>
          </li>
          <li>
            <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}} to='/cadastroUsuario' href="#" className="nav-link px-2 text-white">
              Cadastrar Usuário
            </Link>
          </li>
          
          <li>
          <Link state={{nome: location.state.nome, id: location.state.id, tipo_usuario : location.state.tipo_usuario}} to='/listaUsuarios' className="nav-link px-2 text-white">
              Lista Usuários
            </Link>
          </li>

          <li>
          <Link to='/listaPedidos' className="nav-link px-2 text-white">
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
</>

    )
}

export default Header;