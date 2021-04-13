import { Pagination as MuiPagination } from '@material-ui/lab';
import { memo, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },
}));

const Pagination = ({ count, perPage = 12 }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const page = parseInt(parse(location.search.slice(1))['page']) || 1;
    setPage(page);
  }, [location]);

  return (
    <div className={classes.root}>
      <MuiPagination
        page={page}
        color='secondary'
        count={Math.ceil(count / perPage)}
        onChange={(_, value) => {
          const search = new URLSearchParams(location.search);
          search.set('page', value);
          history.push({
            pathname: location.pathname,
            search: search.toString(),
          });
        }}
      />
    </div>
  );
};

export default memo(Pagination);
