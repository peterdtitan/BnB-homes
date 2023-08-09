import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchCityData,
  initialState,
} from '../redux/city/citySlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('citySlice async actions', () => {
  it('should successfully fetch city data', async () => {
    const expectedData = [{ id: 1, name: 'City A' }, { id: 2, name: 'City B' }];

    const fetchMock = jest.fn(async () => ({
      json: async () => expectedData,
    }));

    global.fetch = fetchMock;

    const store = mockStore({ city: initialState });

    await store.dispatch(fetchCityData());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchCityData.pending.type);
    expect(actions[1].type).toBe(fetchCityData.fulfilled.type);
    expect(actions[1].payload).toEqual(expectedData);
  });

  it('should handle fetch city data failure', async () => {
    const errorMessage = 'An error occurred';

    const fetchMock = jest.fn(async () => {
      throw new Error(errorMessage);
    });

    global.fetch = fetchMock;

    const store = mockStore({ city: initialState });

    await store.dispatch(fetchCityData());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchCityData.pending.type);
    expect(actions[1].type).toBe(fetchCityData.rejected.type);
    expect(actions[1].error.message).toBe(errorMessage);
  });
});
