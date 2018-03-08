import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/review';
import reviewMockData from '../__mocks__/review';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Review', () => {
  describe('add review action creator', () => {
    it('should create an action for add review request', () => {
      const expectedAction = {
        type: actionTypes.POST_REVIEW_REQUEST,
      };
      expect(actions.postReviewRequest()).toEqual(expectedAction);
    });
    it('should create an action for add recipe success', () => {
      const expectedAction = {
        type: actionTypes.POST_REVIEW_SUCCESS,
        payload: reviewMockData.postReviewSuccess,
      };
      expect(actions.postReviewSuccess(reviewMockData.postReviewSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for add recipe failure', () => {
      const expectedAction = {
        type: actionTypes.POST_REVIEW_FAILURE,
        payload: reviewMockData.postReviewFailure,
      };
      expect(actions.postReviewFailure(reviewMockData.postReviewFailure))
        .toEqual(expectedAction);
    });
  });
  describe('add review async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should add review', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: reviewMockData.postReviewSuccessResponse,
        });
      });
      const expectedActions = [
        actions.postReviewRequest(),
        actions.postReviewSuccess(
          reviewMockData.postReviewSuccessResponse.data.review)
      ];
      const store = mockStore({});

      return store.dispatch(actions.postReview(reviewMockData.reviewValue))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return an error for unsuccessful request', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: reviewMockData.postReviewFailureResponse,
        });
      });
      const expectedActions = [
        actions.postReviewRequest(),
        actions.postReviewFailure(
          reviewMockData.postReviewFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.postReview(reviewMockData.reviewValue))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
