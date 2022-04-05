import { Modal, Button } from "react-bootstrap";
import { getResult } from "klip-sdk";
import $ from "jquery";

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
          Take a QR code and pay by Klip.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please take a picture of the QR code below with your smartphone
          camera.
        </p>
        <p>
          Even after the klay transfer is completed, it may take some time for
          the transaction to be processed. Please wait for a while after the
          transfer.
        </p>
        <div style={{ textAlign: "center" }}>
          <img src={props.url}></img>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="QRmodal"
          onClick={async () => {
            const data = await getResult(props.qrkey);
            if (data.status == "completed") {
              alert("A star has been made.");
              $(".btn-close").trigger("click");
              window.location.reload();
            } else {
              alert("The transaction has not been processed.");
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
