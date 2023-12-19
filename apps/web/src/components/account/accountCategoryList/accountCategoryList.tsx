import * as React from 'react';
import { CommunityCard } from 'components/community';
import { CardSkeleton } from 'components/fallback/loading';
import InquiryCard from 'components/inquiry/inquiryCard';
import MagazineCard from 'components/magazine/magazineCard';
import MarketCard from 'components/market/marketCard';
import { useSession } from 'next-auth/react';
import { css } from 'styled-components';
import {
  Alert,
  applyMediaQuery,
  Button,
  Category,
  CategoryProps,
  Container,
  FormCheckbox,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRemoveCommunityPost } from 'http/server/community';
import { QUERY_KEYS, useAccountCategory } from 'http/server/account';
import { useDebounce, useUrlQuery } from '@supercarmarket/hooks';
import { type Market } from 'types/market';
import { type AccountCategory } from 'constants/link/account';
import {
  useDeleteMarketPost,
  useUpdateMarketSellStatus,
} from 'http/server/market';
import { useSearchParams } from 'next/navigation';

interface AccountCategoryProps {
  sub: string;
  tab: AccountCategory;
  isMyAccountPage: boolean;
  accountRoutes: CategoryProps['links'];
  profile: Account.ProfileDto;
}

type AccountCategoryItemWrapperProps = React.PropsWithChildren & {
  hidden: boolean;
  id: string;
  allChecked?: boolean;
  category?: string;
  center?: boolean;
  setDeleteList?: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        category?: string;
      }[]
    >
  >;
};

const AccountCategoryItemWrapper = ({
  id,
  hidden,
  children,
  allChecked,
  category,
  center = true,
  setDeleteList,
}: AccountCategoryItemWrapperProps) => {
  const [checked, setChecked] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const handleAddDeleteList = React.useCallback(() => {
    if (!setDeleteList) return;
    setDeleteList((prev) => [
      ...prev,
      {
        id,
        category,
      },
    ]);
  }, [category, id, setDeleteList]);

  const handleRemoveDeleteList = React.useCallback(() => {
    if (!setDeleteList) return;
    setDeleteList((prev) => prev.filter((value) => value.id !== id));
  }, [id, setDeleteList]);

  React.useEffect(() => {
    if (allChecked) setChecked(true);
    else setChecked(false);
  }, [allChecked]);

  React.useEffect(() => {
    if (checked) handleAddDeleteList();
    else handleRemoveDeleteList();
  }, [checked, handleAddDeleteList, handleRemoveDeleteList]);
  return (
    <Container display="flex" alignItems={center ? 'center' : 'flex-start'}>
      {hidden && (
        <Wrapper.Item
          css={css`
            padding: 0 11.5px;
            ${applyMediaQuery('mobile')} {
              display: none;
            }
          `}
        >
          <FormCheckbox
            name={id}
            id={id}
            hidden={hidden}
            checked={checked}
            onClick={handleClick}
            readOnly
          />
        </Wrapper.Item>
      )}
      <Wrapper.Item
        css={css`
          flex: 1;
        `}
      >
        {children}
      </Wrapper.Item>
    </Container>
  );
};

