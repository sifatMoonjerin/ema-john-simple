import React from 'react';
import Auth from './useAuth';


const Login = () => {
    const auth = Auth();

    const handleSignIn = async() => {
        try{
        await auth.signInWithGoogle()
        window.location.pathname = '/review'
        }catch(error){
            console.log(error)
        }
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(
            window.location.pathname = '/'
        )
    }

    return (
        <div>
            <h1>Join the party!</h1>
            {
                auth.user ? 
                <button onClick={handleSignOut}>Sign Out</button> : 
                <button onClick={handleSignIn}>Sign In With Google</button>
            }
            
        </div>
    );
};

export default Login;