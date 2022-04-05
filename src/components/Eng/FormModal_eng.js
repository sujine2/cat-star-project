import { Modal, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import styled from "styled-components";
import "../FormModal.css";
import { address, _abi, _mintabi } from "../contract/contractInfo";
import $ from "jquery";
import { klaytn, caver } from "../../wallet/caver";
import Caver from "caver-js";
import { prepare, getResult } from "klip-sdk";
import Announcement from "./Announcement_eng";
import QRbuyModal from "./QRbuyModal_eng";
import QRCode from "qrcode";
import { Cookies } from "react-cookie";
import ViewModal from "../Modal";
import kaikas from "../../img/kaikas.png";
import klip from "../../img/Klip.png";

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
  @media (min-width: 580px) {
    .modal-dialog-centered {
      min-height: calc(100% - 0.5rem);
    }
  }
  @media (min-width: 580px) {
    .modal-dialog {
      max-width: 580px;
      margin: 0 auto;
    }
  }
`;

function FormModal(props) {
  const cookies = new Cookies();
  const [inputs, setInputs] = React.useState({
    catName: "",
    yourName: "",
    dayMet: "",
    favorite: "",
    comment: "",
    imgURL: "",
  });

  const [modalShow, setModalShow] = React.useState({ setShow: false, id: "" });
  const { setShow, id } = modalShow;
  const [QRbuyModalShow, setQRbuyModalShow] = React.useState(false);
  const [announceModalShow, setAnnounceModalShow] = React.useState(false);
  const { catName, yourName, dayMet, favorite, comment, imgURL } = inputs;
  const [colors, setColors] = React.useState([]);
  const [changeColor, setChangeColor] = React.useState();
  const [colorDup, setColorDup] = React.useState(true);
  const [account, setAccount] = React.useState("");
  const [QRurl, setQRurl] = React.useState("");
  const [buyKey, setBuyKey] = React.useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const findColor = async (_findColor) => {
    const contract = new caver.klay.Contract(_abi, address);
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
    const contract = new caver.klay.Contract(_abi, address);
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
      $(".isColorDup").text("This color has already been used.", { colorDup });
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
  }, []);

  let price;
  let changeTmp;
  let shouldView;

  return (
    <ModalCustomFrom
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        display: !modalShow.setShow ? "flex" : "none",
      }}
    >
      <Modal.Header id="closeForm" closeButton>
        <div className="modalTitle">Cat star Info</div>
      </Modal.Header>
      <Modal.Body>
        <div className="formModalBody">
          <div className="catInfoForm">
            <br />
            <div style={{ float: "left", width: 140, fontSize: 50 }}>
              <h4>Cat Name </h4>
              <h4>Owner Name </h4>
              <h4 style={{ marginLeft: 0 }}>The day we met </h4>
              <h4 style={{ marginLeft: 0 }}>Favorite Things</h4>
              <h4>Comment </h4>
              <h4>
                Image Link
                <h1
                  onClick={() => {
                    setAnnounceModalShow(true);
                  }}
                  style={{ fontSize: 15, cursor: "pointer" }}
                >
                  (&#128680;Caution)
                </h1>
                <Announcement
                  show={announceModalShow}
                  onHide={() => setAnnounceModalShow(false)}
                />
              </h4>
            </div>
            <div style={{ float: "left", width: "auto" }}>
              <input
                className="inputData"
                name="catName"
                type="text"
                style={{ width: 350 }}
                onChange={onChange}
                value={catName}
                required="required"
              />{" "}
              <br />
              <input
                className="inputData"
                name="yourName"
                type="text"
                style={{ width: 350 }}
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
                style={{ width: 350 }}
                onChange={onChange}
                value={dayMet}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="favorite"
                type="text"
                style={{ width: 350 }}
                onChange={onChange}
                value={favorite}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="comment"
                type="text"
                style={{ width: 350 }}
                onChange={onChange}
                value={comment}
                required="required"
              />
              <br />
              <input
                className="inputData"
                name="imgURL"
                type="text"
                placeholder="Please add to Google Drive links ** for all Internet users **"
                style={{ width: 350 }}
                onChange={onChange}
                value={imgURL}
                required="required"
              />
            </div>
            <div
              className="formGuide"
              style={{
                float: "right",
                marginRight: 45,
                textDecoration: "none",
                color: "white",
              }}
            >
              <a
                target="_blank"
                href="https://wiry-ruby-135.notion.site/Cat-Planet-Guide-English-c23f9304fdb14f2a942f970cf941f995"
              >
                View Usage Guide
              </a>
            </div>

            <br />
            <div className="currentColor" style={{ width: 528 }}>
              <div
                style={{
                  float: "left",
                  width: 130,
                  marginLeft: 20,
                  fontSize: 17,
                }}
              >
                Current star color :
              </div>
              <button
                className="printColor"
                style={{
                  backgroundColor: "#" + colors,
                  border: 0,
                  outline: 0,
                  width: 10,
                  cursor: "default",
                  marginRight: 20,
                  float: "left",
                  marginTop: 4,
                }}
              ></button>
              <div
                className="printColorValue"
                style={{ float: "left", marginRight: 110 }}
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
                  change color 1 Klay
                </label>
                <div className="changeColorCon">
                  <input
                    className="changeColor"
                    type="color"
                    defaultValue={"#" + changeColor}
                    style={{
                      backgroundColor: "#" + changeColor,
                      border: 0,
                      outline: 0,
                      cursor: "cusor",
                      marginRight: 20,
                      float: "left",
                      marginTop: 4,
                    }}
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
        <QRbuyModal
          show={QRbuyModalShow}
          onHide={() => setQRbuyModalShow(false)}
          url={QRurl}
          qrkey={buyKey}
        />
        <ViewModal
          show={setShow}
          onHide={() =>
            setModalShow({
              setShow: false,
              id: "",
            })
          }
          tokenid={id}
        />

        <div
          className="kaikasBtn"
          style={{ padding: 0, width: 250, float: "left" }}
        >
          <Button
            onClick={async () => {
              if (colorDup === false && $(".changeColorCheck").is(":checked")) {
                alert(
                  "This color has already been used. Please change the color."
                );
              } else if (klaytn === undefined) {
                alert("Please install a Kaikas wallet!");
              } else {
                if (
                  (await klaytn._kaikas.isUnlocked()) === false ||
                  klaytn.selectedAddress === undefined
                ) {
                  alert("Please log in as kaikas!");
                } else {
                  if (
                    catName === "" ||
                    yourName === "" ||
                    comment === "" ||
                    favorite === "" ||
                    dayMet === "" ||
                    imgURL === ""
                  ) {
                    alert("Please fill in all the fields.");
                  } else {
                    //setAccount(klaytn.selectedAddress);
                    const _caver = new Caver(window.klaytn);
                    const contract = new _caver.klay.Contract(_abi, address);

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
                          gas: 1000000,
                          value: caver.utils.toPeb(price, "KLAY"),
                        })
                        .then(function (receipt) {
                          window.sessionStorage.setItem("id_&", props.id);
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
                          gas: 1000000,
                        })
                        .then(function (receipt) {
                          window.sessionStorage.setItem("id_&", props.id);
                          window.location.reload();
                        });
                    }
                  }
                }
              }
            }}
          >
            <div style={{ textAligin: "center" }}>
              <div
                style={{
                  float: "left",
                  backgroundColor: "#73695D",
                  padding: 7,
                  paddingTop: 5,
                  borderRadius: 40,
                  marginRight: 10,
                }}
              >
                <img style={{ width: 20, height: 20 }} src={kaikas}></img>
              </div>
              <div style={{ float: "left", marginTop: "0.5vh", fontSize: 19 }}>
                {" "}
                Make a Star with Kaikas
              </div>
            </div>
          </Button>
        </div>
        <div
          className="klipBtn"
          style={{ padding: 0, width: 250, marginLeft: 21 }}
        >
          <Button
            onClick={async () => {
              const klipAddress = cookies.get("user");
              if (colorDup === false && $(".changeColorCheck").is(":checked")) {
                alert(
                  "This color has already been used. Please change the color."
                );
              } else if (klipAddress == undefined) {
                alert("Please log in with Klip!");
              } else {
                if (
                  catName === "" ||
                  yourName === "" ||
                  comment === "" ||
                  favorite === "" ||
                  dayMet === "" ||
                  imgURL === ""
                ) {
                  alert("Please fill in all the fields.");
                } else {
                  const contract = new caver.klay.Contract(_abi, address);
                  if ($(".changeColorCheck").is(":checked")) {
                    price = await contract.methods.getMintPrice().call();
                    changeTmp = parseInt(changeColor, 16);
                    const bappName = "cat-planet";
                    const from = klipAddress;
                    const to = address;
                    const value = caver.utils.toPeb(price, "KLAY");
                    const abi = JSON.stringify(_mintabi);
                    const array = [
                      catName,
                      yourName,
                      comment,
                      favorite,
                      imgURL,
                      changeTmp,
                      parseInt(dayMet),
                      true,
                    ];

                    const params = JSON.stringify(array);

                    const res = await prepare.executeContract({
                      bappName,
                      from,
                      to,
                      value,
                      abi,
                      params,
                    });

                    if (res.err) {
                      console.log(res.err);
                    } else if (res.request_key) {
                      await setBuyKey(res.request_key);

                      QRCode.toDataURL(
                        "https://klipwallet.com/?target=/a2a?request_key=" +
                          res.request_key,
                        function (err, url) {
                          window.sessionStorage.setItem("id_&", props.id);
                          setQRurl(url);
                          setQRbuyModalShow(true);
                        }
                      );
                    }
                  } else {
                    const bappName = "cat-planet";
                    const from = klipAddress;
                    const to = address;
                    const value = "0";
                    const abi = JSON.stringify(_mintabi);
                    const array = [
                      catName,
                      yourName,
                      comment,
                      favorite,
                      imgURL,
                      0,
                      parseInt(dayMet),
                      false,
                    ];

                    const params = JSON.stringify(array);

                    const res = await prepare.executeContract({
                      bappName,
                      from,
                      to,
                      value,
                      abi,
                      params,
                    });

                    if (res.err) {
                      console.log(res.err);
                    } else if (res.request_key) {
                      await setBuyKey(res.request_key);
                      QRCode.toDataURL(
                        "https://klipwallet.com/?target=/a2a?request_key=" +
                          res.request_key,
                        function (err, url) {
                          window.sessionStorage.setItem("id_&", props.id);
                          setQRurl(url);
                          setQRbuyModalShow(true);
                        }
                      );
                    }
                  }
                }
              }
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "#216FEA",
                  padding: 4,
                  borderRadius: 40,
                  marginRight: 10,
                  float: "left",
                }}
              >
                <img
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  src={klip}
                ></img>
              </div>
              <div style={{ float: "left", marginTop: "0.7vh", fontSize: 19 }}>
                Make a star with Klip
              </div>
            </div>
          </Button>
        </div>
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