const AccountCategoryList = React.memo(function AccountCategory({
  sub,
  tab,
  isMyAccountPage,
  accountRoutes,
  profile,
}: AccountCategoryProps) {
  const [deleteList, setDeleteList] = React.useState<
    {
      id: string;
      category?: string;
    }[]
  >([]);
  const [allChecked, setAllChecked] = React.useState(false);
  const session = useSession();
  const queryClient = useQueryClient();
  const isDeleteTarget =
    isMyAccountPage &&
    (tab === 'community' ||
      (profile.role === 'dealer' && tab === 'dealer-product'));
  const page = useSearchParams().get('page');
  const { data, isLoading, isFetching, refetch } = useAccountCategory(
    sub,
    {
      category: tab,
      page: Number(page),
      size: 20,
    },
    session.data?.accessToken,
    {
      enabled: session.status && session.status !== 'loading',
    }
  );
  const removeCategoryMutation = useRemoveCommunityPost({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEYS.id(sub),
          {
            category: tab,
            page: 0,
            size: 20,
          },
        ],
      });
    },
  });
  const removeSaleMutation = useDeleteMarketPost({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEYS.id(sub),
          {
            category: tab,
            page: 0,
            size: 20,
          },
        ],
      });
    },
  });
  const updaeSaleMutation = useUpdateMarketSellStatus({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEYS.id(sub),
          {
            category: tab,
            page: 0,
            size: 20,
          },
        ],
      });
    },
  });

  const handleCheckbox = React.useCallback(() => {
    setAllChecked((prev) => !prev);
  }, []);

  const debouncedDelete = useDebounce(async () => {
    if (!isDeleteTarget) return;
    if (!session) return;

    if (!deleteList.length) return;

    if (tab === 'community') {
      removeCategoryMutation.mutate({
        data: deleteList,
      });
    }
    if (tab === 'dealer-product') {
      removeSaleMutation.mutate({
        data: deleteList.map((l) => ({ id: l.id })),
      });
    }

    refetch();
  }, 300);

  const debouncedUpdate = useDebounce(async () => {
    if (!isDeleteTarget) return;
    if (!session) return;

    if (!deleteList.length) return;

    updaeSaleMutation.mutate({ data: deleteList.map((l) => ({ seq: l.id })) });

    refetch();
  }, 300);

  if (isFetching || isLoading) return <CardSkeleton variant="row" />;

  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
        `}
      >
        <Category links={accountRoutes} category={tab} />
        <Wrapper.Item
          css={css`
            display: flex;
            gap: 8px;
            ${applyMediaQuery('mobile')} {
              display: none;
            }
          `}
        >
          {isDeleteTarget && (
            <Button
              type="button"
              variant="Primary-Line"
              width="92px"
              disabled={removeCategoryMutation.isLoading}
              onClick={debouncedDelete}
              style={{
                padding: 0,
                height: '44px',
              }}
            >
              삭제
            </Button>
          )}
          {isDeleteTarget && tab === 'dealer-product' && (
            <Button
              type="button"
              variant="Primary-Line"
              width="92px"
              disabled={removeCategoryMutation.isLoading}
              onClick={debouncedUpdate}
              style={{
                padding: 0,
                height: '44px',
              }}
            >
              판매 완료
            </Button>
          )}
        </Wrapper.Item>
      </Wrapper>
      <Table
        tab={tab}
        hidden={isDeleteTarget}
        padding="0 0 6px 0"
        handleCheckbox={handleCheckbox}
      />
      {data?.data.length < 1 ? (
        <Wrapper
          css={css`
            padding-top: 35px;
          `}
        >
          <Alert severity="info" title="게시글이 존재하지 않습니다." />
        </Wrapper>
      ) : (
        {
          product: (
            <Wrapper.Item
              css={css`
                display: flex;
                flex-direction: column;
                gap: 6px;
              `}
            >
              {data.data.map((d: Market.MarketDto) => (
                <AccountCategoryItemWrapper
                  key={d.id}
                  id={d.id}
                  hidden={isDeleteTarget}
                >
                  <MarketCard variant="row" {...d} />
                </AccountCategoryItemWrapper>
              ))}
            </Wrapper.Item>
          ),
          'dealer-product': (
            <Wrapper.Item
              css={css`
                display: flex;
                flex-direction: column;
                gap: 6px;
              `}
            >
              {data.data.map((d: Market.MarketDto) => (
                <AccountCategoryItemWrapper
                  key={d.id}
                  id={d.id}
                  hidden={isDeleteTarget}
                  allChecked={allChecked}
                  setDeleteList={setDeleteList}
                >
                  <MarketCard variant="row" {...d} />
                </AccountCategoryItemWrapper>
              ))}
            </Wrapper.Item>
          ),
          magazine: (
            <Wrapper.Item
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                row-gap: 40px;
                column-gap: 20px;
                ${applyMediaQuery('mobile')} {
                  grid-template-columns: 1fr 1fr;
                  row-gap: 16px;
                  column-gap: 8px;
                }
              `}
            >
              {data.data.map((d: Magazine.MagazineDto) => (
                <AccountCategoryItemWrapper
                  key={d.id}
                  id={d.id}
                  hidden={isDeleteTarget}
                  center={false}
                >
                  <MagazineCard key={d.id} {...d} />
                </AccountCategoryItemWrapper>
              ))}
            </Wrapper.Item>
          ),
          comment: (
            <Wrapper
              css={css`
                width: 100%;
              `}
            >
              {data.data.map((d: Community.CommunityDto) => (
                <AccountCategoryItemWrapper
                  key={d.id}
                  id={d.id}
                  hidden={isDeleteTarget}
                >
                  <CommunityCard key={d.id} variant="row" {...d} />
                </AccountCategoryItemWrapper>
              ))}
            </Wrapper>
          ),
          community: data.data.map((d: Community.CommunityDto) => (
            <AccountCategoryItemWrapper
              key={d.id}
              id={d.id}
              category={d.category}
              hidden={isDeleteTarget}
              allChecked={allChecked}
              setDeleteList={setDeleteList}
            >
              <CommunityCard key={d.id} variant="row" {...d} />
            </AccountCategoryItemWrapper>
          )),
          inquiry: (
            <Wrapper
              css={css`
                width: 100%;
                ${applyMediaQuery('mobile')} {
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                }
              `}
            >
              {data.data.map((d: Inquiry.InquiryDto) => (
                <AccountCategoryItemWrapper
                  key={d.id}
                  id={d.id}
                  hidden={isDeleteTarget}
                >
                  <InquiryCard key={d.id} {...d} />
                </AccountCategoryItemWrapper>
              ))}
            </Wrapper>
          ),
        }[tab]
      )}
      <Wrapper
        css={css`
          padding-top: 80px;
          ${applyMediaQuery('mobile')} {
            padding-top: 32px;
          }
        `}
      >
        <Pagination
          pageSize={20}
          totalCount={data.totalCount}
          totalPages={data.totalPages}
        />
      </Wrapper>
    </Container>
  );
});

export default AccountCategoryList;
