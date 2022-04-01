import { Modal, Button } from "react-bootstrap";
import { Cookies } from "react-cookie";
import $ from "jquery";

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
          주의사항
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontWeight: "bold" }}>
          HEIC 확장자를 사용하는 아이폰(혹은 MacOS 기기) 이미지는 이미지가
          나타나지 않을 수 있습니다.
        </p>
        <p>확장자를 변경한 후 구글 드라이브에 올려주시길 바랍니다.</p>
        <p style={{ fontWeight: "bold" }}>
          확장자 변경은 카카오톡 -> 나에게 보내기 -> 재 저장하면 간단하게
          변경하실 수 있습니다.
        </p>
        <p>
          또한, 구글 드라이브에서 삭제하면 이미지가 보이지 않으므로 절대
          삭제하시면 안됩니다.
        </p>
        <p style={{ fontWeight: "bold" }}>
          구글 드라이브 공유 링크는 전체 공유로 해주세요.
        </p>
        <p>감사합니다.</p>
      </Modal.Body>
    </Modal>
  );
}

export default Announcement;
