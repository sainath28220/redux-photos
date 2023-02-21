import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useThunk } from '../hooks/use-thunk';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';




const UsersList = () => {
  const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
  const [ doCreateUser, isCreatingUser, creatingUserError ] = useThunk(addUser);
  // const [ isCreatingUser,setIsCreatingUser ] = useState(false);
  // const [ creatingUserError,setCreatingUserError ] = useState(null);
  // const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
    // setIsCreatingUser(true);
    // dispatch(addUser()).unwrap()
    // .catch((err)=> setCreatingUserError(err))
    // .finally(()=>setIsCreatingUser(false));
  };
  let content;
  if (isLoadingUsers) {
    content =  <Skeleton times={6} className="h-10 w-full" />;
  }else if (loadingUsersError) {
    content =  <div>error fetching data </div>;
  }else{
    content = data.map((user) => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>+Add User</Button>
        { creatingUserError && 'Error Creating User...' }
      </div>
      {content}
    </div>
  );
};

export default UsersList;
