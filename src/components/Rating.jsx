import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { Rating as Stars } from '@material-ui/lab';
import { memo } from 'react';
import { timeSince } from '../utils/filters';

const useStyles = makeStyles((theme) => ({
  avatar: { backgroundColor: theme.palette.secondary.main },
  body: { paddingTop: 0 },
  date: { margin: theme.spacing(1, 0, -1, 0) },
}));

const Rating = ({ rating }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {rating.by.name[0].toUpperCase()}
          </Avatar>
        }
        title={rating.by.name}
        subheader={<Stars readOnly size='small' value={rating.stars} />}
      />
      <CardContent className={classes.body}>
        <Text>
          {rating.edited ? <b> (Edited) </b> : null}
          {rating.body}
        </Text>
        <Text color='textSecondary' className={classes.date}>
          {timeSince(rating.updated)}
        </Text>
      </CardContent>
    </Card>
  );
};

export default memo(Rating);
