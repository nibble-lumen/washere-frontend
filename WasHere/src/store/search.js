import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { apiCallBegan } from "./api";

import { GOOGLE_API_KEY } from "@env";

import { API_ERROR_MESSAGE } from "../config/config.json";

const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    activeTabRoute: "",
    places: [],
    people: [],
    posts: [],
    tags: [],
    recentPostsQuery: "",
    feed: {
      posts: [],
      lastPostId: null,
    },
  },
  reducers: {
    requestStarted: (search, action) => {
      search.loading = true;
    },

    tabRouteChanged: (search, action) => {
      const { query } = action.payload;
      search.activeTabRoute = query;
    },

    placesSearched: (search, action) => {
      const { predictions } = action.payload;
      search.places = predictions;
    },

    peopleSearched: (search, action) => {
      const { data } = action.payload;
      search.people = data;
    },

    tagsSearched: (search, action) => {
      const { data } = action.payload;
      search.tags = data.tags;
    },

    feedFetched: (search, action) => {
      const { data, isReload } = action.payload;
      if (isReload) {
        search.feed.posts = data.posts;
      } else {
        search.feed.posts = search.feed.posts.concat(data.posts);
      }
      search.feed.lastPostId = data.lastPostId;
      search.loading = false;
    },

    recentQueryChanged: (search, action) => {
      const { query } = action.payload;
      search.recentPostsQuery = query;
    },

    requestFailed: (search, action) => {
      search.loading = false;
      showMessage({
        message: API_ERROR_MESSAGE,
        description: action.payload,
        type: "warning",
        autoHide: true,
      });
    },
  },
});

export const {
  requestStarted,
  tabRouteChanged,
  requestFailed,
  placesSearched,
  peopleSearched,
  tagsSearched,
  feedFetched,
  recentQueryChanged,
} = slice.actions;
export default slice.reducer;

export const searchPlaces = (input) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      method: "GET",
      data: "",
      params: { inputtype: "textquery", input, key: GOOGLE_API_KEY },
      onStart: requestStarted.type,
      onSuccess: placesSearched.type,
      onError: requestFailed.type,
    }),
  );
};

export const searchPeople = (query) =>
  apiCallBegan({
    url: `/search/people`,
    method: "POST",
    data: { query },
    onStart: requestStarted.type,
    onSuccess: peopleSearched.type,
    onError: requestFailed.type,
  });

export const searchTags = (query) =>
  apiCallBegan({
    url: `/search/tags`,
    method: "POST",
    data: { query },
    onStart: requestStarted.type,
    onSuccess: tagsSearched.type,
    onError: requestFailed.type,
  });

export const getFeedByTag = (query, lastPostId) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/post/by-tag`,
      method: "GET",
      data: "",
      params: { number: 5, query, lastPostId },
      onStart: requestStarted.type,
      onSuccess: feedFetched.type,
      onError: requestFailed.type,
      passData: { isReload: lastPostId ? false : true },
    }),
  );
};

export const getFeed = (lastPostId) => (dispatch, getState) => {
  const userId = getState().auth.user.id;

  dispatch(
    apiCallBegan({
      url: `/user/${userId}/feed`,
      method: "GET",
      data: "",
      params: { number: 5, lastPostId },
      onStart: requestStarted.type,
      onSuccess: feedFetched.type,
      onError: requestFailed.type,
      passData: { isReload: lastPostId ? false : true },
    }),
  );
};

export const getRecentFeed = (filter, lastPostId) => (dispatch, getState) => {
  const userId = getState().auth.user.id;

  dispatch(
    apiCallBegan({
      url: `/user/${userId}/feed/filtered`,
      method: "GET",
      data: "",
      params: { number: 5, lastPostId, filter },
      onStart: requestStarted.type,
      onSuccess: feedFetched.type,
      onError: requestFailed.type,
    }),
  );
};

export const changeRecentQuery = (query) => (dispatch) => {
  dispatch({ type: recentQueryChanged.type, payload: { query } });
};

export const changeTabRoute = (query) => (dispatch) => {
  dispatch({ type: tabRouteChanged.type, payload: { query } });
};
