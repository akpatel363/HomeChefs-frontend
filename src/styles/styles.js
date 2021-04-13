export const formStyles = (theme) => ({
  root: {
    maxWidth: 400,
    margin: `2em auto`,
    padding: '4px',
    '& .MuiTextField-root': { marginBottom: theme.spacing(2) },
    '& .MuiAlert-root': { marginBottom: theme.spacing(2) },
  },
  icon: {
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  text: { textAlign: 'center' },
  form: { marginTop: theme.spacing(3) },
  link: { marginTop: theme.spacing(1) },
});

export const formHeaderStyles = (theme) => ({
  content: { textAlign: 'center', margin: theme.spacing(2, 0) },
  icon: {
    padding: 12,
    fontSize: 40,
    color: 'white',
    borderRadius: '50%',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  message: { marginBottom: theme.spacing(2) },
  form: { '& .MuiTextField-root': { margin: theme.spacing(1, 0) } },
  button: { margin: theme.spacing(0, 'auto') },
});
