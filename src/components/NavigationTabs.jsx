import { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const NavigationTabs = ({ tabs = [], children }) => {
  const [page, setPage] = useState(0);
  const {
    location: { pathname: path },
  } = useHistory();

  useEffect(() => {
    const activeTab = tabs.findIndex((t) => path.endsWith(t));
    setPage(activeTab > -1 ? activeTab : 0);
  }, [path, tabs]);

  return (
    <Tabs
      centered
      value={page}
      textColor='secondary'
      style={{ margin: '16px 0' }}
    >
      {children}
    </Tabs>
  );
};

export default NavigationTabs;
