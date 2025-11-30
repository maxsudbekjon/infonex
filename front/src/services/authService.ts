// src/services/authService.ts

export const authService = {
  getAccess: () => localStorage.getItem("access"),
  getRefresh: () => localStorage.getItem("refresh"),

  saveTokens: (access: string, refresh: string) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  },

  saveAccess: (access: string) => {
    localStorage.setItem("access", access);
  },

  clear: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};
