import React, {useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";

export default function ModalBtn(props: any) {
  const ss = useSelector((state: StateStore) => state); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();


  const showModal = () => {
    setIsModalOpen(true);
  };

  /* Handle delete */
  const handleDelete = () => {
    setIsModalOpen(false);

    const deleteUserPromise = deleteDataUser(props.id);
    deleteUserPromise(dispatch);
    console.log(ss, "ss")
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Xóa user
      </Button>

      <Modal
        title="Xóa người dùng này?"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa user: <b>{props.email}</b> không?</p>
      </Modal>
    </>
  );
}
