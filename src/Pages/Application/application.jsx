import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DashboardContainer from '../../Containers/Dashboard';
import { getApplication } from '../../Modules/Application';
import ApplicationFrom from './form';

class Application extends Component {
  constructor(props) {
    super(props);
    const { loadApplication } = props;
    loadApplication();
  }

  render() {
    const {
      application,
    } = this.props;

    return application.isLoaded === true ? (
      <DashboardContainer>
        <ApplicationFrom />
      </DashboardContainer>
    ) : (
      <DashboardContainer>
        Loading...
      </DashboardContainer>
    );
  }
}

Application.propTypes = {
  loadApplication: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired,
};

// eslint-disable-next-line
const mapStateToProps = state => ({
  application: state.application,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ 
  loadApplication: () => dispatch(getApplication()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Application);
