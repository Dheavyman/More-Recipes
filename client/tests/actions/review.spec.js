import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/review';
import reviewMockData from '../__mocks__/review';
import recipeMockData from '../__mocks__/recipe';

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
  describe('fetch review action creator', () => {
    it('should create an action for fetch review request', () => {
      const expectedAction = {
        type: actionTypes.FETCH_REVIEWS_REQUEST,
      };
      expect(actions.fetchReviewsRequest()).toEqual(expectedAction);
    });
    it('should create an action for fetch review success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_REVIEWS_SUCCESS,
        payload: {
          reviews: reviewMockData.fetchReviewsSuccess.reviews,
          reviewsCount: reviewMockData.fetchReviewsSuccess.reviewsCount,
        },
      };
      expect(actions.fetchReviewsSuccess(
        reviewMockData.fetchReviewsSuccess.reviews,
        reviewMockData.fetchReviewsSuccess.reviewsCount))
        .toEqual(expectedAction);
    });
    it('should create an action for fetch review failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_REVIEWS_FAILURE,
        payload: reviewMockData.fetchReviewsFailure,
      };
      expect(actions.fetchReviewsFailure(reviewMockData.fetchReviewsFailure))
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
  describe('delete review async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should delete user reviews', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: reviewMockData.deleteReviewSuccessResponse,
        });
      });
      const expectedAction = [{
        type: actionTypes.DELETE_REVIEW,
        payload: 1,
      }];
      const store = mockStore({});

      return store.dispatch(actions.deleteReview(recipeMockData.recipeId, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
  describe('clear review action', () => {
    it('should dispatch action to clear reviews', () => {
      const expectedAction = [{
        type: actionTypes.CLEAR_ALL_REVIEWS,
      }];
      const store = mockStore({});

      store.dispatch(actions.clearReviews());
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  describe('fetch reviews async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch reviews', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: reviewMockData.fetchReviewsSuccessResponse,
        });
      });
      const expectedActions = [
        actions.fetchReviewsRequest(),
        { type: actionTypes.FETCHED_ALL_REVIEWS },
        actions.fetchReviewsSuccess(
          reviewMockData.fetchReviewsSuccessResponse.data.reviews,
          reviewMockData.fetchReviewsSuccessResponse.data.reviewsCount)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchReviews(reviewMockData.reviewValue))
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
          response: reviewMockData.fetchReviewsFailure,
        });
      });
      const expectedActions = [
        actions.fetchReviewsRequest(),
        actions.fetchReviewsFailure(
          reviewMockData.fetchReviewsFailure)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchReviews(reviewMockData.reviewValue))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
