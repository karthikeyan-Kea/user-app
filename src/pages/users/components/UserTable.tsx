import { useEffect, useState } from 'react';
import FormatDate from '../../../components/FormatDate';
import useSortableData from '../../../hooks/useSortableData';
import { removeUser } from '../../../store/slices/users.slice';
import { useAppDispatch } from '../../../store/store';
import { User } from '../../../types/user';

type Props = {
  users: User[];
  hasAccess: boolean;
};
const UserTable = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, hasAccess } = props;
  const [search, setSearch] = useState<string>('');
  const [filterData, setFilterData] = useState<User[]>([]);

  useEffect(() => {
    let filteredUser: User[] = users;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUser = users.filter(user => {
        return (
          user.name.toLowerCase().indexOf(searchLower) > -1 ||
          user.email.toLowerCase().indexOf(searchLower) > -1 ||
          user.address.toLowerCase().indexOf(searchLower) > -1 ||
          user.entity.toLowerCase().indexOf(searchLower) > -1
        );
      });
    }
    setFilterData(filteredUser);
  }, [search, users]);

  const deleteUser = (index: number) => {
    if (window.confirm('Are you sure Want to delete the user?')) {
      dispatch(removeUser(index));
    }
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const { data, requestSort, sortConfig } = useSortableData(filterData);

  return (
    <div>
      <div className="search">
        <input type="text" name="search" placeholder="Search" onChange={e => setSearch(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <span onClick={() => requestSort('email')} className={getClassNamesFor('email')}>
                Email
              </span>
            </th>
            <th>
              <span onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                Name
              </span>
            </th>
            <th>
              <span onClick={() => requestSort('address')} className={getClassNamesFor('address')}>
                Address
              </span>
            </th>
            <th>
              <span onClick={() => requestSort('entity')} className={getClassNamesFor('entity')}>
                Entity
              </span>
            </th>
            <th>
              <span onClick={() => requestSort('createdAt')} className={getClassNamesFor('createdAt')}>
                Created
              </span>
            </th>
            {hasAccess && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.entity}</td>
                  <td>{user.createdAt && <FormatDate date={user.createdAt} />}</td>
                  {hasAccess && (
                    <td>
                      <span className="delete-icon" onClick={() => deleteUser(index)}>
                        X
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={6}>No Users Found</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
