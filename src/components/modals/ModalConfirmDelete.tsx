import { useEffect } from "react";
import { Modal } from "antd";

import { IconTrash, IconWarning } from "@assets/index";
import { Button } from "@components/index";
import { useMutationDeleteCategory } from "@queries/index";

interface IModalConfirmDeleteProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  categoryName: string;
  categoryId: string;
}

export const ModalConfirmDelete = ({
  showModal,
  setShowModal,
  categoryName,
  categoryId,
}: IModalConfirmDeleteProps) => {
  const {
    mutate: deleteCategory,
    isLoading,
    isSuccess,
  } = useMutationDeleteCategory();

  useEffect(() => {
    if (isSuccess) setShowModal(false);
  }, [isSuccess]);

  return (
    <Modal
      centered
      width={300}
      open={showModal}
      closable={false}
      onCancel={() => setShowModal(false)}
      footer={
        <div className="flex flex-col gap-1">
          <Button
            onClick={() => deleteCategory(categoryId)}
            variant="ko"
            loading={isLoading}
          >
            <IconTrash />
            <p>Supprimer</p>
          </Button>
          <Button secondary onClick={() => setShowModal(false)}>
            <p>Annuler</p>
          </Button>
        </div>
      }
    >
      <h2 className="text-center">Êtes-vous sûr ?</h2>

      <div className="bubble bubble--warning my-5">
        <IconWarning className="shrink-0 " />
        <p className="text-xs">
          Vous allez supprimer la catégorie <strong>{categoryName}</strong>.
        </p>
      </div>
    </Modal>
  );
};
