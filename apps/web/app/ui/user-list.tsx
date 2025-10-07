'use client';
import { User } from '@repo/database';
import { use } from 'react';

export default function UserList({ users }: { users: Promise<User[]> }) {
  const allUsers = use(users);
  return (
    <ul>
      {allUsers.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
