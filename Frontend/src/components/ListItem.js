import style from "../styles/ListItem.module.css";
import { useState, useEffect, useRef } from "react";
import useStore from "../store/store.js";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function isPlay(time) {
  const now = new Date();
  const [nowHour, nowMin] = [now.getHours(), now.getMinutes()];
  const start = `${days[now.getDay()]}_start`;
  const [startHour, startMin] = time[start].split(":");
  const end = `${days[now.getDay()]}_end`;
  const [endHour, endMin] = time[end].split(":");
  if (Number(startHour) * 60 + Number(startMin) <= nowHour * 60 + nowMin && Number(endHour) * 60 + Number(endMin) >= nowHour * 60 + nowMin) {
    return true;
  } else {
    return false;
  }
}

function ListItem({ info }) {
  const { setCurrentStore } = useStore();
  const [play, setPlay] = useState(true);
  const list = useRef();

  const clickItem = () => {
    setCurrentStore(info);
  }

  useEffect(() => {
    if (info.time !== undefined) {
      setPlay(isPlay(info.time));
    }
    return () => { };
  }, [info.time]);

  return (
    <div className={style.listItemContainer} onClick={clickItem} ref={list}>
      <div>{info.category === 0 ? <span className={`${style.typeBox} ${style.zero}`}>약국</span> : <span className={`${style.typeBox} ${style.one}`}>편의점</span>}</div>
      <div>{info.name}</div>
      <div>{info.addressName}</div>
      <div>{info.phone}</div>
      <div>{play ? <span className={`${style.typeBox} ${style.play}`}>영업중</span> : <span className={`${style.typeBox} ${style.noPlay}`}>영업종료</span>}</div>
    </div>
  )
}

export default ListItem;