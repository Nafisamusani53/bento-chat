// AuthListener.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '../../utils/supabase';
import { logout, setUser } from './authSlice';

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    // Get initial session if exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setUser({ user: session.user, session }));
      } else {
        dispatch(logout());
      }
    });

    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          dispatch(setUser({ user: session.user, session }));
        } else if (event === 'SIGNED_OUT') {
          dispatch(logout());
        } else if (event === 'TOKEN_REFRESHED') {
          dispatch(setUser({ user: session.user, session }));
        }
      }
    );

    // Cleanup function
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AuthListener;