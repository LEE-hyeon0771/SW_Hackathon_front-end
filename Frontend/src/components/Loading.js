import style from "../styles/Loading.module.css";
import loadingChar from "../images/loading_char.png";
import { useEffect, useRef } from "react";

function Loading() {
  const prog = useRef();

  useEffect(() => {
    prog.current.style.width = "190px";
  }, []);

  return (
    <div className={style.loadingContainer}>
      <div className={style.loadingBox}>
        <div className={style.charBox}>
          <img className={style.char} src={loadingChar} alt="로딩 이미지" />
        </div>
        <p className={style.loadingText}>
          약이 필요하실 때,<br />
          언제든 당신의 약도가 되어드립니다.
        </p>
        <div className={style.progBox}>
          <div className={style.prog} ref={prog} />
          <div className={style.progText}>약속으로 들어가는 중..</div>
        </div>
      </div>
    </div>
  )
}

export default Loading;