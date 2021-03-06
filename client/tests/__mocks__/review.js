export default {
  postReviewSuccess: {
    id: 2,
    content: 'Nice recipe',
    createdAt: '25-05-2005',
    User: {
      fullName: 'James John',
      firstName: 'James',
      lastName: 'John',
      userImage: 'User image',
    },
  },
  postReviewFailure: {
    status: 'Fail',
    message: 'Error posting review',
  },
  postReviewSuccessResponse: {
    status: 'Success',
    message: 'Review created',
    data: {
      review: {
        id: 2,
        content: 'Nice recipe',
        createdAt: '25-05-2005',
        User: {
          fullName: 'James John',
          firstName: 'James',
          lastName: 'John',
          userImage: 'User image',
        },
      },
    },
  },
  deleteReviewSuccessResponse: {
    status: 'Success',
    message: 'Review deleted',
  },
  fetchReviewsSuccess: {
    reviews: [],
    reviewsCount: 0,
  },
  fetchReviewsFailure: {
    status: 'Fail',
    message: 'Error fetching reviews',
  },
  fetchReviewsSuccessResponse: {
    status: 'Success',
    message: 'Reviews retrieved',
    data: {
      reviews: [],
      reviewsCount: 0,
    }
  },
};
