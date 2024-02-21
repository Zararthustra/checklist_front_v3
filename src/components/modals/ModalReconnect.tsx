import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import { IconInfo, IconLogin, IconOnOff } from '@assets/index';
import { Button } from '@components/index';
import { useMutationReconnect } from '@queries/index';
import { clearLS, getLS } from '@services/localStorageService';

interface IModalReconnectProps {
  showReconnectModal: boolean;
}

export const ModalReconnect = ({
  showReconnectModal
}: IModalReconnectProps) => {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useMutationReconnect();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <Modal
      centered
      open={showReconnectModal}
      width={400}
      closable={false}
      footer={
        <div className="flex flex-col items-center gap-1">
          <Button
            onClick={() => mutate(getLS('refreshToken'))}
            variant="ok"
            className="w-full"
            loading={isLoading}>
            <IconLogin width={22} height={22} />
            <p>Se reconnecter</p>
          </Button>
          <Button
            variant="ko"
            className="w-full"
            onClick={() => {
              clearLS();
              navigate(0);
            }}>
            <IconOnOff />
            <p>Se déconnecter</p>
          </Button>
        </div>
      }>
      <div className="">
        <h2 className="text-center">⌛ Session expirée ⌛</h2>

        <p className="my-5 text-center text-base">Que désirez-vous faire ?</p>

        <div className="bubble bubble--info mb-5">
          <IconInfo className="shrink-0 " />
          <p className="text-xs">
            Pas de panique ! Pour des raisons de sécurité, votre session expire
            après un certain temps.
          </p>
        </div>
      </div>
    </Modal>
  );
};
