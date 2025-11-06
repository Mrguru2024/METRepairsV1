'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
}

export default function AdminDashboard({ userRole }: { userRole: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', name: '', role: 'ADMIN' });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      setShowAddUser(false);
      setNewUser({ email: '', password: '', name: '', role: 'ADMIN' });
      fetchUsers();
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchUsers();
    }
  }

  const isSuperAdmin = userRole === 'SUPER_ADMIN';

  return (
    <main className="container-page py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-sm opacity-70">Manage users and system settings</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="btn px-4 py-2 border text-sm">
            Back to Site
          </Link>
          <button onClick={() => signOut()} className="btn px-4 py-2 border text-sm">
            Sign Out
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Users</h2>
          {isSuperAdmin && (
            <button onClick={() => setShowAddUser(!showAddUser)} className="btn-primary px-4 py-2 text-sm">
              {showAddUser ? 'Cancel' : '+ Add User'}
            </button>
          )}
        </div>

        {showAddUser && isSuperAdmin && (
          <form onSubmit={handleAddUser} className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h3 className="mb-3 font-semibold">Add New User</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="rounded border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-neutral-800"
              />
              <input
                type="text"
                placeholder="Name (optional)"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="rounded border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-neutral-800"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="rounded border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-neutral-800"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="rounded border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-neutral-800"
              >
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <button type="submit" className="btn-primary mt-3 px-4 py-2 text-sm">
              Create User
            </button>
          </form>
        )}

        {loading ? (
          <p className="py-8 text-center text-sm opacity-60">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  {isSuperAdmin && <th className="px-4 py-3 text-left">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-black/5 dark:border-white/5">
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.name || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 opacity-70">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    {isSuperAdmin && (
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-xs text-red-600 hover:opacity-80"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

