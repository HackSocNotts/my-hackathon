import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { siteVars } from '../../config';

const getCode = (search) => {
  const codeRegex = /(?:code=)(\w*)/g;
  const errorRegex = /(?:error=)(\w*)/g;
  const errorDescriptionRegex = /(?:error_description=)(\w*)/g;
  try {
    return codeRegex.exec(search)[1];
  } catch (err) {
    try {
      return {
        error: true,
        code: errorRegex.exec(search)[1],
        message: errorDescriptionRegex.exec(search)[1],
      };
    } catch (err2) {
      return {
        error: true,
        code: 'unknown',
        message: 'an unknown error occured',
      };
    }
  }
};

class MyMLHReturn extends Component {
  render() {
    const { search } = this.props;
    const win = window.opener;
    win.postMessage({ myMlhCode: getCode(search) }, siteVars.websiteUrl);
    window.close();
    return (
      <React.Fragment>
        Redirecting...
      </React.Fragment>
    );
  }
}

MyMLHReturn.propTypes = {
  search: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ });


export default connect(mapStateToProps, mapDispatchToProps)(MyMLHReturn);
