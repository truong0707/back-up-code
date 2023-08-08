import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch } from "react-redux";

export default function ModalBtn(props: any) {
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Delete
      </Button>

      <Modal
        title="Delete?"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
