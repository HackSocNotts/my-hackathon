import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { siteVars } from '../../config';

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
  componentDidMount() {
    const { search } = this.props;
    const { websiteUrl } = siteVars;

    const code = getCode(search);
    const win = window.opener;
    win.postMessage({ code }, websiteUrl);
    window.close();
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
