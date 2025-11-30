export const authLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
  