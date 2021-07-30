export function setCurrentUser(state, { token, user }) {
  token = `Bearer ${token}`;
  localStorage.setItem("apollo-token", token);
  state.token = token;
  state.currentUser = user;
}
