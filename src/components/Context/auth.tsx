import { getMe, postChangePassword, postLogin, postLogout, postRegister } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ChangePasswordPayload, LoginPayload, RegisterPayload } from '@/services/auth/auth.dto';
import { UserResponseData } from '@/services/user/users.dto';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

type AuthContextProps = {
  user: UserResponseData | null;
  loading: boolean;
  error: boolean;
  isAuthenticated?: boolean;
  isPasswordChanged?: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  register: (payload: RegisterPayload) => void;
  changePassword: (payload: ChangePasswordPayload) => void;
};

const defaultValue: AuthContextProps = {
  loading: false,
  error: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  changePassword: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, isPasswordChanged, loading, error } = useAppSelector((state) => state.auth);

  const login = (payload: LoginPayload) => dispatch(postLogin(payload));
  const logout = () => dispatch(postLogout());
  const register = (payload: RegisterPayload) => dispatch(postRegister(payload));
  const changePassword = (payload: ChangePasswordPayload) => {
    dispatch(postChangePassword(payload));
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch, isAuthenticated, isPasswordChanged]);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, isPasswordChanged, error, login, logout, register, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
