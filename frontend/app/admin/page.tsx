import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminDashboard from '@/components/Admin/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const role = session.user.role;
  if (role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
    redirect('/');
  }

  return <AdminDashboard userRole={role} />;
}

