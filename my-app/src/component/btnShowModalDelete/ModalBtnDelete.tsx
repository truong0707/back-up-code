import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface MyModalBtn {
  id: string;
  // email?: string;
  nameOjbDelete: string;
  contentBtn: string;
  typeDelete: string;
}

const ModalBtn = (props: MyModalBtn) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(["homeAdmin"]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  /* Handle delete */
  const handleDelete = () => {
    setIsModalOpen(false);

    if (props.typeDelete === "user") {
      const deleteUserPromise = deleteDataUser(props.id);
      deleteUserPromise(dispatch);
    } else if (props.typeDelete === "subMenu") {
      console.log(props.id, "id");
    } else {
      alert("sss");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" danger onClick={showModal}>
        {props.contentBtn}
      </Button>

      <Modal
        title={t("adminHome.delete_user")}
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>
          {/* {t(`adminHome.want_delete_user`)} */}
          Có chắc muốn xóa {props.id}{" "}
          <b>{/* props.email */ props.nameOjbDelete}</b>?
        </p>
      </Modal>
    </>
  );
};

export default ModalBtn;
