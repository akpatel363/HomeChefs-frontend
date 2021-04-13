import { Button, Grid, Typography as Text } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils/filters';
import useAxios from '../hooks/useAxios';
import Spinner from './Spinner';
import FSError from './FullScreenError';

const AuthorDetails = (props) => {
  const { id } = useParams();
  const [{ loading, error, response }, retry] = useAxios(`authors/${id}/`);

  if (loading) return <Spinner />;

  if (error)
    return (
      <FSError icon='error' action={<Button onClick={retry}>Retry</Button>}>
        {error}
      </FSError>
    );

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12} sm={4} md={12}>
        <img src='/chef.svg' alt='Chef Avatar' style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={8} md={12}>
        <Text variant='h5'>{response.name}</Text>
        <Text>@{response.username}</Text>
        <Text>Joined {formatDate(response.date_joined)}</Text>
      </Grid>
    </Grid>
  );
};

export default AuthorDetails;
