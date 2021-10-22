import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
// const UPLOAD = "UPLOAD";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
// const imageUpload = createAction(UPLOAD, (imageUrl) => ({ imageUrl }));

const initialState = {
  preview: null,
  // imageUrl: null,
};

export default handleActions(
  {
    // [UPLOAD]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.imageUrl = action.payload.imageUrl;
    //   }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  // imageUpload,
  setPreview,
};

export { actionCreators };


