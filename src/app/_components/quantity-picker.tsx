"useclient";

export function QuantityPicker({
  quantity,
  setQuantity,
  max,
}: {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  max: number;
}) {
  const changeQuantity = (delta: number) => {
    setQuantity(Math.min(Math.max(quantity + delta, 1), max));
  };

  return (
    <div className="flex justify-between items-center my-2 mx-4">
      <label>Quantity</label>
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center items-center w-10 h-10 text-3xl rounded-full transition-all active:scale-105 group bg-neutral-900 active:bg-neutral-950 active:text-neutral-400"
          onClick={() => changeQuantity(-1)}
        >
          <span className="transition-transform group-active:scale-105">-</span>
        </button>
        <span className="m-4 my-6">{quantity}</span>
        <button
          className="flex justify-center items-center w-10 h-10 text-3xl bg-green-600 rounded-full transition-all active:bg-green-700 active:scale-105 group active:text-neutral-400"
          onClick={() => changeQuantity(1)}
        >
          <span className="transition-transform group-active:scale-105">+</span>
        </button>
      </div>
    </div>
  );
}
