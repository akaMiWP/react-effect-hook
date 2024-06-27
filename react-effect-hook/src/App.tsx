import { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import Users from "./components/Users";

function App() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (ref.current) ref.current.focus();
  });

  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
      <div className="mb-3">
        <br></br>
        <CategoryList setCategory={setCategory} />
        <ProductList category={category} />
        <Users />
      </div>
    </div>
  );
}

export default App;
