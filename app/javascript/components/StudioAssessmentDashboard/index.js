import React from 'react';
import PropTypes from 'prop-types';
import StudioAssessmentCard from 'components/StudioAssessmentCard';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from 'utils/theme';
import styles from './styles';

class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: this.props.assessments,
    };
  }

  render() {
    const { classes } = this.props;
    const assessmentsList = this.state.assessments.map(p => (
      <StudioAssessmentCard key={p.id} assessment={p} />
    ));
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.dashboard}>
          <div className={classes.content}>
            <h1>Studio Assessments</h1>
            <div className={classes.tableContainer}>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Big Picture</th>
                      <th>Prog Fundamentals</th>
                      <th>Version Control </th>
                      <th>React </th>
                      <th>Node </th>
                      <th>Db</th>
                    </tr>
                  </thead>
                  <tbody>{assessmentsList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

StudioAssessmentDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  assessments: PropTypes.array,
};

export default withStyles(styles)(StudioAssessmentDashboard);
