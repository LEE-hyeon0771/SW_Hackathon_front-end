import style from "../styles/Overview.module.css";
import useStore from "../store/store.js";
import logo from "../images/noSelect.png";
import char from "../images/overview_char.png";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement('#root');

function Overview() {
  const { currentStore } = useStore();
  const [isModal, setIsModal] = useState(false);
  return (
    <div className={style.overviewContainer}>
      {currentStore ?
        <div className={style.temp}>
          <div className={style.imgContainer}>
            <img src={char} alt="재고보기 이미지" onClick={() => setIsModal(true)} />
            <Modal
              isOpen={isModal}
              onRequestClose={() => setIsModal(false)}
              className={style.Modal}
              overlayClassName={style.Overview}>
              <h2 className={style.title}>{currentStore.name}</h2>
              <div className={style.header}>
                <span>번호</span>
                <span>약품명</span>
                <span>재고</span>
              </div>
              <div className={style.listBox}>
                {currentStore.pharMedicines ? currentStore.pharMedicines.map((ele, index) => <div key={index}>
                  <span>{index + 1}</span>
                  <span>{ele.name}</span>
                  <span>{ele.stockNum}</span>
                </div>) : currentStore.convMedicines.map((ele, index) => <div key={index}>
                  <span>{index + 1}</span>
                  <span>{ele.name}</span>
                  <span>{ele.stockNum}</span>
                </div>)}
              </div>
              <button onClick={() => setIsModal(false)}>닫기</button>
            </Modal>
          </div>
          <div className={style.infoContainer}>
            <div>
              <div className={style.info}>
                <span className={currentStore.category === 0 ? `${style.zero}` : null}>이름</span>
                <div>{currentStore.name}</div>
              </div>
              <div className={style.info}>
                <span className={currentStore.category === 0 ? `${style.zero}` : null}>전화번호</span>
                <div>{currentStore.phone}</div>
              </div>
            </div>
            <div className={style.info}>
              <span className={currentStore.category === 0 ? `${style.zero}` : null}>지번주소</span>
              <div>{currentStore.addressName}</div>
            </div>
            <div className={style.info}>
              <span className={currentStore.category === 0 ? `${style.zero}` : null}>도로명주소</span>
              <div>{currentStore.roadAddressName}</div>
            </div>
          </div>
          <div className={style.timeContainer}>
            <span>운영시간</span>
            {currentStore.time ? <ul>
              <li>월요일 - {currentStore.time["mon_start"] ? `${currentStore.time["mon_start"]} ~ ${currentStore.time["mon_end"]}` : "휴무"}</li>
              <li>화요일 - {currentStore.time["tue_start"] ? `${currentStore.time["tue_start"]} ~ ${currentStore.time["tue_end"]}` : "휴무"}</li>
              <li>수요일 - {currentStore.time["wed_start"] ? `${currentStore.time["wed_start"]} ~ ${currentStore.time["wed_end"]}` : "휴무"}</li>
              <li>목요일 - {currentStore.time["thu_start"] ? `${currentStore.time["thu_start"]} ~ ${currentStore.time["thu_end"]}` : "휴무"}</li>
              <li>금요일 - {currentStore.time["fri_start"] ? `${currentStore.time["fri_start"]} ~ ${currentStore.time["fri_end"]}` : "휴무"}</li>
              <li>토요일 - {currentStore.time["sat_start"] ? `${currentStore.time["sat_start"]} ~ ${currentStore.time["sat_end"]}` : "휴무"}</li>
              <li>일요일 - {currentStore.time["sun_start"] ? `${currentStore.time["sun_start"]} ~ ${currentStore.time["sun_end"]}` : "휴무"}</li>
            </ul> : <div>
              상시운영</div>}

          </div>
        </div> :
        <img className={style.defaultImg} src={logo} alt="기본 이미지">
        </img>}
    </div>
  )
}

export default Overview;