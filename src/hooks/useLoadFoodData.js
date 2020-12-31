import { LOAD_MENU } from "../actions/types";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadFoodData } from "../utils/utils";

function useLoadFoodData() {
  console.log("useLoadFoodData: init");
  const [stateAPIStatus, setAPIStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus("loading");
    console.log("useLoadFoodData:loading");
    loadFoodData()
      .then((data) => {
        console.log("useLoadFoodData:loaded");
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
