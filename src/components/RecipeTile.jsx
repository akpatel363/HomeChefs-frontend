import {
  Card,
  CardActionArea,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { image } from '../utils/filters';
import RatingChip from './RatingChip';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0.5, 0.5),
    color: 'white',
    textAlign: 'center',
    '& .MuiCardActionArea-root': {
      boxSizing: 'border-box',
      padding: theme.spacing(4, 2),
    },
  },
}));

const RecipeTile = ({ recipe }) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.container}
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,.3), rgba(0,0,0,.7)), url(${image(
          recipe.image
        )}) center top no-repeat`,
      }}
    >
      <CardActionArea component={Link} to={`/recipes/${recipe.id}`}>
        <Text variant='h6' noWrap>
          {recipe.name}
        </Text>
        <RatingChip stars={recipe.stars} size='small' />
      </CardActionArea>
    </Card>
  );
};
export default memo(RecipeTile);
