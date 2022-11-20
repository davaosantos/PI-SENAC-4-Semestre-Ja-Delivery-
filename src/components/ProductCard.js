import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardImg} from 'react-bootstrap';
import  '../styles/productSlider.css'
import { Link, useLocation } from "react-router-dom";
import Detalhes from "../pages/detalhes/detalhes";
import { MDBModal } from "mdb-react-ui-kit";
import { db } from "../firebase";
import { collection } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { addDoc } from 'firebase/firestore';
import { useContext } from 'react'
import { ProductsContext } from './../global/ProductContext';
import { CartContext } from './../global/CartContext';



const ProductCard = props => {


    const cartRef = collection(db, "cart");
    const location = useLocation();
    const data = location.state?.data;
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState({});

    const openModal = () =>{
        toggleShow();
    }

    let Product;

    const buy = () => {
        
    }

    const addToCart = () => {
        Product = props.data;
        console.log(Product);
        Product['qty'] = 1;
        let price = Product.price;
        console.log(price);
        let total = Product.qty  * Product.price;
    
        console.log(product + "Clique");

        addDoc(cartRef, {id: props.data.id, price: props.data.price, nome: props.data.title, user_id: props.data.user_id}).then(() =>{
            console.log("adicionado ao carrinho")
        })

        let itemPedido = {
            id: props.data.id, price: props.data.price, nome: props.data.title, user_id: props.data.user_id
        }

        setCart(itemPedido);

        console.log(cart.nome + "CARRINHO");

        

        /*console.log(cartList.length + "ANTES DE ADD");

        cartList.push(itemPedido);

        console.log(cartList + "carrinho");
        let i = 0;

        Object.keys(cartList).forEach(function(element){
            console.log(element + "-" + cartList[element].nome + "SIZE" + cartList.length)
        });*/
       
    }


    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
  

    let{imgSrc, price, title, description, avaliation, qty, id} = props.data;

    return (
        

        <Card className="p-0 overflow-hidden h-100 shadow cardProduct" >
            <div className="overflow-hidden rounded p-0 bg-light" >
                <Card.Img variant="top" src={imgSrc} height="115px" />
                
            </div>
            <Card.Body className = "text-center cardContent">
                <Card.Title className="display-6 cardPreco">{price}R$</Card.Title>
                <Card.Title className="cardTitulo">{title}</Card.Title>
                <Link to="/detalhes" state={{props}} >
                    <Button className="w-100 rounded-0 variant='success' buttonCardDetail" onClick={() => openModal()} >Detalhes</Button>
                </Link>
            </Card.Body>
            <Button className="w-100 rounded-0 variant='success' buttonCardProduct" onClick={() => addToCart()}>Adicionar ao carrinho</Button>
            <MDBModal
        show={basicModal}
        setShow={setBasicModal}
        tabIndex="-1"
        >
        

        </MDBModal>
        </Card>
    
    );
}

export default ProductCard;