import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from 'utils/theme';
import ParticipantCard from 'components/ParticipantCard';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import styles from './styles';

const TrieSearch = require('trie-search');

class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { participants } = this.props;
    const trie = new TrieSearch('name');
    trie.addAll(participants);
    this.setState({
      trie,
    });
  }

  handleChange(e) {
    const searchVal = e.target.value;
    if (searchVal === '') {
      this.setState({
        participants: this.props.participants,
      });
      return;
    }
    const participants = this.state.trie.get(searchVal);
    this.setState({
      participants,
    });
  }

  render() {
    const { classes } = this.props;
    let participantsList = this.state.participants.map(p => (
      <ParticipantCard key={p.id} participant={p}></ParticipantCard>
    ));

    if (this.state.participants.length === 0) {
      participantsList = <p>There are no participants to show.</p>;
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.dashboard}>
          <Navbar isAdmin={this.props.isAdmin} />
          <div className={classes.content}>
            <h1>Participant Dashboard</h1>
            <div className={classes.tableContainer}>
              <div>
                <div className={classes.searchBar}>
                  <InputBase
                    placeholder="filter participants"
                    onChange={this.handleChange}
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>PARTICIPANT</th>
                      <th>STATUS</th>
                      <th>PAPERWORK</th>
                      <th>CASE NOTES</th>
                      <th>FORM STATUS</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>{participantsList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

StaffDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  participants: PropTypes.array,
  isAdmin: PropTypes.bool.isRequired,
};

export default withStyles(styles)(StaffDashboard);
