import { useFetchAlbumsQuery } from '../store'
import Skeleton from './Skeleton';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  // console.log(result);

  //data : Data returned from the server
  //error: Error,if one occured
  //isLoading: True if currently loading data for the first time only
  //isFetching: True if currently loading data
  //refetch: function tell the query to re run
  return <div>
    Albums for {user.name} 
  </div>
};

export default AlbumsList