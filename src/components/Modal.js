import { Modal} from "react-bootstrap";
import {address, abi} from '../components/contract/contractInfo';
import React, {useEffect} from 'react';
import Caver from "caver-js";
import './Modal.css';
import loadingImg from '../img/loading-img.gif';
import $ from 'jquery';
import styled from 'styled-components';
import { klaytn, caver } from "../wallet/caver";

const ModalCustom = styled(Modal)`
   
.modal-content{
  box-shadow: 0px 0px 30px #${(props) => props.color && props.color};
}
`;



function ViewModal(props) {
 
  const viewCatData = async () => {
    const id = props.tokenid;
    if(klaytn == undefined){
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      const contract = new _caver.klay.Contract(abi,address);
      const data = await contract.methods.getCatData(id).call();
      return data;
      
    }else {
      const contract = new caver.klay.Contract(abi, address);
      const data = await contract.methods.getCatData(id).call();
      return data;
    }
  }

  const [catData, setCatData] = React.useState([]);
  const [colorEffect, setColorEffect] = React.useState();
  let _id;


  useEffect(async () => {
      if (props.tokenid !== '') {
        const result = await viewCatData();
        setCatData(result);
      }
  
  }, [props.tokenid]); 
 

  useEffect(async ()=> {

    if(catData.length != 0){
      const tempColorValue = catData.catColor;
      setColorEffect(tempColorValue);
    }
  },[catData])

  return (
      <ModalCustom
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      color={colorEffect}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{
          fontSize: 33
        }}>
      
        <div className='infoTitle'style={{ float: "left"}}>
        {props.tokenid} 'th {catData.catName} 별
        </div>
        
        <div className='infoColor' style={{ marginLeft: 600, loat: "left"}}>
          #{colorEffect}
        </div>
          
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='catInfo'>
          <br/>
          <h4> 별 소유자 : {catData.yourName}</h4>
          <br/>
          <h4>  만난 날 : {catData.metDay}</h4>
          <br/>
          <h4> 좋아하는 것 : {catData.favorite}</h4>
          <br/><br/>
          <div className="dataComment" >
            {catData.comment}
          </div>
          <br/>
        </div>
        <div className="dataImg">
        <img className='showImg'style={{
            }} src={loadingImg}/>

          {
            _id = catData.imgURL,
            _id && (
            _id = _id.split('/'),
            _id = _id[5],''
          )}
          
         {
            $('.showImg').attr('src', "https://drive.google.com/uc?export=view&id="+ _id ),
            $('.showImg').css('marginLeft','' ),
            $('.showImg').css('marginTop','' ),
           _id=false

         }
        </div>

      </Modal.Body>
     
    </ModalCustom>
  );
}



export default ViewModal;
  

