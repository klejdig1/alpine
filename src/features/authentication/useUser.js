import { DEFAULT_ADMIN_USER } from "../../services/apiAuth.js";

export function useUser() {
  return {
    user: DEFAULT_ADMIN_USER,
    isLoading: false,
    isAuthenticated: true,
  };
}
