import { describe, it, expect } from 'vitest';
import { authReducer } from './auth-slice';
import { AuthorizationStatus } from '../../../constants/auth';
import { checkAuthAction, loginAction, logoutAction } from '../../actions/auth-actions/auth-actions';
import { mockUserInfo } from '../../../mocks/user';

describe('authReducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle checkAuthAction.fulfilled', () => {
    const actual = authReducer(initialState, checkAuthAction.fulfilled(mockUserInfo, '', undefined));
    expect(actual.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    expect(actual.userInfo).toEqual(mockUserInfo);
  });

  it('should handle checkAuthAction.rejected', () => {
    const actual = authReducer(
      { ...initialState, userInfo: mockUserInfo, authorizationStatus: AuthorizationStatus.Auth },
      checkAuthAction.rejected(null, '', undefined)
    );
    expect(actual.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    expect(actual.userInfo).toBeNull();
  });

  it('should handle loginAction.fulfilled', () => {
    const actual = authReducer(initialState, loginAction.fulfilled(mockUserInfo, '', { email: 'test@test.com', password: 'password1' }));
    expect(actual.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    expect(actual.userInfo).toEqual(mockUserInfo);
  });

  it('should handle logoutAction.fulfilled', () => {
    const actual = authReducer(
      { authorizationStatus: AuthorizationStatus.Auth, userInfo: mockUserInfo },
      logoutAction.fulfilled(undefined, '', undefined)
    );
    expect(actual.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    expect(actual.userInfo).toBeNull();
  });
});
