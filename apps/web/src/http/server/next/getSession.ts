import { type Session } from 'next-auth';
import { type GetSessionParams } from 'next-auth/react';
import { getSession as getSessionInner } from 'next-auth/react';

/**
 * @description
 */
export const getSession = async (
  options: GetSessionParams
): Promise<Session | null> => {
  const session = await getSessionInner(options);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null;
};
