import style from "../styles/SearchBox.module.css";
import { useState } from 'react';
import useStore from "../store/store.js";

const Big_DATA = [
    '증상별 대분류', '소화기관', '감기질환', '외용약', '비뇨생식기 의약품', '이비인후과', '치과', '자양강장제', '심장 신경과제',
    '치질', '알레르기', '기타'
]

const Small_DATA = {
    '증상별 대분류': ['증상별 소분류'],
    '소화기관': ['소화제', '제산제', '이담제', '지사제', '변비약'],
    '감기질환': ['해열진통제', '소염효소제'],
    '외용약': ['파스', '무좀약', '비듬약', '발모제', '티눈약', '화농성질환약', '구내염치료제'],
    '비뇨생식기 의약품': ['피임약', '생식기약'],
    '이비인후과': ['이비인후과'],
    '치과': ['치과'],
    '자양강장제': ['간장약', '혈액순환제', '비타민류', '철분제', '칼슘제', '단백아미노산제'],
    '심장 신경과제': ['강심제'],
    '치질': ['먹는 약'],
    '알레르기': ['먹는 약'],
    '기타': ['구충제', '멀미약']
}



function SearchBox() {
    const { storeList, setStoreList } = useStore();

    const [currentBigType, setcurrentBigType] = useState("증상별 대분류");
    const [SmallType, setSmallType] = useState("증상별 소분류");

    const onChange = (e) => {
        setcurrentBigType(e.target.value);
    }

    const gara = () => {
        setStoreList(storeList.slice(2, 5));
    }

    return (
        <div className={style.searchBoxContainer}>
            <select onChange={onChange} className={style.bigCate}>
                {Big_DATA.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
            <select onChange={e => setSmallType(e.target.value)} value={SmallType} className={style.smallCate}>
                {currentBigType ? Small_DATA[currentBigType].map(e => <option key={e}>{e}</option>) : null}
            </select>
            <input type="text" placeholder="찾을 약품을 검색해주세요" style={style.mainContainer} className={style.searchText} />
            <button className={style.searchBtn} onClick={gara}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default SearchBox;