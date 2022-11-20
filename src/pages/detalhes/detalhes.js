import '../../styles/home.css'
import { BrowserRouter, Routes, Route  , Link, useParams, useLocation, UNSAFE_LocationContext} from 'react-router-dom';
import logoJaDelivery  from "../../assets/pngtree-cartoon-delivery-staff_cb.png"
import { logout } from './../../firebase';
import facebook from "../../assets/facebook(1).png"
import instagram from "../../assets/instagram(1).png"
import twitter from "../../assets/twitter(1).png"
import {Row, Col} from 'antd';



import Header from './../../components/Header';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import HeaderCliente from '../../components/HeaderCliente';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Detalhes = props =>{
  const location = useLocation();
  console.log(props, "props");
  console.log(location, "useLocationHook")
  const data = location.state.props.data;

  const {type} = useParams();
  const stateParamVal = useLocation().state.stateParam;
  
    return(
        <>
  <HeaderCliente/>
  
  <section className='productDetailSection'>
  <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 300, height: 300 }}>
            <Img alt="complex" src={data.imgSrc} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm >
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {data.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <p>Descrição:</p>
                {data.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span>Avaliação:{data.avaliation}</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
                {data.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </section>

        


  <footer className="footer-principal">
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

export default Detalhes;