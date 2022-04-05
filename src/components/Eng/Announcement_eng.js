import { Modal, Button } from "react-bootstrap";

function Announcement(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontWeight: "bold" }}
        >
          Caution
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontWeight: "bold" }}>
          iPhone (or MacOS device) images using HEIC extensions may not show
          images.
        </p>
        <p style={{ fontWeight: "bold" }}>
          Please change the extension and upload it to Google Drive.
        </p>
        <p>
          Also, if you delete it from Google Drive, you will not see the image,
          so you must never delete it.
        </p>
        <p style={{ fontWeight: "bold" }}>
          Please share the Google Drive share link with everyone.
        </p>

        <p>Thank you.</p>
      </Modal.Body>
    </Modal>
  );
}

export default Announcement;
