import userReducer, { setUser, clearUser } from '../redux/user/userSlice';

describe('userSlice reducers', () => {
  it('should handle setUser', () => {
    const initialState = {
      user: null,
      isLoading: false,
      error: null,
    };

    const action = setUser({ id: 1, name: 'John' });

    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual({ id: 1, name: 'John' });
    expect(nextState.isLoading).toBe(false);
  });

  it('should handle clearUser', () => {
    const initialState = {
      user: { id: 1, name: 'John' },
      isLoading: false,
      error: null,
    };

    const action = clearUser();

    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual({});
    expect(nextState.isLoading).toBe(false);
  });
});
