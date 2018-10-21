import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeEventbrite } from '../../Utlis/Eventbrite';
// import { siteVars } from '../../config';

const getCode = (search) => {
  const codeRegex = /(?:code=)(\w*)/g;
  try {
    return codeRegex.exec(search)[1];
  } catch (err) {
    return {
      error: true,
    };
  }
};

class EventbriteReturn extends Component {
  componentWillMount() {
    const { search } = this.props;
    const code = getCode(search);

    authorizeEventbrite(code);
  }

  render() {
    return (
      <React.Fragment>
        Redirecting...
      </React.Fragment>
    );
  }
}

EventbriteReturn.propTypes = {
  search: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ });


export default connect(mapStateToProps, mapDispatchToProps)(EventbriteReturn);
