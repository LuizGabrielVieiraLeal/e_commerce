export function setCurrentUser(state, { token, user }) {
  token = `Bearer ${token}`;
  localStorage.setItem("apollo-token", token);
  state.token = token;
  state.currentUser = user;
}

export function unsetCurrentUser(state) {
  localStorage.setItem("apollo-token", "");
  state.token = null;
  state.currentUser = {};
}
