export const DEFAULT_ADMIN_USER = {
  id: "admin-manager",
  aud: "authenticated",
  role: "authenticated",
  email: "manager@alpinehaven.com",
  user_metadata: {
    fullName: "Resort Manager",
    avatar: "/default-user.jpg",
  },
};

export async function signup({ fullName, email }) {
  return {
    user: {
      id: "user-" + Date.now(),
      email,
      user_metadata: {
        fullName,
        avatar: "/default-user.jpg",
      },
    },
  };
}

export async function login({ email }) {
  return {
    user: {
      ...DEFAULT_ADMIN_USER,
      email: email || DEFAULT_ADMIN_USER.email,
    },
    session: {
      user: DEFAULT_ADMIN_USER,
    },
  };
}

export async function getCurrentUser() {
  return DEFAULT_ADMIN_USER;
}

export async function logout() {
  return true;
}

export async function updateCurrentUser({ fullName, avatar }) {
  return {
    user: {
      ...DEFAULT_ADMIN_USER,
      user_metadata: {
        fullName: fullName || DEFAULT_ADMIN_USER.user_metadata.fullName,
        avatar: typeof avatar === "string" ? avatar : DEFAULT_ADMIN_USER.user_metadata.avatar,
      },
    },
  };
}
