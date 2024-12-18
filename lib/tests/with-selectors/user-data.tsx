import { useRef } from "react";
import { useStore } from "./store";

export function UserData() {
  const [{ user }, setState] = useStore(/^user$/);
  const renderCount = useRef(0);
  renderCount.current++;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const age = Number(formData.get("age"));
    setState(state => ({ ...state, user: { name, age }, name }));
  };
  return (
    <div>
      <h1>UserData</h1>
      <small>renderCount = {renderCount.current}</small>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" defaultValue={user.name} />
        <input type="number" name="age" defaultValue={user.age} />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}
