import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { initializeAuthThunk, logoutBlockedUser } from '@/store/slices/auth.slice';
import { Loading } from '@/components/ui/loading';
import { store } from '@/store/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isInitialized, isBlocked } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const currentState = store.getState();
      const { token } = currentState.auth;
      
      if (token) {
        await dispatch(initializeAuthThunk());
      } else {
        await dispatch(initializeAuthThunk());
      }
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [dispatch, isInitialized]);

  // Check if user is blocked and logout if so
  useEffect(() => {
    if (isInitialized && isBlocked) {
      dispatch(logoutBlockedUser());
    }
  }, [dispatch, isInitialized, isBlocked]);

  if (!isInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthProvider;
