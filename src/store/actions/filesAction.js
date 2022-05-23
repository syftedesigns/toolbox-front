import { GET_FILES, FILES_ERROR, API_URL } from "../types";
import axios from "axios";

export const getFiles = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/data/files`);
    dispatch({
      type: GET_FILES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: FILES_ERROR,
      payload: e,
    });
  }
};
