export function authenticate(context, data) {
  context.commit("setCurrentUser", data);
}
