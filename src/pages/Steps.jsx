import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  ingredients: { fontWeight: 300 },
  heading: { margin: theme.spacing(1, 0) },
  avatar: { backgroundColor: theme.palette.secondary.main },
  root: {
    '& > .MuiDivider-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

const Steps = (props) => {
  const classes = useStyles();
  const { ingredients, steps } = useSelector((s) => s.activeRecipe.details);

  return (
    <div className={classes.root}>
      <Text variant='h5' className={classes.heading}>
        Ingredients
      </Text>
      <Text variant='h6' className={classes.ingredients}>
        {ingredients.join(', ')}
      </Text>
      <Divider />
      <Text variant='h5' className={classes.heading}>
        Steps
      </Text>
      <List>
        {steps.map((item, i) => (
          <Fragment key={`${item}_${i}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>{i + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItem>
            {i + 1 !== steps.length && <Divider />}
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default Steps;
