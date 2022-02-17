import React from 'react';
import './main.css';
import planet from '../img/catStar.png';
import rocket from '../img/rocket.png';
import { Link } from 'react-router-dom';


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
  
function Main() {
    var style = ["style1", "style2", "style3", "style4"];
    var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
    var widthWindow = window.innerWidth;
    var heightWindow = window.innerHeight;
    return (
        <div className="planet">
            <div className="constelacao">{
        Array(250).fill(0).map((_,index) => {
          return <span className={"estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
            + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
            style={{
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(0, heightWindow),
              opacity : [getRandomArbitrary(0, 6)]
          }}></span>
        })
      }</div> 
            <div className='head'>
                <div className='imgCon'>
                    <img src={planet}></img>
                    <br/>
                    <p className='welcome'> Welcome to ely-Cat </p>
                </div>
                <br/>
                <div className='des'>
                    You can keep memories with your cat as a shining star in the night sky.<br/>
                    Shine the stars with your own color. And be with other cat stars.
                </div>
                <br/>
                <div className='moveCon'>
                    <Link to="/stars" className='move'> 
                           >> Let's go see the stars <img className="rocket" src={rocket} ></img>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Main;