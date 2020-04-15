const styles = theme => ({
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  formStyle: {
    width: '400px',
    height: '40%',
    padding: '10px',
    minHeight: '300px',
  },
  iconStyle: {
    boxShadow: 'None',
  },
  searchBar: {
    width: '100%',
    borderStyle: 'solid',
    padding: '0px',
    '& input': {
      padding: '5px 5px',
    },
    backgroundColor: theme.palette.common.searchBox,
  },
  listStyle: {
    overflow: 'auto',
    width: '100%',
    maxHeight: '100%',
    height: '30vh',
    minHeight: '240px',
    marginBottom: '20px',
  },
  noActionItemsDisplay: {
    width: '100%',
    height: '50%',
    display: 'block',
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '10px',
    textAlign: 'center',
  },
});

export default styles;
