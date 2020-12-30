import { useEffect, useState } from "react";

function useLoadFoodData() {
  const [stateAPIStatus, setAPIStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus("loading");
    loadFoodData()
      .then((data) => {
        dispatch({
          type: ACTIONS.LOAD_MENU,
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
