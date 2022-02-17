import React, {useEffect} from 'react';
import './starView.css';
import ViewModal from '../components/Modal';
import Meteoro from '../components/Meteoro';
import plus from '../img/plus.png';
import FormModal from '../components/FormModal';
import Search from '../img/search.png';
import $ from 'jquery';
import {ethers} from 'ethers';
import {address, abi} from '../components/contract/contractInfo';
import { klaytn,caver } from '../components/wallet/caver';
import { InstallKaikas } from '../components/wallet/InstallKaikas';
import { ConnectKaikas } from '../components/wallet/ConnectKaikas.js';
import land from '../img/land.png';
import Caver from "caver-js";
import bgTree from '../img/bgTree .png';
import searchLoading from '../img/catStar.png';



global.Buffer = global.Buffer || require('buffer').Buffer;
var colorSearch=''

function setSearchBarShow() {
  if ($('.search-container').css('display') == 'block') {
    $('.search-container').css('display', 'none');
    if(colorSearch != ''){
      $('#'+colorSearch).css('width', '3px');
      $('#'+colorSearch).css('height', '3px');
      $('#'+colorSearch).css('background-color','white');
      colorSearch=''
    }

  } else {
    $('.search-container').css('display', 'block');
  }
}

function componentToHex(c) {
  if(c!= undefined){
    var hex = parseInt(c,10).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}






function StarView() {
  const [modalShow, setModalShow] = React.useState({ setShow: false,id: ''});
  const {setShow,id} = modalShow;
  const [account, setAccount] = React.useState('');
  const [formModalShow, setFormModalShow] = React.useState(false);
  const [viewStar, setViewStar] = React.useState(false);
  const [tokenID, setTokenID] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [test, setTest] = React.useState([
    {
      styleClass : "",
      inlineStyle :{ 
        animationDelay: "0s",
            left: 0,
            top: 0,
            opacity : 0,
      }
    }

  ]);


  if(klaytn != undefined){
    klaytn.on('accountsChanged', function(accounts) {
      console.log('change',accounts[0]);
      setAccount(accounts[0]);
    })
  }
  

  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  var widthWindow = window.innerWidth;
  var heightWindow = window.innerHeight;
  var owner;




  const getTokenNum = async () => {
    //const caver = new Caver(provider);
    if(klaytn == undefined){
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      const contract = new _caver.klay.Contract(abi,address);
      const TokenID = (await contract.methods.getTokenID().call());
      return TokenID;
    }else {
      const contract = new caver.klay.Contract(abi,address);
      const TokenID = (await contract.methods.getTokenID().call());
      return TokenID;
    }
  }

  const viewMyStar = async (_owner) => {

    if (klaytn === undefined) {
      alert('Non-Kaikas browser detected. You should consider trying Kaikas!');

    }else {
      if(klaytn.selectedAddress == undefined ){
        await klaytn.enable();
        setAccount(klaytn.selectedAddress);
      }
      const contract = new caver.klay.Contract(abi,address);
      const myStarList = await contract.methods.myStarOf(_owner).call();
      if(viewStar == false){
        setViewStar(true)
        for(var i in myStarList){
          //console.log('list',myStarList)
          //console.log('i : ',list[i]);
          var data = await contract.methods.catDataOf(myStarList[i]).call();
          $('#'+myStarList[i]).addClass('style5');
          $('#'+myStarList[i]).css('width', '20px');
          $('#'+myStarList[i]).css('height', '20px');
          $('#'+myStarList[i]).css('background-color',"#"+ componentToHex(data.catColor.R ) + componentToHex(data.catColor.G) + componentToHex(data.catColor.B));
          
          $('.myStar').css('opacity','100%');
          $('.myStar').css('text-shadow','0px 0px 8px white');
          
          $('.myStar').text('View My Star');
        } 
      } else if(viewStar == true) {
        setViewStar(false);
        for(var i in myStarList){
          //console.log('list',myStarList)
          //console.log('i : ',list[i]);
          $('#'+myStarList[i]).css('width', '2px');
          $('#'+myStarList[i]).css('height', '2px');
          $('#'+myStarList[i]).css('background-color','white');
          $('#'+myStarList[i]).removeClass('style5');
          $('.myStar').css('opacity','60%');
          $('.myStar').css('text-shadow','');
          $('.myStar').text('View My Star-Off');
        } 
      }
    }
      
    
  }


  const hexToRGB = (_findColor) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_findColor);
    return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16)
    } : null
  }

  const findColor = async (_findColor,_searchInputs) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const colorIndex = ethers.utils.keccak256(abiCoder.encode(["uint","uint","uint"], [_findColor.R, _findColor.G, _findColor.B]));
    let colorOwner;
    let contract;
    if(klaytn == undefined){
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      contract = new _caver.klay.Contract(abi,address);
      colorOwner = await contract.methods.whoColorOf(colorIndex).call();
    }else {
      contract = new caver.klay.Contract(abi,address);
      colorOwner = await contract.methods.whoColorOf(colorIndex).call();
    }
    console.log(colorOwner,typeof(parseInt(colorOwner,16).toString(16)));
    if(colorOwner == 0x0) {
      alert("It's not exist color code");
    }
    else {
      var tokenList = await contract.methods.myStarOf(colorOwner).call();
      for(var i in tokenList){
        var data = await contract.methods.catDataOf(tokenList[i]).call();
        //console.log(data);
        console.log(_findColor, data.catColor);
        if (data!=='' && (parseInt(data.catColor.R) === _findColor.R) && (parseInt(data.catColor.G) === _findColor.G) && (parseInt(data.catColor.B) === _findColor.B)){
          $('#'+tokenList[i]).addClass('style5');
          $('#'+tokenList[i]).css('width', '20px');
          $('#'+tokenList[i]).css('height', '20px');
          $('#'+tokenList[i]).css('background-color', _searchInputs);
          console.log('반목문 안 i',i);
          colorSearch = tokenList[i];
        }
      }
    }
    
  }

  const search = async() => {
    console.log('-----',colorSearch);

    if(colorSearch!=''){
      $('#'+colorSearch).removeClass('style5');
      $('#'+colorSearch).css('width', '3px');
      $('#'+colorSearch).css('height', '3px');
      $('#'+colorSearch).css('background-color','white');
    }

    $('.loading').css('display', 'block');
    var searchInputs = $('.search-bar').val();
    console.log(searchInputs);
    const hexTorgb = hexToRGB(searchInputs);
    console.log(hexTorgb);
    //console.log(hexTorgb.R);
    if(hexTorgb != null){
      await findColor(hexTorgb,searchInputs);
    }
    $('.loading').css('display', 'none');
  }


  const fff = () => {
    if(tokenID!= -1) {
      setTest(Array(200).fill(0).map(() => {
        return {
          styleClass : "view-estrela "+ style[getRandomArbitrary(0, 4)] + " "
          + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " ",
          
          inlineStyle :{ 
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(0, heightWindow),
              opacity : [getRandomArbitrary(0, 6)],
            }
        }
      }))
    }
  }



  useEffect(() => {
    const ff =async () => {
      console.log('??',klaytn.selectedAddress);
      if ( klaytn !=  undefined) {
        owner = await klaytn.enable();
        setAccount(klaytn.selectedAddress);
      }else {
        <InstallKaikas/>
      }
    }
    ff();
  }, [owner]);

  useEffect(() => {
    const f =async () => {
      const ID = await getTokenNum();
      console.log('view Token! : ', ID);
      setTokenID(parseInt(ID));
    }
    f().then(()=>{
      if(tokenID != -1){
        fff();
        setIsLoading(true);
      }  
    });
  }, [tokenID]);
  

  return (
    <>
      { 
        !isLoading ? (
          <div/>
        ) : (
          <div className="view-planet">
          <div className="view-constelacao">
            
            {
              //200
              (tokenID <= 200) && (
              Array(tokenID).fill(0).map((_, index) => {
                console.log(typeof tokenID)
                return (
                  <span id={index} 
                  className={test[index].styleClass} 
                  onClick={(e) => {
                    e.preventDefault();
                      setModalShow({
                        setShow: true,
                        id: index
                      });
                  }} 
                  style={test[index].inlineStyle}></span>
                )
              }))
            }
          
    
          {/* {
            //200
            Array(200).fill(0).map((_,index) => {
              return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
                + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
                style onClick={() => setModalShow(true)} 
                style={{
                  animationDelay: getRandomArbitrary(0, 9) + "s",
                  left: getRandomArbitrary(0, widthWindow),
                  top: getRandomArbitrary(0, heightWindow),
                  opacity : [getRandomArbitrary(0, 6)]
              }}></span>
            })
          } */}
          {/* {
            //80
            Array(80).fill(0).map((_,index) => {
              return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
                + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
                style onClick={() => setModalShow(true)} 
                style={{
                  animationDelay: getRandomArbitrary(0, 9) + "s",
                  left: getRandomArbitrary(0, widthWindow),
                  top: getRandomArbitrary(200, 300),
                  opacity : [getRandomArbitrary(0, 6)]
              }}></span>
            })
          }
          {
            //80
            Array(80).fill(0).map((_,index) => {
              return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
                + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
                style onClick={() => setModalShow(true)} 
                style={{
                  animationDelay: getRandomArbitrary(0, 9) + "s",
                  left: getRandomArbitrary(0, widthWindow),
                  top: getRandomArbitrary(400, 500),
                  opacity : [getRandomArbitrary(0, 6)]
              }}></span>
            })
          }     */}
       
          </div>
        <ViewModal
          show={setShow}
          onHide={() => setModalShow({
              setShow: false,
              id:''
            })}
            tokenid={id}/>
        <Meteoro/>
    
        <div className='floresta'>
          <img src={bgTree} alt="" />
          {/*https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png */}
        </div>
        {/* <div className="land">
          <img src={land} alt="" />
        </div> */}

        <div className='loading'>
          <img className='loadingImg' src={searchLoading}/>
          <p className='loadingText'>loading...</p>
        </div>
        

        <div className='form'>
          <img  src={plus} id='plusbtn' onClick={async() => { 
            if (klaytn === undefined) {
              alert('Non-Kaikas browser detected. You should consider trying Kaikas!');
            }else if(klaytn.selectedAddress == undefined ){
              await klaytn.enable();
              setAccount(klaytn.selectedAddress);
            }
        
            
            setFormModalShow(true)}} />
          <FormModal
          show={formModalShow}
          onHide={() => setFormModalShow(false)}/>
      
          <img className='search' onClick={(e) => {  
            e.preventDefault();
            setSearchBarShow()}
          } src={Search}/>
            
        </div>
  
        <div className="myStarCon"> 
          {
            (account !== '') && (
              <>
                <div className='myStar' onClick={()=> viewMyStar(account)}> 
                  View My Star-Off
                </div>
              </>
            )
          }
        </div>
  
          <form className="search-container">
            <input type="text" className="search-bar" placeholder="What is your color?"  />
            <a onClick={search}><img className="search-icon" src={Search}/></a>
          </form>
        </div>
        )
      }
    </>
   
  );
}


export default StarView;


