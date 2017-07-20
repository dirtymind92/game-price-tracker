import { all, call, put, takeLatest } from 'redux-saga/effects';
import Client from '../Client';
import sonyStore from '../sonyStore';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


function* fetchAllGamesInDb(action) {
    try {
        const allGames = yield call(Client.findAllGames);
        yield put({ type: 'FETCH_ALL_GAMES_IN_DB_SUCCEEDED', allGames });
    } catch (e) {
        yield put({ type: 'FETCH_ALL_GAMES_IN_DB_FAILED', message: e.message });
    }
}

function* findNewGames(action) {
    try {
        const games = yield call(sonyStore.findNewGames, action.payload.maxResults);
        yield put({ type: 'FIND_NEW_GAMES_SUCCEEDED', games });
    } catch (e) {
        yield put({ type: 'FIND_NEW_GAMES_FAILED', message: e.message });
    }
}

function* searchTitle(action) {
    try {
        const searchResults = yield call(sonyStore.findGameByTitle, action.payload.title);
        yield put({ type: 'SEARCH_BY_TITLE_SUCCEEDED', searchResults });
    } catch (e) {
        yield put({ type: 'SEARCH_BY_TITLE_FAILED', message: e.message });
    }
}

function* generateAutoSuggestions(action) {
    try {
        const autoSuggestions = yield call(sonyStore.findGameByTitle, action.payload.title, action.payload.maxResults);
        yield put({ type: 'GENERATE_AUTO_SUGGESTIONS_SUCCEEDED', autoSuggestions });
    } catch (e) {
        yield put({ type: 'GENERATE_AUTO_SUGGESTIONS__FAILED', message: e.message });
    }
}

function* makeActiveGame(action) {
    try {
        yield put(showLoading());
        const activeGame = yield call(sonyStore.findGameById, action.payload.gameId);
        yield put({ type: 'MAKE_ACTIVE_GAME_SUCCEEDED', activeGame });
    } catch (e) {
        yield put({ type: 'MAKE_ACTIVE_GAME_FAILED', message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

function* submitPriceAlert(action) {
    try {
        const priceAlert = yield call(Client.createPriceAlert, action.payload.priceAlertInfo);
        yield put({ type: 'SUBMIT_PRICE_ALERT_SUCCEEDED', priceAlert });
    } catch (e) {
        yield put({ type: 'SUBMIT_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* fetchPriceAlert(action) {
    try {
        const userInfo = yield call(Client.findOnePriceAlert, action.payload._id);
        const activeGame = yield call(sonyStore.findGameById, userInfo.game_id);
        const gameAndUserInfo = { userInfo, activeGame };
        yield put({ type: 'FETCH_PRICE_ALERT_SUCCEEDED', gameAndUserInfo });
    } catch (e) {
        yield put({ type: 'FETCH_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* deletePriceAlert(action) {
    try {
        const priceAlert = yield call(Client.deletePriceAlert, action.payload.userInfo);
        yield put({ type: 'DELETE_PRICE_ALERT_SUCCEEDED', priceAlert });
    } catch (e) {
        yield put({ type: 'DELETE_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* checkBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.checkBlacklist, action.payload.userEmail);
        yield put({ type: 'CHECK_BLACKLIST_SUCCEEDED', blacklistInfo });
    } catch (e) {
        yield put({ type: 'CHECK_BLACKLIST_FAILED', message: e.message });
    }
}

function* addToBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.addToBlacklist, action.payload.userEmail);
        yield put({ type: 'ADD_TO_BLACKLIST_SUCCEEDED', blacklistInfo });
    } catch (e) {
        yield put({ type: 'ADD_TO_BLACKLIST_FAILED', message: e.message });
    }
}


function* gamePriceTrackerSagas() {
    yield all([
        takeLatest('FETCH_ALL_GAMES_IN_DB_REQUESTED', fetchAllGamesInDb),
        takeLatest('FIND_NEW_GAMES_REQUESTED', findNewGames),
        takeLatest('GENERATE_AUTO_SUGGESTIONS_REQUESTED', generateAutoSuggestions),
        takeLatest('SEARCH_BY_TITLE_REQUESTED', searchTitle),
        takeLatest('MAKE_ACTIVE_GAME_REQUESTED', makeActiveGame),
        takeLatest('SUBMIT_PRICE_ALERT_REQUESTED', submitPriceAlert),
        takeLatest('CHECK_BLACKLIST_REQUESTED', checkBlacklist),
        takeLatest('ADD_TO_BLACKLIST_REQUESTED', addToBlacklist),
        takeLatest('FETCH_PRICE_ALERT_REQUESTED', fetchPriceAlert),
        takeLatest('DELETE_PRICE_ALERT_REQUESTED', deletePriceAlert)
    ]);
}


export default gamePriceTrackerSagas;