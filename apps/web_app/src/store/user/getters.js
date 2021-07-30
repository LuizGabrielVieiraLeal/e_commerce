export function token(state) {
  return state.token;
}

export function currentUser(state) {
  return state.currentUser;
}

export function isUserAuthenticated(state) {
  return state.currentUser.role === "USER";
}
