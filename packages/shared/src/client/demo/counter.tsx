import useRGS from "r18gs";

const RGS_COUNTER_KEY = "counter";

export const CounterController = () => {
  const [counter, setCounter] = useRGS(RGS_COUNTER_KEY, 0);
  return <input type="number" value={counter} onChange={e => setCounter(Number(e.target.value))} />;
};

export const CounterDisplay = () => {
  const [counter] = useRGS(RGS_COUNTER_KEY, 0);
  return <div>{counter}</div>;
};
