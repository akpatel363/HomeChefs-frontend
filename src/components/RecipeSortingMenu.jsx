import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'querystring';

const iconMapping = {
  stars: 'star',
  servings: 'people',
  created: 'date_range',
  cooking_time: 'timer',
};

const Item = ({ selected, select, icon, text, value = text.toLowerCase() }) => (
  <ListItem selected={value === selected} onClick={() => select(value)}>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </ListItem>
);

const RecipeSortingMenu = (props) => {
  const [selected, setSelected] = useState('created');
  const [ascending, setAscending] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    location: { search },
    push,
  } = useHistory();

  useEffect(() => {
    const current = parse(search.slice(1))['ordering'] || '-created';
    const currMode = !current.startsWith('-');
    setSelected(currMode ? current : current.slice(1));
    setAscending(currMode);
  }, [search]);

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<Icon>sort</Icon>}
        onClick={() => setOpen(!open)}
        endIcon={<Icon>{iconMapping[selected]}</Icon>}
      >
        Sort By
      </Button>
      <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
        <DialogTitle>Sort Recipes</DialogTitle>
        <DialogContent>
          <List>
            <Item
              icon='timer'
              text='Cooking Time'
              selected={selected}
              value='cooking_time'
              select={setSelected}
            />
            <Item
              icon='people'
              text='Servings'
              selected={selected}
              select={setSelected}
            />
            <Item
              text='Created'
              icon='date_range'
              selected={selected}
              select={setSelected}
            />
            <Item
              icon='star'
              text='Stars'
              selected={selected}
              select={setSelected}
            />
            <ListItem onClick={() => setAscending(!ascending)}>
              <ListItemIcon>
                <Icon>{ascending ? 'arrow_upward' : 'arrow_downward'}</Icon>
              </ListItemIcon>
              <ListItemText>
                {ascending ? 'Ascending' : 'Descending'}
              </ListItemText>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            color='secondary'
            onClick={() => {
              const query = new URLSearchParams(search);
              query.set('ordering', (ascending ? '' : '-') + selected);
              query.delete('page');
              setOpen(false);
              push(`/recipes?${query.toString()}`);
            }}
          >
            Sort
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(RecipeSortingMenu);
