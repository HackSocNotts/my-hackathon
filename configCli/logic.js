const firebaseClient = require('firebase-tools');

const init = () => {
  firebaseClient.list()
    .then(data => console.log(data))
    .catch(err => console.error(err));
};

const setAdminEmail = (email) => {
  arguments[0] = `admin.email="${email}"`;
  arguments[1] = `admin.email="${email}"`;
  console.log(arguments[0]);
  firebaseClient.functions.config.set()
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

module.exports = { init, setAdminEmail };
