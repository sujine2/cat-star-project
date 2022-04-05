import { Modal, Button } from "react-bootstrap";
import { getResult } from "klip-sdk";
import { Cookies } from "react-cookie";
import $ from "jquery";
import "../QRModal.css";

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
          Take a QR code and go to Klip.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please take a picture of the QR code below with your smartphone
          camera.
        </p>
        <p>The login expiration time is 25 minutes.</p>
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
                cookies.set("user", data.result.klaytn_address, {
                  path: "/",
                  secure: true,
                  expires: new Date(),
                  maxAge: 1500,
                });

                alert("Klip wallet is connected.");
                $(".btn-close").attr("class", "QR-close");

                $(".QR-close").trigger("click");
              } else {
                alert("Klip wallet is not connected.");
              }
            } else {
              alert("An error has occurred.");
            }
          }}
        >
          connection complete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRModal;
