import { Modal } from "antd";
import { useAuth } from "../User/CheckAuth/AuthContext";

const ModalShow = () => {
  const { model } = useAuth();
  return (
    <Modal
      title="faceauth.js says"
      centered
      open={model.modelState}
      onOk={() => model.setModelState(false)}
      onCancel={() => model.setModelState(false)}
    >
      {model.modelData}
    </Modal>
  );
};

export default ModalShow;
