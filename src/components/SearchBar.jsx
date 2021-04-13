import { memo, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import { Icon, IconButton, Input } from '@material-ui/core';

const SearchBar = ({ placeholder }) => {
  const [text, setText] = useState('');
  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const query = parse(search.slice(1))['search'] || '';
    setText(query);
  }, [search]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text) return;
        const query = new URLSearchParams({ search: text });
        history.push({ search: query.toString() });
      }}
    >
      <Input
        fullWidth
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        startAdornment={
          search && (
            <IconButton onClick={() => history.goBack()}>
              <Icon>arrow_back</Icon>
            </IconButton>
          )
        }
        endAdornment={
          <IconButton type='submit' disabled={!text} color='secondary'>
            <Icon>search</Icon>
          </IconButton>
        }
      />
    </form>
  );
};

export default memo(SearchBar);
