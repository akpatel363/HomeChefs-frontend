import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRedirect } from '../store/actions/auth';

import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ allow, path, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (!allow) dispatch(setRedirect(location.pathname));
  }, [dispatch, allow, location.pathname]);
  if (allow) return <Route path={path} {...rest} />;
  else return <Redirect to='/login' />;
};

export default PrivateRoute;
