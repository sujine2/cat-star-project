
import React from 'react';
import './Meteoro.css';


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function carregarMeteoro(){
  var numeroAleatorio = 1000;
  var style = ["style1", "style2", "style3", "style4"];

  setTimeout(function(){
      meteoro();
  }, numeroAleatorio);

  function meteoro(){
    setTimeout(meteoro, numeroAleatorio);

    var meteoro = "<div class='meteoro "+ style[getRandomArbitrary(0, 4)] +"'></div>";

    document.getElementsByClassName('chuvaMeteoro')[0].innerHTML = meteoro;

    setTimeout(function(){
      document.getElementsByClassName('chuvaMeteoro')[0].innerHTML = "";
    }, 400);
  }




    return (
        <div className="chuvaMeteoro">

        {/* {   
            Array(true).fill(0).map((_,index) => {
                function getRandomArbitrary(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }
              return <div className={"meteoro "+ style[getRandomArbitrary(0, 4)]} style={{
                left: getRandomArbitrary(0, widthWindow),
                top: getRandomArbitrary(500, heightWindow)
              }}></div>
            })
        } */}
        </div>
        
        
    );
}



export default carregarMeteoro;