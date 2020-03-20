import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import React, { useState, createContext, useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = props => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = usr => {
  const { displayName, email, photoURL } = usr;
  return { name: displayName, email, photo: photoURL };
};

const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then(result => {
        const signedInUser = getUser(result.user);
        setUser(signedInUser);
        return user;
      })
      .catch(error => {
        console.log(error.message);
        return error.message;
      });
  };

  const signOut = () => {
    return firebase.auth().signOut()
    .then(()=>{
        setUser(null);
        console.log("logged out");
    })
    .catch (error => {
        console.log(error.message);
    })
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(usr) {
      if (usr) {
        const currentUser = getUser(usr);
        setUser(currentUser);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return {
    user,
    signInWithGoogle,
    signOut
  };
};

export default Auth;
