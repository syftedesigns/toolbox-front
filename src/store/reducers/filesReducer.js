import { GET_FILES, FILES_ERROR } from "../types";

const initialState = {
  files: [],
  loading: true,
};

const FilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
        loading: false,
      };
    case FILES_ERROR:
      return {
        ...state,
        files: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default FilesReducer;
