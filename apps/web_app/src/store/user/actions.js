export function authenticate(context, data) {
  context.commit("setCurrentUser", data);
}

export function signout(context) {
  context.commit("unsetCurrentUser");
}
