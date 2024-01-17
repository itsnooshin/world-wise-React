import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// funcrion provider
const initalState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
    name: 'Jack',
    email: 'jack@example.com',
    password: 'qwerty',
    avatar: 'https://i.pravatar.cc/100?u=zz',
  };

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.playLoad, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unkown  action!');
  }
}



function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initalState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', playLoad: FAKE_USER });
  }
  function logout() {
    dispatch({ type: 'logout' });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  console.log(context);
  if (context === undefined) throw new Error('There');

  return context;
}

export { useAuth, AuthProvider };
