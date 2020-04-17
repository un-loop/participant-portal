import React from 'react';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'components/Navbar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import ActionItemCreationContainer from 'components/ActionItemCreationContainer';
import ActionItemSearchParticipants from 'components/ActionItemSearchParticipants';
import ActionItemList from 'components/ActionItemList';
import ActionItemDisplayParticipants from 'components/ActionItemDisplayParticipants';
import { apiPost } from 'utils/axios';
import styles from './styles';

class ActionItemCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      participants: this.props.participants,
      selectedParticipants: [],
      actionItemTitle: '',
      actionItemDescription: '',
      actionItemDueDate: '',
      actionItemCategory: null,
      unselectedTemplateActionItems: this.props.templates,
      selectedActionItems: [],
    };

    this.addUserToState = this.addUserToState.bind(this);
    this.removeUserFromState = this.removeUserFromState.bind(this);
    this.addAllUsersToState = this.addAllUsersToState.bind(this);
    this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.getMainComponents = this.getMainComponents.bind(this);
    this.getButtonsGrid = this.getButtons.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createActionItem = this.createActionItem.bind(this);
    this.selectActionItemTemplate = this.selectActionItemTemplate.bind(this);
    this.removeSelectedActionItem = this.removeSelectedActionItem.bind(this);
  }

  handleChange(name) {
    return event => {
      const { value } = event.target;
      this.setState({ [name]: value });
    };
  }

  removeSelectedActionItem(actionItem) {
    if (actionItem.is_template) {
      this.setState(prevState => ({
        unselectedTemplateActionItems: [
          actionItem,
          ...prevState.unselectedTemplateActionItems,
        ],
      }));
    }

    this.setState(prevState => {
      const filteredActionItems = prevState.selectedActionItems.filter(
        item => item !== actionItem,
      );
      return { selectedActionItems: filteredActionItems };
    });
  }

  createActionItem(saveToTemplates) {
    const {
      actionItemTitle,
      actionItemDescription,
      actionItemCategory,
      actionItemDueDate,
    } = this.state;

    if (
      actionItemTitle === '' ||
      actionItemDescription === '' ||
      actionItemCategory === null
    ) {
      return;
    }

    if (saveToTemplates) {
      const template = {
        title: actionItemTitle,
        description: actionItemDescription,
        category: actionItemCategory,
      };
      apiPost('/api/assignments/templates', { assignment: template })
        .then(resp => console.log(resp))
        .catch(error => console.log(error));
    }
    const actionItem = {
      title: actionItemTitle,
      description: actionItemDescription,
      category: actionItemCategory,
      dueDate: actionItemDueDate,
    };
    this.setState(prevState => ({
      selectedActionItems: [actionItem, ...prevState.selectedActionItems],
      actionItemTitle: '',
      actionItemDescription: '',
      actionItemDueDate: '',
      actionItemCategory: null,
    }));
  }

  selectActionItemTemplate(actionItemId) {
    const templates = [...this.state.unselectedTemplateActionItems];
    const index = templates.findIndex(
      actionItem => actionItem.id === actionItemId,
    );

    if (index !== -1) {
      const actionItem = templates.splice(index, 1)[0];
      this.setState(prevState => ({
        selectedActionItems: [actionItem, ...prevState.selectedActionItems],
        unselectedTemplateActionItems: templates,
      }));
    }
  }

  // TODO: Use addActionItemCard in ActionItemCreation Container
  // TODO: Pass down appropriate edit/delete buttons!
  // Create callback functions for actionItemCards.

  nextStep() {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  }

  prevStep() {
    this.setState(prevState => ({ step: prevState.step - 1 }));
  }

  addUserToState(user) {
    this.setState(prevState => ({
      selectedParticipants: [...prevState.selectedParticipants, user],
    }));
  }

  // Removes user from display
  removeUserFromState(user) {
    this.setState(prevState => {
      const copy = [...prevState.selectedParticipants];
      const index = this.state.selectedParticipants.indexOf(user);
      copy.splice(index, 1); // Removes one element at `index` location
      return { selectedParticipants: copy };
    });
  }

  // Adds all users at once to be displayed
  addAllUsersToState() {
    this.setState(prevState => ({
      selectedParticipants: prevState.participants,
    }));
  }

  // Removes all users at once from display
  removeAllUsersFromState() {
    this.setState({
      selectedParticipants: [],
    });
  }

  getMainComponents(stepSize) {
    let leftComponent;
    let rightComponent;
    switch (stepSize) {
      case 0:
        leftComponent = (
          <ActionItemList
            selectedActionItems={this.state.selectedActionItems}
            removeSelectedActionItem={this.removeSelectedActionItem}
          />
        );
        rightComponent = (
          <ActionItemCreationContainer
            templates={this.state.unselectedTemplateActionItems}
            title={this.state.actionItemTitle}
            setTitle={this.handleChange('actionItemTitle')}
            description={this.state.actionItemDescription}
            setDescription={this.handleChange('actionItemDescription')}
            categorySelected={this.state.actionItemCategory}
            setCategory={this.handleChange('actionItemCategory')}
            dueDate={this.state.actionItemDueDate}
            setDueDate={this.handleChange('actionItemDueDate')}
            createActionItem={this.createActionItem}
            selectActionItemTemplate={this.selectActionItemTemplate}
          />
        );
        break;
      case 1:
        leftComponent = (
          <ActionItemDisplayParticipants
            selectedParticipants={this.state.selectedParticipants}
          />
        );
        rightComponent = (
          <ActionItemSearchParticipants
            participants={this.state.participants}
            selectedParticipants={this.state.selectedParticipants}
            statuses={this.props.statuses}
            addUser={this.addUserToState}
            removeUser={this.removeUserFromState}
            addAllUsers={this.addAllUsersToState}
            removeAllUsers={this.removeAllUsersFromState}
          />
        );
        break;
      case 2:
        leftComponent = (
          <ActionItemDisplayParticipants
            selectedParticipants={this.state.selectedParticipants}
          />
        );
        rightComponent = (
          <ActionItemList
            selectedActionItems={this.state.selectedActionItems}
            removeSelectedActionItem={this.removeSelectedActionItem}
          />
        );
        break;
      default:
        leftComponent = null;
        rightComponent = null;
    }
    return { leftComponent, rightComponent };
  }

  getButtons(stepSize) {
    const { classes } = this.props;

    switch (stepSize) {
      case 0:
        return (
          <Grid
            container
            item
            direction="row-reverse"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Fab
                className={classes.iconStyle}
                component="span"
                variant="extended"
                size="medium"
                aria-label="category"
                onClick={this.nextStep}
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  SAVE & CONTINUE
                </Typography>
              </Fab>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid
            container
            item
            direction="row-reverse"
            alignItems="center"
            spacing={3}
          >
            {' '}
            <Grid item>
              <Fab
                className={classes.iconStyle}
                component="span"
                variant="extended"
                size="medium"
                aria-label="category"
                onClick={this.nextStep}
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  SAVE & CONTINUE
                </Typography>
              </Fab>
            </Grid>
            <Grid item>
              <Fab
                className={classes.iconStyle}
                component="span"
                variant="extended"
                size="medium"
                aria-label="category"
                onClick={this.prevStep}
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  BACK
                </Typography>
              </Fab>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid
            container
            item
            direction="row-reverse"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Fab
                className={classes.iconStyle}
                component="span"
                variant="extended"
                size="medium"
                aria-label="category"
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  ASSIGN
                </Typography>
              </Fab>
            </Grid>
            <Grid item>
              <Fab
                className={classes.iconStyle}
                component="span"
                variant="extended"
                size="medium"
                aria-label="category"
                onClick={this.prevStep}
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  BACK
                </Typography>
              </Fab>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  }

  render() {
    const { classes } = this.props;
    const { leftComponent, rightComponent } = this.getMainComponents(
      this.state.step,
    );
    const buttonsGrid = this.getButtonsGrid(this.state.step);

    return (
      <Grid container style={{ height: '100vh', width: '100vw' }}>
        <Grid item xs={1}>
          <Navbar isAdmin={this.props.isAdmin} />
        </Grid>
        <Grid item container xs={11} justify="center">
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs={11}
            spacing={2}
          >
            <Grid container item direction="row" justify="flex-start">
              <Grid item>
                <Typography className={classes.topLeftTextStyle}>
                  Add Assignments to List
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              spacing={1}
              className={classes.mainBackgroundStyle}
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography className={classes.underlineStyle}>
                  Assignments
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {leftComponent}
              </Grid>
              <Grid item>
                <Typography className={classes.underlineStyle}>
                  Assignments
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {rightComponent}
              </Grid>
            </Grid>
            {buttonsGrid}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ActionItemCreationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  statuses: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  participants: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemCreationPage);
