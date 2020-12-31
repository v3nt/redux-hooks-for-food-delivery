import React, { Fragment, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { CHANGE_DIET } from "./actions/types";

import allActions from "./actions/";

import { MenuList, Message, PaymentFooter } from "./Comps";

import useLoadFoodData from "./hooks/useLoadFoodData";

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
      type: CHANGE_DIET,
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

// export default App;
export default connect(null, allActions)(App);
// export default connect(initialState, actions)(App);

function selectorMenu(state) {
  const { diet, menuIdList, menuById } = state;
  const menuId = menuIdList[diet];
  const menuList = [];

  menuId.forEach((id) => {
    menuList.push(menuById[id]);
  });

  return menuList;
}
