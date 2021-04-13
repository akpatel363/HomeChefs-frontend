import { memo } from 'react';
import { makeStyles, Typography as Text } from '@material-ui/core';

const colorMapping = {
  Vegetarian: '#21ab4a',
  Eggetarian: '#f7c30e',
  'Non-Vegetarian': '#e61b23',
};

const useStyles = makeStyles((theme) => ({
  icon: (props) => ({
    display: 'inline-block',
    minWidth: 30,
    minHeight: 30,
    position: 'relative',
    boxSizing: 'border-box',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: props.color,
    margin: theme.spacing(1, 0),
    '&::before': {
      content: '" "',
      height: 15,
      width: 15,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      borderRadius: '50%',
      backgroundColor: props.color,
    },
  }),
  vegan: {
    display: 'inline-block',
    userSelect: 'none',
    minWidth: 30,
    minHeight: 30,
    lineHeight: '30px',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    fontSize: 20,
    textAlign: 'center',
    margin: theme.spacing(1, 0),
  },
}));

const TypeIcon = ({ type }) => {
  const classes = useStyles({
    color: colorMapping[type] || colorMapping['Vegetarian'],
  });
  if (type === 'Vegan') {
    return (
      <Text component='span' className={classes.vegan}>
        V
      </Text>
    );
  }
  return <span className={classes.icon}></span>;
};

export default TypeIcon;
