// The Alpine Haven uses a high-performance in-memory self-contained session backend (localBackend.js).
// This mock client stub safely satisfies any legacy or third-party references without requiring network access.
export const supabaseUrl = "";

const supabaseMock = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};

export default supabaseMock;
