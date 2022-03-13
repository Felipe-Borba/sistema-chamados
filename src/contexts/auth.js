import { createContext, useEffect, useState } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const USER_STORAGE = "SistemaUser";

  useEffect(() => {
    loadStorage();
  }, []);

  async function signUp({ email, senha, nome }) {
    setLoadingAuth(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {
        const { uid } = value.user;

        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome,
            avatarUrl: null,
          })
          .then(() => {
            const data = {
              uid,
              nome,
              email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoadingAuth(false);
  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem(USER_STORAGE);
    setUser(null);
  }

  function storageUser(data) {
    localStorage.setItem(USER_STORAGE, JSON.stringify(data));
  }

  function loadStorage() {
    const storageUser = localStorage.getItem(USER_STORAGE);

    if (storageUser) {
      setUser(JSON.parse(storageUser));
    } else {
      setUser(null);
    }

    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
