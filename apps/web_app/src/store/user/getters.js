export function token(state) {
  return state.token;
}

export function currentUser(state) {
  return state.currentUser;
}

export function isUserAuthenticated(state) {
  return (
    state.token === localStorage.getItem("apollo-token") &&
    state.currentUser.role === "USER"
  );
}
