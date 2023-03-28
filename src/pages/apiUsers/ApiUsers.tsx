import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../service/user.service';
import { User } from '../../types/user';
import UserTable from '../users/components/UserTable';

const ApiUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    setErrorMessage(null);
    getUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        setUsers([]);
        setErrorMessage(e.message);
      });
  }, []);

  return (
    <div className="user-list">
      <div>
        <div className="nav">
          <Link to="/">Users</Link>
        </div>
        <div className="heading">
          <h2>API Users</h2>
        </div>
        {errorMessage && <p className="form-error">{errorMessage}</p>}
        <UserTable users={users} hasAccess={false} />
      </div>
    </div>
  );
};

export default ApiUsers;
