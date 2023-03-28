import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usersSelector } from '../../store/slices/users.slice';
import { useAppSelector } from '../../store/store';
import AddUser from './components/AddUser';
import UserTable from './components/UserTable';

const Users = () => {
  const [openModal, manageModal] = useState<boolean>(false);
  const { users } = useAppSelector(usersSelector);

  const addUser = () => {
    manageModal(!openModal);
  };

  return (
    <div className="user-list">
      <div>
        <div className="nav">
          <Link to="/api-users">API Users</Link>
        </div>
        <div className="heading">
          <h2>Users</h2>
          <button className="btn add-btn" onClick={() => addUser()}>
            Add user
          </button>
        </div>
        <UserTable users={users} hasAccess={true} />
        {openModal && <AddUser closeModal={addUser} />}
      </div>
    </div>
  );
};

export default Users;
