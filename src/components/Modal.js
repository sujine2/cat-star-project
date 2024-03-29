import { Modal } from "react-bootstrap";
import { address, _abi } from "../components/contract/contractInfo";
import React, { useEffect } from "react";
import "./Modal.css";
import loadingImg from "../img/loading-img.gif";
import $ from "jquery";
import styled from "styled-components";
import nonImg from "../img/non-img2.png";
import { klaytn, caver } from "../wallet/caver";

const ModalCustom = styled(Modal)`
  .modal-content {
    border-radius: 20px;
    padding: 0;
    width: 510px;
    height: 700px;
    box-shadow: 0px 0px 20px #${(props) => props.color && props.color};
  }

  .modal-body {
    overflow-x: hidden;
    overflow-y: hidden;
    max-width: 510px;
    padding: 0;
  }

  @media (min-width: 510px) {
    .modal-dialog-centered {
      min-height: calc(100% - 0.5rem);
    }
  }
  @media (min-width: 510px) {
    .modal-dialog {
      max-width: 510px;
      margin: 0 auto;
    }
  }
`;

const handleImgError = (e) => {
  e.target.src = nonImg;
  $(".showImg").css("margin-bottom", "0");
  $(".errorText").text("사진이 안 보인다냥 ㅠ_ㅠ");
};

function ViewModal(props) {
  const viewCatData = async () => {
    const id = props.tokenid;

    const contract = new caver.klay.Contract(_abi, address);
    const data = await contract.methods.getCatData(id).call();
    return data;
  };
  const [catData, setCatData] = React.useState([]);
  const [colorEffect, setColorEffect] = React.useState();
  let _id;

  useEffect(() => {
    if (props.tokenid !== "") {
      viewCatData().then((result) => {
        setCatData(result);
      });
    }
  }, [props.tokenid]);

  useEffect(() => {
    if (catData.length !== 0) {
      let tempColorValue = parseInt(catData.catColor).toString(16);
      while (tempColorValue.length !== 6) {
        tempColorValue = "0" + tempColorValue;
      }
      setColorEffect(tempColorValue);
    }
    let tmp = catData.catName;

    if (String(tmp).length > 7) {
      $(".infoTitle").css("font-size", "22px");
    }
    tmp = catData.favorite;
    if (String(tmp).length > 18) {
      $(".catInfo").css("font-size", "15px");
    }
  }, [catData]);

  return (
    <ModalCustom
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      color={colorEffect}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="infoTitle">
            {props.tokenid} 번째 {catData.catName} 별
          </div>

          <div className="infoColor">
            <button
              className="printColor"
              style={{
                backgroundColor: "#" + colorEffect,
                border: 0,
                outline: 0,
                width: 10,
                cursor: "default",
                marginRight: 15,
                float: "left",
              }}
            ></button>
            #{colorEffect}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ position: "relative" }}>
          <img className="showImg" src={loadingImg} onError={handleImgError} />
          <div
            style={{ position: "absolute", top: 320, left: 150 }}
            className="errorText"
          ></div>
        </div>

        {
          ((_id = catData.imgURL),
          _id && ((_id = _id.split("/")), (_id = _id[5]), ""))
        }

        {
          ($(".showImg").attr(
            "src",
            "https://drive.google.com/uc?export=view&id=" + _id
          ),
          $(".showImg").css("marginLeft", ""),
          $(".showImg").css("marginTop", ""),
          (_id = false))
        }

        <div style={{ marginRight: 20, marginLeft: 13 }}>
          <div className="catInfo">
            <div
              style={{
                float: "left",
                marginLeft: 20,
                marginRight: 50,
              }}
            >
              소유자 : {catData.yourName}
            </div>
            <div style={{ float: "left" }}>
              좋아하는 것 : {catData.favorite}
            </div>
          </div>
          <div className="dataComment" style={{ padding: 10 }}>
            {catData.comment}
          </div>
          <div
            className="day"
            style={{ float: "right", marginRight: 10, padding: 10 }}
          >
            {catData.metDay}
          </div>
        </div>
      </Modal.Body>
    </ModalCustom>
  );
}

export default ViewModal;
