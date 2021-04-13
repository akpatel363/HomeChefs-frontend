import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Icon,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { timeSince, image } from '../utils/filters';
import RatingChip from './RatingChip';

const useStyles = makeStyles((theme) => ({
  content: { flexGrow: 1 },
  subText: { marginTop: theme.spacing(1) },
  title: (posted) => ({
    marginBottom: theme.spacing(1),
    '& .MuiChip-root': {
      color: 'white',
      backgroundColor: posted
        ? theme.palette.success.main
        : theme.palette.error.main,
    },
  }),
  media: {
    flexBasis: '50%',
    paddingTop: '28%',
    [theme.breakpoints.down('xs')]: { width: '100%', paddingTop: '56%' },
  },
  root: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  },
}));

const RecipeChip = ({ recipe, onDelete }) => {
  const classes = useStyles(recipe.posted);
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/my/${recipe.id}`}
        className={classes.root}
      >
        <CardMedia
          title={recipe.name}
          className={classes.media}
          image={image(recipe.image)}
        />
        <CardContent className={classes.content}>
          <Text variant='h5' className={classes.title} noWrap>
            {recipe.name}{' '}
            <Chip
              size='small'
              label={recipe.posted ? 'Posted' : 'Not Posted'}
            />
          </Text>
          <div>
            <RatingChip stars={recipe.stars} />
            <Text noWrap className={classes.subText}>
              Last updated {timeSince(recipe.updated)}.
            </Text>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color='secondary'
          startIcon={<Icon>delete</Icon>}
          onClick={() => onDelete(recipe)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeChip;
