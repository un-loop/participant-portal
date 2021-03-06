import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import styles from './styles';

class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }

  showParticipant() {
    const pId = this.props.assessment.participant_id;
    window.location.assign(`participants/${String(pId)}`);
  }

  render() {
    const { assessment } = this.props;
    const bigPic = assessment.bigpicture_score;
    const prog = assessment.progfundamentals_score;
    const vc = assessment.versioncontrol_score;
    const react = assessment.react_score;
    const node = assessment.node_score;
    const db = assessment.db_score;
    const probSolve = assessment.problemsolving_score;
    const probSolveAlt = assessment.problemsolvingalt_score;
    const { classes } = this.props;
    const currCategory = this.props.selectedCat;
    return (
      <>
        <TableCell
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {this.props.assessment.participant_name}
        </TableCell>
        <TableCell
          className={
            currCategory === 'bigpictureScore' ? classes.selected : null
          }
        >
          {bigPic}
        </TableCell>
        <TableCell
          className={
            currCategory === 'progfundamentalsScore' ? classes.selected : null
          }
        >
          {prog}
        </TableCell>
        <TableCell
          className={
            currCategory === 'versioncontrolScore' ? classes.selected : null
          }
        >
          {vc}
        </TableCell>
        <TableCell
          className={currCategory === 'reactScore' ? classes.selected : null}
        >
          {react}
        </TableCell>
        <TableCell
          className={currCategory === 'dbScore' ? classes.selected : null}
        >
          {db}
        </TableCell>
        <TableCell
          className={currCategory === 'nodeScore' ? classes.selected : null}
        >
          {node}
        </TableCell>
        <TableCell
          className={
            currCategory === 'problemsolvingScore' ? classes.selected : null
          }
        >
          {probSolve}
        </TableCell>
        <TableCell
          className={
            currCategory === 'problemsolvingaltScore' ? classes.selected : null
          }
        >
          {probSolveAlt}
        </TableCell>
      </>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object.isRequired,
  selectedCat: PropTypes.string,
};

export default withStyles(styles)(StudioAssessmentCard);
