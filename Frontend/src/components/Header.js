import style from "../styles/Header.module.css";
import logo from "../images/logo.png";

function Header() {
  const re = () => {
    window.location.reload();
  }
  return (
    <div className={style.headerContainer} onClick={re}>
      <img src={logo} alt="logo" className={style.logoImg}></img>
      <div className={style.titleBox}>
        <h1 className={style.title}>약속 : 약이 있는 곳이라면 확실하게</h1>
        <small className={style.subTitle}>Medicine inventory check and medication guide</small>
      </div>
    </div>
  )
}

export default Header;