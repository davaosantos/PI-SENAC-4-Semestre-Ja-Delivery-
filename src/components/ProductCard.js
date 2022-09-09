import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardImg} from 'react-bootstrap';
import  '../styles/productSlider.css'


const ProductCard = props => {

    let{imgSrc, price, title} = props.data;

    return (
        <Card className="p-0 overflow-hidden h-100 shadow cardProduct" >
            <div className="overflow-hidden rounded p-0 bg-light" >
                <Card.Img variant="top" src={imgSrc} height="115px" /> 
            </div>
            <Card.Body className = "text-center cardContent">
                <Card.Title className="display-6 cardPreco">{price}</Card.Title>
                <Card.Title className="cardTitulo">{title}</Card.Title>
            </Card.Body>
            <Button className="w-100 rounded-0 variant='success' buttonCardProduct">Adicionar ao carrinho</Button>

        </Card>
    );
}

export default ProductCard;