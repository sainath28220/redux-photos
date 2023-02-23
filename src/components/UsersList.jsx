import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useThunk } from '../hooks/use-thunk';
import { fetchUsers, addUser } from '../store';
import UsersListItem from './UsersListItem';
import Skeleton from './Skeleton';
import Button from './Button';





const UsersList = () => {
  const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
  const [ doCreateUser, isCreatingUser, creatingUserError ] = useThunk(addUser);
  // const [ isCreatingUser,setIsCreatingUser ] = useState(false);
  // const [ creatingUserError,setCreatingUserError ] = useState(null);
  // const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    console.log(state)
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

  data.map((user) => {
    console.log(user)
  });

  let content;
  if (isLoadingUsers) {
    content =  <Skeleton times={6} className="h-10 w-full" />;
  }else if (loadingUsersError) {
    content =  <div>error fetching data </div>;
  }else{
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>+Add User</Button>
        { creatingUserError && 'Error Creating User...' }
      </div>
      {content}
    </div>
  );
};

export default UsersList;
