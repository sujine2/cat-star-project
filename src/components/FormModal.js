import { Modal,Button} from "react-bootstrap";
import React, {useEffect} from 'react';
import './FormModal.css';
import {address, abi} from '../components/contract/contractInfo';
import { ethers } from "ethers";
import RGBtoHex from "./RGBtoHex";
import $ from 'jquery';
import { klaytn,caver } from '../wallet/caver';
import Caver from "caver-js";


function componentToHex(c) {
  if(c!= undefined){
    var hex = parseInt(c,10).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}



function FormModal(props) {
  const [inputs, setInputs] = React.useState({
    catName: '',
    yourName: '',
    dayMet: '',
    favorite: '',
    comment: '',
    imgURL: ''

  });

  const {catName, yourName, dayMet, favorite, comment, imgURL} = inputs;
  const [colors, setColors] = React.useState([]);
  const [colorValue, setColorValue] = React.useState();
  const [colorDup, setColorDup] = React.useState(true);


  useEffect(() => {
    const f = async () => {
      const result = await viewColor();

      if(result){

      setColors(result);
      const tempColorValue = "#"+ componentToHex(result.R) + componentToHex(result.G) + componentToHex(result.B);
      setColorValue(tempColorValue);
      }
    }
    f();
    
  }, []);


  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  }

  

  const hexToRGB = (_findColor) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_findColor);
    return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16)
    } : null
  }

  const findColor = async (_findColor) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const colorIndex = ethers.utils.keccak256(abiCoder.encode(["uint","uint","uint"], [_findColor.R, _findColor.G, _findColor.B]));
    const contract = new caver.klay.Contract(abi, address);
    const colorOwner = await contract.methods.whoColorOf(colorIndex).call();
    //console.log(colorOwner);
    if(colorOwner == 0x0) {
      setColorDup(true);
    }else {
      setColorDup(false);
    }
  }


  const viewColor = async () => {
    if(klaytn == undefined){
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      const contract = new _caver.klay.Contract(abi,address);
      const color = await contract.methods.getColor().call();
      return color;
    }
    else {
      const contract = new caver.klay.Contract(abi, address);
      const color = await contract.methods.getColor().call();
      return color;
    }

  }

  setTimeout(function(){

    $('.changeColor').change(async function (){
      //console.log($('.printColor').val());
      setColorValue($('.changeColor').val());
      const rgbColor = await hexToRGB($('.changeColor').val());
      await findColor(rgbColor);

    })

  },500);

  useEffect(async ()=> {

    if(colorDup == false){
      $('.isColorDup').text('이미 사용된 컬러 입니다.',{colorDup});
    }else {
      $('.isColorDup').text('');
    }
  },[colorDup]);

  let tmp;
  let price;
  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
      <div className="modalTitle">
        Your Cat Star's Infos
      </div>
      <div className="currentColor"> 
        Current Color  :

        <button className="printColor" style={{
          backgroundColor: 'rgba('+ colors.R +','+ colors.G +',' + colors.B + ')',
          border: 0,
          outline: 0,
          width: 10
          }}></button> 
        <RGBtoHex className="hexColor" R={colors.R} G={colors.G} B={colors.B}></RGBtoHex>
          
        <div>
          <input type="checkbox" className="changeColorCheck" onClick={()=> controlColor()} /> 
          <label htmlFor="changeColorCheck" style={{
            fontSize: 15,
            marginLeft: 10,
            color: "gray"
          }}>컬러 바꾸기  1 Klay</label>
        </div>

        <div className="changeColorCon">
          <input className="changeColor" type="color" defaultValue={colorValue}></input>
          <span className="printColorValue" >{colorValue}</span>
          <span style={{
            marginLeft : 15, 
            color: "red",
            fontSize: 12
          }} className="isColorDup"></span>
          {
          tmp = hexToRGB(colorValue),
          tmp && (<></>)}
        </div>
          
      </div>
        
      
      </Modal.Header>
      <Modal.Body>
          <div className="formModalBody">
            <div className="catInfoForm">

              <h4>Cat's name  </h4>
              <input className="inputData" name="catName" type="text" style={{width: 400}} onChange={onChange}   value={catName}   required="required" />
              <br /><br />
              <h4>Your Name  </h4>
              <input className="inputData" name="yourName" type="text" style={{width: 400}} onChange={onChange}   value={yourName}   required="required" />
              <br /><br />
              <h4>The day I met a cat  </h4>
              <input className="inputData" name="dayMet" type="number" placeholder="ex)20210510" style={{width: 400}} onChange={onChange}   value={dayMet}    required="required"/>
              <br /><br />
              <h4>What my cat likes </h4>
              <input className="inputData" name="favorite" type="text" style={{width: 400}} onChange={onChange}  value={favorite}   required="required" />
              <br /><br />
              <h4>Comment  </h4>
              <input className="inputData" name="comment" type="text" style={{width: 400}} onChange={onChange}  value={comment}   required="required" />
              <br /><br />
              <h4>Image Link  </h4>
              <input className="inputData" name="imgURL" type="text" placeholder="google dirve **전체 공유 링크를** 넣어주세요!" style={{width: 400}}
              onChange={onChange}  value={imgURL} required="required"/>
              <br /><br />
            </div>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={async()=> {
          console.log('Dup',colorDup, $('.changeColorCheck').is(':checked'));
          if(colorDup === false && $('.changeColorCheck').is(':checked')){
            alert('이미 사용된 컬러 입니다. 색상을 변경해 주세요.'); 
          }else if(catName === '' || yourName === '' || comment === '' || favorite === '' || dayMet === ''){
            alert('입력란을 모두 채워주세요.');
          } else {
            if (klaytn === undefined) {
              alert('Non-Kaikas browser detected. You should consider trying Kaikas!');
            }else {
              if(klaytn.selectedAddress === undefined ){
                await klaytn.enable();
              }
              const contract = new caver.klay.Contract(abi,address);
              if($('.changeColorCheck').is(':checked')){
                tmp && (
                price = await contract.methods.getMintPrice().call(),
                console.log('price',price),
                contract.methods.mint(catName,yourName,comment,favorite,parseInt(dayMet),imgURL,tmp.R,tmp.G,tmp.B).send({
                  from: klaytn.selectedAddress,
                  gas: 1500000,
                  value : caver.utils.toPeb(price, 'KLAY'),
                })).then(function(receipt){
                  console.log(receipt);
                  window.location.reload();
                });
              } else {
                contract.methods.mint(catName,yourName,comment,favorite,parseInt(dayMet),imgURL,-1,-1,-1).send({
                from: klaytn.selectedAddress,
                gas: 1500000
              }).then(function(receipt){
                console.log(receipt);
                window.location.reload();
              });
            }
          }
           
        } }}>Make a star</Button>
      </Modal.Footer>
    </Modal>
  );
}


function controlColor(){
  if($('.changeColorCheck').is(':checked')){
    $('.changeColorCon').show();
  }else {
    $('.changeColorCon').hide();
  }
}


export default FormModal;
  

