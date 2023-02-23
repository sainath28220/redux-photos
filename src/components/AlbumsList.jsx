import { useFetchAlbumsQuery,useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const  [addAlbum, results] = useAddAlbumMutation(); //addAlbum is a function
  // console.log(results);

  const handleClick = () => {
    addAlbum(user);
  };
  
  let content;
  if(isLoading){
    content = <Skeleton times={3} />
  }else if(error){
    content = <div>Error loading albums.</div>
  }else{
    content = data.map(album => {
      const header = <div>{album.title}</div>
      return <ExpandablePanel key={album.id} header={header}>
        List of photos in the album.
      </ExpandablePanel>
    })
  }
  // console.log(result);

  //data : Data returned from the server
  //error: Error,if one occured
  //isLoading: True if currently loading data for the first time only
  //isFetching: True if currently loading data
  //refetch: function tell the query to re run
  return (
  <>
    <div>
      Albums for {user.name} 
      <Button onClick={handleClick}>
        +Add Album
      </Button>
    </div>
    <div>
      {content}
    </div>
  </>)
};

export default AlbumsList