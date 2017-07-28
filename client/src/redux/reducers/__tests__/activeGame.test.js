import reducer from '../activeGame';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('activeGame reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.activeGame);
  });

  it('should handle MAKE_ACTIVE_GAME_SUCCEEDED', () => {
    const stubData = { title: 'Last Of Us' };
    expect(
      reducer({}, { type: types.MAKE_ACTIVE_GAME_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });

  it('should handle FETCH_PRICE_ALERT_SUCCEEDED', () => {
    const stubData = { activeGame: { title: 'Last Of Us' } };
    const expectedResult = { title: 'Last Of Us' };
    expect(
      reducer({}, { type: types.FETCH_PRICE_ALERT_SUCCEEDED, payload: stubData })
    ).toEqual(expectedResult);
  });

  it('should handle RESET_ACTIVE_GAME', () => {
    expect(
      reducer({}, { type: types.RESET_ACTIVE_GAME, payload: null })
    ).toEqual(initialState.activeGame);
  });

  it('should handle DELETE_PRICE_ALERT_SUCCEEDED', () => {
    expect(
      reducer({}, { type: types.DELETE_PRICE_ALERT_SUCCEEDED, payload: null })
    ).toEqual(initialState.activeGame);
  });
});
