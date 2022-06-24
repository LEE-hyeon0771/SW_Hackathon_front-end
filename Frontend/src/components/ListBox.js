import style from "../styles/ListBox.module.css";
import ListItem from "./ListItem.js";
import useStore from "../store/store.js";

function ListBox() {
  const { storeList } = useStore();

  return (
    <div className={style.listBoxContainer}>
      <div className={style.header}>
        <span>구분</span>
        <span>이름</span>
        <span>주소</span>
        <span>전화번호</span>
        <span>영업여부</span>
      </div>
      <div className={style.listBox}>
        {storeList.map((ele, index) => <ListItem key={index} info={ele} />)}
      </div>

    </div >
  )
}

export default ListBox;