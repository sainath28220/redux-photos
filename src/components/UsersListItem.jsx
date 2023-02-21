import { GoTrashcan } from 'react-icons/go';
import { store } from '../store';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

const UsersListItem = ({ user }) => {
  const [ doRemoveUser, isLoading, error ] = useThunk(removeUser);
  const handleClick = () => {
    doRemoveUser(user);
  }
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row item-center justify-between">
          <Button className="mr-3" loading={isLoading} onClick={handleClick}>
            <GoTrashcan />
          </Button>
          { error && <div>Error deleting user.</div> }
          {user.name}
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
