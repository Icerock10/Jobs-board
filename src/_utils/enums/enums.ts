enum Headers {
  AUTHORIZATION = 'authorization'
}
enum ApiListingsPath {
  ALL = '/api/published',
  SECURED = '/api/listings/',
}
enum ApiUserPath {
  REGISTER = '/api/user/register',
  LOGIN = '/api/user/login'
}
enum AppPath {
  HOME = '/',
  LISTINGS = '/listings',
  LOGIN = '/login',
  SIGNUP = '/signup',
  EDIT = '/edit/',
  CREATE = '/create',
  JOBS = '/jobs',
  TASKS = '/tasks'
}
enum SortingOrder {
  DESCENDING = 'Desc',
  ASCENDING = 'Asc'
}
enum ErrorMessage {
  EXPIRED_TOKEN = 'The Token expired',
  NOT_FOUND_TOKEN = 'Token was not found',
  NOT_FOUND_USER = 'The user was not found',
  INVALID_EMAIL = 'The email is invalid',
  USER_EXISTS = 'The user exists',
  SERVER_ERROR = 'Error occurred on server',
  NOT_FOUND_LISTING = 'Listing was not found'
}
enum ResponseMessage {
  CREATE_ON_SUCCESS = 'Successfully created',
  UPDATE_ON_SUCCESS = 'Successfully updated',
  DELETE_ON_SUCCESS = 'Successfully deleted',
  PUBLISH_ON_SUCCESS = 'Successfully published'
}
enum HttpStatus {
  OK = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}
enum StorageKey {
  TASKS = 'tasks',
  HIDDEN = 'hidden',
  LIKED = 'liked',
  MODAL = 'isModalWatched'
}
export { AppPath, ApiUserPath, ApiListingsPath, Headers, ErrorMessage, HttpStatus, SortingOrder, StorageKey, ResponseMessage };