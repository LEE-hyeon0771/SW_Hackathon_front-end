import style from "../styles/Main.module.css";
import SearchBox from "./SearchBox.js";
import ListBox from "./ListBox.js";
import Overview from "./Overview.js";
import char from "../images/monster.png";

function Main() {
  return (
    <div className={style.mainContainer}>
      <img src={char} alt="캐릭터 이미지" className={style.char} />
      <SearchBox />
      <ListBox />
      <Overview />
    </div>
  )
}

export default Main;