export function setCurrentUser(state, { token, user }) {
  state.token = `Bearer ${token}`;
  state.currentUser = user;
}
