import style from "./styles/App.module.css";
import Loading from "./components/Loading.js";
import Header from "./components/Header.js";
import Map from "./components/Map.js";
import Main from "./components/Main.js";
import { useState, useEffect } from "react";
import useStore from "./store/store.js";
import backA from "./images/backA.png";
import backB from "./images/backB.png";

import data from "./data/data.js";
function testData() {
  return data;
}

async function getInitStoreList() {
  const res = await fetch("api주소");
  const jsonRes = await res.json();
  return jsonRes;
}

function App() {
  const { setStoreList } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const value = getInitStoreList();
    const value = testData();
    setStoreList(value);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => { };
  }, []);

  return (
    <div className={style.app}>
      {isLoading ? <Loading /> : null}
      <img src={backA} alt="배경A" className={style.back} />
      <img src={backB} alt="배경B" className={style.back} />
      <div className={style.container}>
        <Header />
        <Map />
        <Main />
      </div>
    </div>
  );
}

export default App;
