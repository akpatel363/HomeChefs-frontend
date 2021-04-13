import {
  Icon,
  IconButton,
  AppBar,
  Button,
  Toolbar,
  Typography as Text,
  Drawer,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/actions/auth';

const useStyles = makeStyles((theme) => ({
  title: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  root: { flexGrow: 1 },
  btnContainer: {
    [theme.breakpoints.down('xs')]: { display: 'none' },
  },
  actionList: { minWidth: 220 },
}));

const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchor = useRef(0);
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleClick = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              onClick={() => setOpen(!open)}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Text variant='h6' className={classes.title}>
              HomeChefs
            </Text>
            {user ? (
              <>
                <IconButton ref={anchor} color='default' onClick={handleClick}>
                  <Icon>account_circle</Icon>
                </IconButton>
                <Menu
                  anchorEl={anchor.current}
                  open={menuOpen}
                  onClose={handleClick}
                >
                  <MenuItem
                    component={Link}
                    to='/profile/edit'
                    onClick={handleClick}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(logOut());
                      handleClick();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className={classes.btnContainer}>
                <Button component={Link} to='/login' color='inherit'>
                  Login
                </Button>
                <Button component={Link} to='/register' color='inherit'>
                  Register
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
        <div className={classes.actionList} onClick={() => setOpen(false)}>
          <ListItem button component={Link} to='/recipes'>
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <Divider />
          {user ? (
            <>
              <ListItem button component={Link} to='/dashboard'>
                <ListItemIcon>
                  <Icon>dashboard</Icon>
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
              <ListItem button component={Link} to='/profile/edit'>
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
              <ListItem button onClick={() => dispatch(logOut())}>
                <ListItemIcon>
                  <Icon>clear</Icon>
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to='/login'>
                <ListItemIcon>
                  <Icon>person</Icon>
                </ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
              <ListItem button component={Link} to='/register'>
                <ListItemIcon>
                  <Icon>add_user</Icon>
                </ListItemIcon>
                <ListItemText primary='Register' />
              </ListItem>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default memo(Navbar);
