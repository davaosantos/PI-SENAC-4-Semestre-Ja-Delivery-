import React, { useEffect, useState } from "react";
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from "swiper";
import 'swiper/css'
import 'swiper/css/free-mode'

import ProductCard from "./ProductCard";

import 'bootstrap/dist/css/bootstrap.min.css'

//Import images
import img1 from '../assets/imagens/beats.png'
import img2 from '../assets/imagens/absolut.png'
import img3 from '../assets/imagens/Brahma.png'
import img4 from '../assets/imagens/budweiser.png'
import img5 from '../assets/imagens/heineken.jpg'
import img6 from '../assets/imagens/smirnoff.jpg'
import img7 from '../assets/imagens/pitu.webp'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";



const ProductSlider = () => {
    
    //constante de produtos
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");
  const [nome , setNome] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
    console.log(products)
  
  }, []);

    return (
        <div className="container py-4 px-4 justify-content-center bg-dark"> 
            <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            className="mySwipper"
            breakpoints={{
                0:{
                    slidesPerView : 1,
                    spaceBetween:10,
                },
                480:{
                    slidesPerView : 2,
                    spaceBetween:10,
                },
                768:{
                    slidesPerView : 3,
                    spaceBetween:15,
                },
                1024:{
                    slidesPerView : 4,
                    spaceBetween:15,
                },
                1280:{
                    slidesPerView : 5,
                    spaceBetween:30,
                },
            }}
            >
    
                {products.map((product) => {
                    return(
                        <SwiperSlide>
                                <ProductCard data={{imgSrc: product.avatar, price:'R$' + product.preco, title:product.nome}}/>
                        </SwiperSlide>
                    );
                })}
                
               
            </Swiper>
        </div>
    );
}


export default ProductSlider;