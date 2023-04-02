import {
  Button,
  Typography,
  Wrapper,
  applyMediaQuery,
  theme,
} from '@supercarmarket/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { Modal } from 'components/common/modal';
import {
  useDeleteMarketPost,
  useUpdateMarketSellStatus,
} from 'http/server/market';
import * as React from 'react';
import { css } from 'styled-components';
import { useNextQuery } from 'hooks/useNextQuery';
import { marketFormatter } from '@supercarmarket/lib';
import { ModalContext } from 'feature/ModalProvider';

interface MarketMineProps {
  id: string;
  brdSeq: number;
}

const MarketMine = ({ id, brdSeq }: MarketMineProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { mutate: changeSellStatus } = useUpdateMarketSellStatus(id);
  const { mutate: deleteMarketById } = useDeleteMarketPost(id, {
    onSuccess: () => {
      push(`/market?category=${marketFormatter(query.category)}`);
    },
  });

  const changeStatus = React.useCallback(() => {
    changeSellStatus({
      data: { brdSeq },
    });
  }, [brdSeq, changeSellStatus]);

  const deleteMarket = React.useCallback(() => {
    deleteMarketById({
      data: [{ id }],
    });
  }, [id, deleteMarketById]);

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
        onClick={deleteMarket}
      />
    );
  }, [deleteMarket, onOpen, onClose]);

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
