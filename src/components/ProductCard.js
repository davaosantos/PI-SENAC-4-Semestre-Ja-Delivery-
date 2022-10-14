import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardImg} from 'react-bootstrap';
import  '../styles/productSlider.css'
import { Link, useLocation } from "react-router-dom";
import Detalhes from "../pages/detalhes/detalhes";
import { MDBModal } from "mdb-react-ui-kit";


const ProductCard = props => {
    const location = useLocation();
    const data = location.state?.data;

    const openModal = () =>{
        toggleShow();
    }

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
  

    let{imgSrc, price, title, description, avaliation} = props.data;

    return (
        

        <Card className="p-0 overflow-hidden h-100 shadow cardProduct" >
            <div className="overflow-hidden rounded p-0 bg-light" >
                <Card.Img variant="top" src={imgSrc} height="115px" />
                
            </div>
            <Card.Body className = "text-center cardContent">
                <Card.Title className="display-6 cardPreco">{price}</Card.Title>
                <Card.Title className="cardTitulo">{title}</Card.Title>
                <Link to="/detalhes" state={{props}} >
                    <Button className="w-100 rounded-0 variant='success' buttonCardDetail" onClick={() => openModal()} >Detalhes</Button>
                </Link>
            </Card.Body>
            <Button className="w-100 rounded-0 variant='success' buttonCardProduct">Adicionar ao carrinho</Button>
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