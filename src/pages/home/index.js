import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"

export default function Home(){
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
            <img
              src={logoJaDelivery}
              alt=""
              className="logoJaDelivery"
              height="45px"
            />
          </div>
          <li>
            <Link to='/cadastroProduto' className="nav-link px-2 text-white">
              Cadastro Produto
            </Link>
          </li>
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
            <a href="#" className="nav-link px-2 text-white">
              Carrinho
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 text-white">
              Lista Usuários
            </a>
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
          <Link to='/' type="button" className="btn btn-warning">
            logout
          </Link>
        </div>
      </div>
    </div>
  </header>
  <footer>
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2022 Delivery, JáDelivery</p>
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