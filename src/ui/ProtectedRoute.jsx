function ProtectedRoute({ children }) {
  // Login removed: visitors & reviewers are immediately granted access to the app
  return children;
}

export default ProtectedRoute;
