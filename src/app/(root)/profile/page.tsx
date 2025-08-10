
import ProfilePageClient from './ProfilePageClient';
import { getSession } from '@/lib/getSession';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user ?? null;

  return <ProfilePageClient user={user} />;
}
