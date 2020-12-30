import React from "react";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../types/";

export function MenuItem(props) {
  const { item } = props;

  const cartByIds = useSelector((state) => state.cartByIds);
  const dispatch = useDispatch();

  const quantity = cartByIds[item.id]?.quantity ?? 0;

  function handleIncrement() {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        itemId: item.id,
      },
    });
  }

  function handleDecrement() {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        itemId: item.id,
      },
    });
  }

  const addBtn = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-add"
      onClick={handleIncrement}
    >
      Add <IconPlus />
    </button>
  );

  const increaseBtn = (
    <button
      aria-label={`Add ${item.label} to cart`}
      className="menu-btn-item"
      onClick={handleIncrement}
    >
      <IconPlus />
    </button>
  );

  const decreaseBtn = (
    <button
      aria-label={`Remove ${item.label} from cart`}
      className="menu-btn-item"
      onClick={handleDecrement}
    >
      <IconMinus />
    </button>
  );

  const qtyIndicator = (
    <div className="menu-item-qty" role="status" aria-live="polite">
      {quantity}
    </div>
  );

  return (
    <li className="menu-item">
      <div>
        <div className="menu-item-title">
          <h4>{item.label}</h4>
          <span>(${item.price})</span>
        </div>
        <p className="menu-item-description">{item.description}</p>
      </div>
      {quantity === 0 ? (
        addBtn
      ) : (
        <div className="menu-btn-group">
          {decreaseBtn}
          {qtyIndicator}
          {increaseBtn}
        </div>
      )}
    </li>
  );
}

// source- https://feathericons.com/
export function IconPlus() {
  return (
    <svg
      className="icon-plus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

// source- https://feathericons.com/
export function IconMinus() {
  return (
    <svg
      className="icon-minus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
