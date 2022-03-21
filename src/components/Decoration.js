import line from "../img/line.png";
import star from "../img/star.png";
import React, { useEffect } from "react";
import circle from "../img/circle.png";
import { address, _abi } from "../components/contract/contractInfo";
import { klaytn, caver } from "../wallet/caver";
import "./Decoration.css";
import $ from "jquery";

function Decoration(props) {
  const [idColor, setidColor] = React.useState("");

  async function getIdColor() {
    const id = props.id;

    const contract = new caver.klay.Contract(_abi, address);
    const data = await contract.methods.getCatData(id).call();
    let tempColorValue = parseInt(data.catColor).toString(16);
    while (tempColorValue.length !== 6) {
      tempColorValue = "0" + tempColorValue;
    }
    setidColor(tempColorValue);
  }

  useEffect(() => {
    getIdColor();
    $(".starColor1").css("fill", "#" + idColor);
    $(".starColor1").css(
      "filter",
      "drop-shadow(0px 0px 10px" + "#" + idColor + ")"
    );
    $(".starColor2").css("fill", "#" + idColor);
    $(".starColor2").css(
      "filter",
      "drop-shadow(0px 0px 10px" + "#" + idColor + ")"
    );
  });

  return (
    <>
      {!props.showDeco ? (
        <div />
      ) : (
        <div>
          <img className="string1" src={line}></img>
          <img className="string2" src={line}></img>

          <div>
            <svg className="starColor1" viewBox="0 0 600 600" width="100">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </div>

          <div>
            <svg className="starColor2" viewBox="0 0 600 600" width="100">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default Decoration;
