import React from "react";
import "./Meteoro.css";

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function carregarMeteoro() {
  var numeroAleatorio = 1000;
  var style = ["style1", "style2", "style3", "style4"];

  function meteoro() {
    var meteoro =
      "<div class='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";

    setTimeout(meteoro, numeroAleatorio);

    document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;

    setTimeout(function () {
      document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
    }, 400);
  }

  setTimeout(function () {
    meteoro();
  }, numeroAleatorio);

  return <div className="chuvaMeteoro"></div>;
}

export default carregarMeteoro;
