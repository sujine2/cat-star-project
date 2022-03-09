import React from "react";
import "./Meteoro.css";

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let style = ["style1", "style2", "style3", "style4"];
let numeroAleatorio = 50000;

function meteoro() {
  setTimeout(function () {
    meteoro();
  }, numeroAleatorio);
  var meteoro =
    "<div className='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";

  setTimeout(meteoro, numeroAleatorio);
  document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;

  setTimeout(function () {
    document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
  }, 400);
}

function carregarMeteoro() {
  return <div className={"meteoro " + style[getRandomArbitrary(0, 4)]}></div>;
}

export default carregarMeteoro;
