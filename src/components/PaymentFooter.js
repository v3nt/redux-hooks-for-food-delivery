import { useSelector } from "react-redux";

function selectorCartPrice(state) {
  const { cartByIds, menuById } = state;
  let cartPrice = 0;

  const cartKeys = Object.keys(cartByIds);
  cartKeys.forEach((id) => {
    const item = menuById[id];
    const cartItem = cartByIds[id];

    const price = cartItem.quantity * item.price;
    cartPrice += price;
  });

  return cartPrice;
}

export function PaymentFooter() {
  const cartPrice = useSelector(selectorCartPrice);

  return (
    <footer>
      {cartPrice > 0 && (
        <a href="#payment" className="food-app-pay-btn" aria-live="polite">
          Pay for food (${cartPrice})
        </a>
      )}
    </footer>
  );
}
