import React from "react";
import { Modal, Button } from "react-bootstrap";
import { prepare } from "klip-sdk";
import QRCode from "qrcode";
import QRModal from "../components/QRModal";
import klip from "../img/Klip.png";
import kaikas from "../img/kaikas.png";
import { Cookies } from "react-cookie";
import "./RequestLogin.css";
import { klaytn } from "../wallet/caver";

function RequestLogin(props) {
  const cookies = new Cookies();
  const [QRurl, setQRurl] = React.useState("");
  const [key, setKey] = React.useState("");
  const [QRModalShow, setQRModalShow] = React.useState(false);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          지갑 연결하기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button
          className="walletConnect"
          onClick={async () => {
            if (klaytn === undefined) {
              alert("카이카스 지갑을 설치해 주세요!");
            } else {
              await klaytn.enable();
            }
          }}
        >
          <img
            src={kaikas}
            style={{
              height: 18,
              width: 18,
              marginRight: 8,
              marginBottom: 6,
            }}
          ></img>
          Kaikas로 로그인
        </button>

        <button
          className="klipConnect"
          onClick={async () => {
            const bappName = "cat-planet";
            const res = await prepare.auth({
              bappName,
            });
            if (res.err) {
              alert(
                "카카오톡 클립(Klip) 인증 오류가 발행하였습니다. 나중에 다시 시도해 주세요."
              );
              // 에러 처리
            } else if (res.request_key) {
              // request_key 보관

              await setKey(res.request_key);

              QRCode.toDataURL(
                "https://klipwallet.com/?target=/a2a?request_key=" +
                  res.request_key,
                function (err, url) {
                  setQRurl(url);
                  setQRModalShow(true);
                }
              );
            }
          }}
        >
          <img
            style={{ width: 30, height: 30, marginRight: 5 }}
            src={klip}
          ></img>
          Klip으로 로그인
        </button>
        <QRModal
          show={QRModalShow}
          onHide={() => setQRModalShow(false)}
          url={QRurl}
          qrkey={key}
        />
      </Modal.Body>
    </Modal>
  );
}

export default RequestLogin;
