import {
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
import { memo } from 'react';
import { image, timeSince, representTime } from '../utils/filters';
import TypeIcon from './TypeIcon';
import Anchor from './Anchor';
import TagChip from './TagChip';
import RatingChip from './RatingChip';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  media: { paddingTop: '56.25%', padding: 0 },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardActionArea-root': {
      flexGrow: 1,
    },
  },
  chips: {
    display: 'flex',
    margin: theme.spacing(1, 0),
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
      overflowX: 'hidden',
      '&:first-child': { overflow: 'visible' },
      '&:last-child': { marginRight: 0 },
    },
  },
  footer: {
    flexWrap: 'no-wrap',
    paddingLeft: theme.spacing(2),
    '& .MuiChip-root': { overflowX: 'hidden' },
  },
}));

const Recipe = ({ recipe }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea
        component='div'
        className={classes.action}
        onClick={() => history.push(`/recipes/${recipe.id}`)}
      >
        <CardMedia
          className={classes.media}
          image={image(recipe.image)}
          title={recipe.name}
        />
        <CardContent>
          <Text variant='h5'>{recipe.name}</Text>
          {recipe.author.name && (
            <Text variant='body2' noWrap>
              Posted by {recipe.author.name} {timeSince(recipe.created)}.
            </Text>
          )}
          <div className={classes.chips}>
            <RatingChip stars={recipe.stars} />
            <Chip
              variant='outlined'
              icon={<Icon>timer</Icon>}
              label={representTime(recipe.cooking_time)}
            />
            <Chip
              variant='outlined'
              icon={<Icon>people</Icon>}
              label={recipe.servings + ' Servings'}
            />
          </div>
          <Text>{recipe.short_description}</Text>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.footer}>
        <TypeIcon type={recipe.food_type} />
        {recipe.tags?.slice(0, 3).map((t) => (
          <TagChip key={t} tag={t} />
        ))}
      </CardActions>
    </Card>
  );
};

export default memo(Recipe);
