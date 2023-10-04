const EMAIL_PATTERN = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
const HEADER_TITLE = 'Demo Project';
const FOOTER_TEXT = 'Thanks for your attention.';
const BODY_TEXT = 'This is a demo version of the Job Board project. The tasks functionality is a client ONLY, however, the listings feature has API using the Next server. In this project, I\'ve used experimental features which may slow down the App a little bit.';
const EXPIRED_IN_TWO_WEEKS = '14d';
const listing = {
  title: '',
  companyName: '',
  location: '',
  url: '',
  type: '',
  experienceLevel: '',
  salary: 0,
  shortDescription: '',
  fullDescription: '',
  isPublished: false,
  isHidden: false,
  draft: '',
  _id: '',
};

export { EMAIL_PATTERN, EXPIRED_IN_TWO_WEEKS, listing,BODY_TEXT, HEADER_TITLE, FOOTER_TEXT };