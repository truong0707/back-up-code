import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ModalBtn(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(['homeAdmin']);

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

  useEffect(() => {
    
  }, [])

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t('admin home.delete')}
      </Button>

      <Modal
        title={t('admin home.delete_user')}
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>
          {t(`admin home.want_delete_user`)} <b>{props.email}</b>?
        </p>
      </Modal>
    </>
  );
}