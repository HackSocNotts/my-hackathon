import { siteVars } from '../../../config';

const hackathonDate = Date.parse(siteVars.hackathonDate);

// eslint-disable-next-line
const RFC5322 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validate = (values) => {
  const errors = {};

  const birthDateSeconds = Date.parse(values.birthdate);
  const age = new Date(hackathonDate - birthDateSeconds);

  /**
   * NAME
   */
  // Name is required
  if (!values.name) {
    errors.name = 'Name is required.';
  }

  // Email is requried
  if (!values.email) {
    errors.email = 'Email is required.';
  // Must be valid email
  } else if (!RFC5322.test(values.email.toLowerCase())) {
    errors.email = 'Email is invalid.';
  }

  // Phone is requried
  if (!values.phone) {
    errors.phone = 'Phone is required';
  }

  // Birth Date is required
  if (!values.birthdate) {
    errors.birthdate = 'Birth Date is required';
  // Must be 18
  } if ((age.getUTCFullYear() - 1970) < 18) {
    errors.birthdate = 'You must be 18 or older when the hackathon starts.';
  }

  // School is required
  if (!values.school) {
    errors.school = 'You must provide us with what school you go to.';
  }

  // Major is requried
  if (!values.major) {
    errors.major = 'You must provide your major.';
  }

  // Level of study is required
  if (!values.levelOfStudy) {
    errors.levelOfStudy = 'You must provide us with your current level of study';
  }

  // Grduation year is requide
  if (!values.graduation) {
    errors.graduation = 'You must provide your graduation year.';
  }

  // Gender is requried
  if (!values.gender) {
    errors.gender = 'You must either let us know your gender or chose not to say.';
  }

  // ethnicity is requried
  if (!values.ethnicity) {
    errors.ethnicity = 'You must provide us with details of your ethnicity or chose not to say.';
  }

  // dietaryRestrictions is required
  if (!values.dietaryRestrictions) {
    errors.dietaryRestrictions = 'You must specify whether or not you have dietary restrictions';
  }

  // Shirt size is required
  if (!values.shirtSize) {
    errors.shirtSize = 'You must provide a shirt size.';
  }

  // MLH code of conduct is required
  if (!values.mlhCoC) {
    errors.mlhCoC = 'You must agree to the MLH Code of Conduct.';
  }

  // MLH privacy policy is required
  if (!values.mlhPrivacy) {
    errors.mlhPrivacy = 'You must aggree to the MLH Privacy Policy.';
  }

  // MLh contest terms are requried.
  if (!values.mlhContest) {
    errors.mlhContest = 'You must aggree to the MLH Contest Terms and Conditions.';
  }

  return errors;
};

export default validate;
