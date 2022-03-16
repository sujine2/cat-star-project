import { Modal, Button } from "react-bootstrap";
import { getResult } from "klip-sdk";
import { Cookies } from "react-cookie";
import "./QRModal.css";

function QRModal(props) {
  const cookies = new Cookies();
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          QR코드 찍고 Klip 바로가기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>스마트폰 카메라로 아래의 QR코드를 찍어주세요.</p>
        <div style={{ textAlign: "center" }}>
          <img src={props.url}></img>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="QRmodal"
          onClick={async () => {
            if (props.qrkey != "") {
              const data = await getResult(props.qrkey);

              if (data.status == "completed") {
                alert("Klip 지갑이 연결 되었습니다.");

                cookies.set("user", data.result.klaytn_address, {
                  path: "/",
                  secure: true,
                  expires: new Date(),
                  maxAge: 1500,
                });
              } else {
                alert("Klip 지갑이 연결되지 않았습니다.");
              }
            } else {
              alert("오류가 발생했습니다.");
            }
          }}
        >
          연결 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRModal;
