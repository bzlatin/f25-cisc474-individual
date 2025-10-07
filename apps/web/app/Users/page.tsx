import UserList from '../ui/user-list';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function Page() {
  const users = fetcher(process.env.BACKEND_URL + '/users');
  return (
    <div>
      Users Page
      <UserList users={users} />
    </div>
  );
}
