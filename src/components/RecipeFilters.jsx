import { Badge, Button, Dialog, DialogTitle, Icon } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import FilterForm from './FilterForm';

const RecipesFilters = (props) => {
  const { search } = useLocation();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const count = Object.entries(parse(search.slice(1)))
      .filter(([k, _]) => k !== 'page' && k !== 'ordering' && k !== 'search')
      .reduce((p, [_, v]) => (v ? p + 1 : p), 0);
    setCount(count);
  }, [search]);

  return (
    <>
      <Badge badgeContent={count} color='secondary'>
        <Button
          variant='outlined'
          onClick={() => setOpen(!open)}
          startIcon={<Icon>filter_list</Icon>}
        >
          Filters
        </Button>
      </Badge>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Filter Recipes</DialogTitle>
        <FilterForm close={setOpen} />
      </Dialog>
    </>
  );
};

export default memo(RecipesFilters);
