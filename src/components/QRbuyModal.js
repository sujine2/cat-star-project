import { Modal, Button } from "react-bootstrap";
import { getResult } from "klip-sdk";

let klipAddress = "";

function QRbuyModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          QR코드 찍고 Klip으로 결제하기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>스마트폰 카메라로 아래의 QR코드를 찍어주세요.</p>
        <p>
          klay 전송이 완료 되어도 거래가 처리 될때까지 시간이 소요 될 수
          있습니다. 전송 후 잠시만 기다려주세요.
        </p>
        <div style={{ textAlign: "center" }}>
          <img src={props.url}></img>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            const data = await getResult(props.qrkey);
            console.log(props.qrkey);
            console.log("Result", data);
            console.log("Result", data.status);
            if (data.status == "completed") {
              alert("별 발행이 완료되었습니다.");

              console.log("유저 어들세ㅓㅏㅁ;ㄹ", klipAddress);
              window.location.reload();
            } else {
              alert("거래가 처리되지 않았습니다.");
            }
          }}
        >
          완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRbuyModal;
export const userAddr = klipAddress;
