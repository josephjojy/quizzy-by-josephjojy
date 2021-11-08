import React from "react";

import { Modal, Button, Typography } from "@bigbinary/neetoui/v2";

const DeleteModal = ({ deleteModal, setDeleteModal, handleDelete }) => {
  return (
    <div>
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        size="s"
      >
        <Modal.Header>
          <Typography style="h2">Are you sure you want to delete?</Typography>
        </Modal.Header>
        <Modal.Footer className="space-x-2">
          <Button
            label="Delete"
            onClick={() => {
              handleDelete(deleteModal);
              setDeleteModal(false);
            }}
            size="large"
          />
          <Button
            style="text"
            label="Cancel"
            onClick={() => setDeleteModal(false)}
            size="large"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
