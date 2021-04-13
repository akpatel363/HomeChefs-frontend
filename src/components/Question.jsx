import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  makeStyles,
  Typography as Text,
} from '@material-ui/core';
import { formatDate, timeSince } from '../utils/filters';

const useStyles = makeStyles((theme) => ({
  span: { color: theme.palette.secondary.main },
  root: { '& .MuiAccordionSummary-content': { alignItems: 'center' } },
  icon: (isAnswered) => ({
    backgroundColor: isAnswered
      ? theme.palette.success.main
      : theme.palette.error.main,
    color: 'white',
    borderRadius: '50%',
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(2),
  }),
}));

const Question = ({ question, expanded, onChange }) => {
  const classes = useStyles(!!question.answer);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => onChange(question.id)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        className={classes.root}
        expandIcon={<Icon>expand_more</Icon>}
      >
        <Icon className={classes.icon}>
          {question.answer ? 'check' : 'close'}
        </Icon>
        <Text>
          {question.question} Asked by{' '}
          <span className={classes.span}>{question.by.name}</span> on{' '}
          {formatDate(question.created)}.
        </Text>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <Text>{question.answer?.response || 'Not answered yet.'}</Text>
          {question.answer && (
            <Text variant='body2' style={{ marginTop: 4 }}>
              Answered {timeSince(question.answer.created)}
            </Text>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Question;
