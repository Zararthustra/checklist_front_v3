import { Modal } from "antd";

import { IconInfo, IconLogin, IconOnOff } from "@assets/index";
import { Button } from "@components/index";
import { getLS } from "@services/localStorageService";
import { useMutationReconnect } from "@queries/index";

interface IModalReconnectProps {
  showReconnectModal: boolean;
  logout: () => void;
}

export const ModalReconnect = ({
  showReconnectModal,
  logout,
}: IModalReconnectProps) => {
  const { mutate, isLoading } = useMutationReconnect();

  return (
    <Modal
      centered
      open={showReconnectModal}
      width={400}
      closable={false}
      footer={
        <div className="flex flex-col items-center gap-1">
          <Button
            onClick={() => mutate(getLS("refreshToken"))}
            variant="ok"
            className="w-full"
            loading={isLoading}
          >
            <IconLogin width={22} height={22} />
            <p>Se reconnecter</p>
          </Button>
          <Button variant="ko" className="w-full" onClick={logout}>
            <IconOnOff />
            <p>Se déconnecter</p>
          </Button>
        </div>
      }
    >
      <div className="">
        <h2 className="text-center">⌛ Session expirée ⌛</h2>

        <p className="my-5 text-center text-base">Que désirez-vous faire ?</p>

        <div className="bubble bubble--info mb-5">
          <IconInfo className="shrink-0 text-blue-500" />
          <p className="text-xs">
            Pas de panique ! Pour des raisons de sécurité, votre session expire
            après un certain temps.
          </p>
        </div>
      </div>
    </Modal>
  );
};
