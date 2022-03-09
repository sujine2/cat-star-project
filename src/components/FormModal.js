import { Modal, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import styled from "styled-components";
import "./FormModal.css";
import { address, abi } from "../components/contract/contractInfo";
import $ from "jquery";
import { klaytn, caver } from "../wallet/caver";
import Caver from "caver-js";

const ModalCustomFrom = styled(Modal)`
  .modal-content {
    box-shadow: "";
    border-radius: 20px;
    width: auto;
    opacity: 0.96;
    padding: 10px;
  }
  .modal-body {
    margin: 0 auto;
    width: auto;
  }
  @media (min-width: 652px) {
    .modal-dialog-centered {
      min-height: calc(100% - 0.5rem);
    }
  }
  @media (min-width: 652px) {
    .modal-dialog {
      max-width: 652px;
      margin: 0 auto;
    }
  }
`;

function FormModal(props) {
  const [inputs, setInputs] = React.useState({
    catName: "",
    yourName: "",
    dayMet: "",
    favorite: "",
    comment: "",
    imgURL: "",
  });

  const { catName, yourName, dayMet, favorite, comment, imgURL } = inputs;
  const [colors, setColors] = React.useState([]);
  const [changeColor, setChangeColor] = React.useState();
  const [colorDup, setColorDup] = React.useState(true);
  const [account, setAccount] = React.useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const findColor = async (_findColor) => {
    const contract = new caver.klay.Contract(abi, address);
    const colorOwner = await contract.methods
      .getWhoColor(parseInt(_findColor, 16))
      .call();
    if (colorOwner == 0x0) {
      setColorDup(true);
    } else {
      setColorDup(false);
    }
  };

  const getColor = async () => {
    const contract = new caver.klay.Contract(abi, address);
    let color = await contract.methods.color().call();
    return parseInt(color).toString(16);
  };

  setTimeout(function () {
    let change;
    $(".changeColor").change(async function () {
      change = $(".changeColor").val().substr(1);
      setChangeColor(change);
      await findColor(change);
    });
  }, 500);

  useEffect(() => {
    getColor().then((result) => {
      if (result) {
        const tempColorValue = result;
        setColors(result);
        setChangeColor(tempColorValue);
      }
    });
  }, []);

  useEffect(() => {
    if (colorDup === false) {
      $(".isColorDup").text("이미 사용된 컬러 입니다.", { colorDup });
    } else {
      $(".isColorDup").text("");
    }
  }, [colorDup]);

  useEffect(async () => {
    if (klaytn !== undefined) {
      setAccount(klaytn.selectedAddress);
      klaytn.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
      });
    }
    console.log(account);
  }, []);
  let price;
  let changeTmp;
  return (
    <ModalCustomFrom
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="asdklf" closeButton>
        <div className="modalTitle">고양이 별 정보</div>
        <div style={{ width: 100, float: "right", marginLeft: 70 }}>
          <button
            className="walletConnect"
            onClick={async () => {
              if (klaytn === undefined) {
                alert("카이카스 지갑을 설치해 주세요!");
              } else {
                const accounts = await klaytn.enable();
                setAccount(accounts[0]);
              }
            }}
          >
            지갑 연결하기
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="formModalBody">
          <div className="catInfoForm">
            <br />
            <div style={{ float: "left", width: 140, fontSize: 50 }}>
              <h4>별 이름 </h4>
              <h4>별 주인 </h4>
              <h4>만난 날 </h4>
              <h4>좋아하는 것 </h4>
              <h4>메모 </h4>
              <h4>이미지 링크 </h4>
            </div>
            <div style={{ float: "left", width: "auto" }}>
              <input
                className="inputData"
                name="catName"
                type="text"
                style={{ width: 400 }}
                onChange={onChange}
                value={catName}
                required="required"
              />{" "}
              <br />
              <input
                className="inputData"
                name="yourName"
                type="text"
                style={{ width: 400 }}
                onChange={onChange}
                value={yourName}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="dayMet"
                type="number"
                placeholder="ex)20210510"
                style={{ width: 400 }}
                onChange={onChange}
                value={dayMet}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="favorite"
                type="text"
                style={{ width: 400 }}
                onChange={onChange}
                value={favorite}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="comment"
                type="text"
                style={{ width: 400 }}
                onChange={onChange}
                value={comment}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="imgURL"
                type="text"
                placeholder="구글 드라이브 **전체 공유 링크를** 넣어주세요!"
                style={{ width: 400 }}
                onChange={onChange}
                value={imgURL}
                required="required"
              />
            </div>
            <br />
            <div className="currentColor" style={{ width: 600 }}>
              <div
                style={{
                  float: "left",
                  width: 105,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                현재 별 색상 :
              </div>

              <button
                className="printColor"
                style={{
                  backgroundColor: "#" + colors,
                  border: 0,
                  outline: 0,
                  width: 10,
                  cursor: "default",
                  marginRight: 30,
                  float: "left",
                }}
              ></button>
              <div
                className="printColorValue"
                style={{ float: "left", marginRight: 170 }}
              >
                #{colors}
              </div>

              <div style={{ float: "left", width: 150 }}>
                <input
                  type="checkbox"
                  className="changeColorCheck"
                  onClick={() => controlColor()}
                />
                <label
                  htmlFor="changeColorCheck"
                  style={{
                    fontSize: 15,
                    marginLeft: 10,
                    color: "gray",
                  }}
                >
                  컬러 바꾸기 1 Klay
                </label>
                <div className="changeColorCon">
                  <input
                    className="changeColor"
                    type="color"
                    defaultValue={"#" + changeColor}
                  ></input>
                  <span className="printColorValue">#{changeColor}</span>
                  <br />
                  <span
                    style={{
                      marginLeft: 15,
                      color: "red",
                      fontSize: 12,
                    }}
                    className="isColorDup"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <br />

      <Modal.Footer>
        <Button
          onClick={async () => {
            if (colorDup === false && $(".changeColorCheck").is(":checked")) {
              alert("이미 사용된 컬러 입니다. 색상을 변경해 주세요.");
            } else if (
              catName === "" ||
              yourName === "" ||
              comment === "" ||
              favorite === "" ||
              dayMet === "" ||
              imgURL === ""
            ) {
              alert("입력란을 모두 채워주세요.");
            } else {
              if (klaytn === undefined) {
                alert("카이카스 지갑을 설치해 주세요!");
              } else {
                if (
                  (await klaytn._kaikas.isUnlocked()) === false ||
                  klaytn.selectedAddress === undefined
                ) {
                  alert("지갑을 연결해주세요!");
                } else {
                  //setAccount(klaytn.selectedAddress);
                  const _caver = new Caver(window.klaytn);
                  const contract = new _caver.klay.Contract(abi, address);

                  if ($(".changeColorCheck").is(":checked")) {
                    price = await contract.methods.getMintPrice().call();
                    changeTmp = parseInt(changeColor, 16);
                    await contract.methods
                      .mint(
                        catName,
                        yourName,
                        comment,
                        favorite,
                        imgURL,
                        changeTmp,
                        parseInt(dayMet),
                        true
                      )
                      .send({
                        from: account,
                        gas: 1500000,
                        value: caver.utils.toPeb(price, "KLAY"),
                      })
                      .then(function (receipt) {
                        window.location.reload();
                      });
                  } else {
                    await contract.methods
                      .mint(
                        catName,
                        yourName,
                        comment,
                        favorite,
                        imgURL,
                        0,
                        parseInt(dayMet),
                        false
                      )
                      .send({
                        from: account,
                        gas: 1500000,
                      })
                      .then(function (receipt) {
                        window.location.reload();
                      });
                  }
                }
              }
            }
          }}
        >
          별 만들기
        </Button>
      </Modal.Footer>
    </ModalCustomFrom>
  );
}

function controlColor() {
  if ($(".changeColorCheck").is(":checked")) {
    $(".changeColorCon").show();
  } else {
    $(".changeColorCon").hide();
  }
}

export default FormModal;
