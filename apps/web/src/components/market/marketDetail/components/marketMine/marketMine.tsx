import {
  Button,
  Typography,
  Wrapper,
  applyMediaQuery,
  theme,
} from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import ModalContext from 'feature/modalContext';
import {
  useDeleteMarketPost,
  useUpdateMarketSellStatus,
} from 'http/server/market';
import * as React from 'react';
import { css } from 'styled-components';

interface MarketMineProps {
  id: string;
  brdSeq: number;
}

const MarketMine = ({ id, brdSeq }: MarketMineProps) => {
  const { mutate: removeMarketById } = useDeleteMarketPost();
  const { mutate: changeSellStatus } = useUpdateMarketSellStatus();
  const { onOpen, onClose } = React.useContext(ModalContext);

  const changeStatus = React.useCallback(() => {
    changeSellStatus({
      data: { brdSeq },
    });
  }, [brdSeq, changeSellStatus]);

  const removeMarket = React.useCallback(() => {
    removeMarketById({
      data: [{ id }],
    });
  }, [id, removeMarketById]);

  const handleStatusModal = React.useCallback(() => {
    onOpen(
      <Modal
        title="매물 판매 완료"
        description={`매물을 판매완료 처리 하시겠습니까?\n판매 완료 후, 상태를 변경하실 수 없습니다.`}
        background={theme.color['greyScale-6']}
        closeText="취소"
        clickText="판매완료"
        onClose={() => {
          onClose();
        }}
        onCancel={() => {
          onClose();
        }}
        onClick={changeStatus}
      />
    );
  }, [changeStatus, onOpen, onClose]);

  const handleRemoveModal = React.useCallback(() => {
    onOpen(
      <Modal
        title="매물 삭제"
        description={`매물을 삭제하시겠습니까?\n삭제 후 글을 복구할 수 없습니다.`}
        background={theme.color['greyScale-6']}
        closeText="취소"
        clickText="판매완료"
        onClose={() => {
          onClose();
        }}
        onCancel={() => {
          onClose();
        }}
        onClick={removeMarket}
      />
    );
  }, [removeMarket, onOpen, onClose]);

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 205px;
        gap: 16px;

        ${applyMediaQuery('mobile')} {
          height: 105px;
        }
      `}
    >
      <Button variant="Line" onClick={handleRemoveModal}>
        <Typography color="greyScale-6">삭제</Typography>
      </Button>
      <Button variant="Line" onClick={handleStatusModal}>
        <Typography color="greyScale-6">판매 완료</Typography>
      </Button>
    </Wrapper>
  );
};

export default MarketMine;
