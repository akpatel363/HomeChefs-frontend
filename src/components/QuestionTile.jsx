import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { memo } from 'react';
import { timeSince } from '../utils/filters';

const useStyles = makeStyles((theme) => ({
  span: { color: theme.palette.secondary.main },
  card: {
    height: '100%',
    '& .MuiButton-root, .MuiTypography-root:last-child': {
      margin: theme.spacing(1, 0, -1),
    },
  },
}));

const Question = ({ question, onSelect }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Text>
          {question.question} Asked by{' '}
          <span className={classes.span}>{question.by.name}</span>{' '}
          {timeSince(question.created)}.
        </Text>

        {question.answer ? (
          <Text variant='body2'>
            {question.answer?.response} Posted{' '}
            <span className={classes.span}>
              {timeSince(question.answer?.created)}.
            </span>
          </Text>
        ) : (
          <Button
            color='secondary'
            variant='outlined'
            onClick={() => onSelect(question)}
          >
            Respond
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(Question);
