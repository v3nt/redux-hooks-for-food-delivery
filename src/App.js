import React, { Fragment, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { ACTIONS } from "./redux";
// import * as actions from "./actions";

import { MenuList, Message, PaymentFooter } from "./Comps";
import { loadFoodData } from "./utils";

const App = () => {
  const diet = useSelector((state) => state.diet);
  const dispatch = useDispatch();

  const stateAPIStatus = useLoadFoodData();
  const menuList = useSelector(selectorMenu, shallowEqual);

  useEffect(() => {
    console.log("SERVER_EVENT: menu list changed");
  }, [menuList]);

  function handleVegToggle() {
    dispatch({
      type: ACTIONS.CHANGE_DIET,
    });
  }

  return (
    <div className="food-app">
      <header>
        <h1>Ordux</h1>
        <label>
          <input
            type="checkbox"
            name="veg-checkbox"
            value={diet}
            checked={diet === "veg"}
            onChange={handleVegToggle}
          />
          Veg Only
        </label>
      </header>
      <Message status={stateAPIStatus} />
      {stateAPIStatus === "success" && (
        <Fragment>
          <main>
            <MenuList menuList={menuList} />
          </main>
          <PaymentFooter />
        </Fragment>
      )}
    </div>
  );
};

// const initialState = {
//   diet: "all",
//   menuById: {},
//   menuIdList: {
//     all: [],
//     veg: [],
//   },
//   cartByIds: {},
// };

export default App;
// export default connect(initialState, actions)(App);

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

function selectorMenu(state) {
  const { diet, menuIdList, menuById } = state;
  const menuId = menuIdList[diet];
  const menuList = [];

  menuId.forEach((id) => {
    menuList.push(menuById[id]);
  });

  return menuList;
}
