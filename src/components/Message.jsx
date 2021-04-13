import { Alert, AlertTitle } from '@material-ui/lab';
import { Fragment } from 'react';

const Message = ({ severity = 'error', message, ...rest }) => {
  if (typeof message === 'string')
    return (
      <Alert severity={severity} {...rest}>
        {message}
      </Alert>
    );
  return (
    <Alert severity={severity} {...rest}>
      {Object.keys(message).map((k) => (
        <Fragment key={k}>
          <AlertTitle style={{ margin: '4px 0 0' }}>{k}</AlertTitle>
          {typeof message === 'string' ? message : message[k]?.join(', ')}
        </Fragment>
      ))}
    </Alert>
  );
};

export default Message;
