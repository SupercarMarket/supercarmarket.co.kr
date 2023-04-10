import { CommunityFormSkeleton } from 'components/fallback/loading';
import { useTemporaryStorage } from 'http/server/community';
import { useSession } from 'next-auth/react';
import CommunityForm from './communityForm';

const CommunityCreate = () => {
  const { data: session } = useSession();
  const { data: temporaryStorage } = useTemporaryStorage(session?.sub || '', {
    enabled: !!session,
  });

  if (!temporaryStorage) return <CommunityFormSkeleton />;

  return (
    <CommunityForm sub={session?.sub} initialData={temporaryStorage.data} />
  );
};

export default CommunityCreate;
