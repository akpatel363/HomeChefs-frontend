import { Link as MuiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Anchor = ({ to, children }) => (
  <MuiLink component={Link} to={to}>
    {children}
  </MuiLink>
);

export default Anchor;
