import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import userReducer, { setUser, clearUser } from '../redux/user/userSlice';
import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = jsdom.window;
global.document = window.document;

// Configure Enzyme
configure({ adapter: new Adapter() });

// Initialize the LocalStorageMock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(), // Add this line
  clear: jest.fn()
};
global.localStorage = localStorageMock;

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
  
    expect(nextState.user).toBeNull();
    expect(nextState.isLoading).toBe(false);
  });
});
