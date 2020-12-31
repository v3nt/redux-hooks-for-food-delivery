import { LOAD_MENU } from "../actions/types";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadFoodData } from "../utils/utils";

function useLoadFoodData() {
  const [stateAPIStatus, setAPIStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus("loading");
    loadFoodData()
      .then((data) => {
        dispatch({
          type: LOAD_MENU,
          payload: {
            menu: data,
          },
        });
        setAPIStatus("success");
      })
      .catch((error) => {
        setAPIStatus("error");
      });
  }, [dispatch]);

  return stateAPIStatus;
}

export default useLoadFoodData;
