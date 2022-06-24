import style from "../styles/Map.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import useStore from "../store/store.js";
import on from "../images/markerOn.png";
import off from "../images/markerOff.png";
import markerImage from "../images/marker.png";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function isPlay(time) {
  if (!time) return true;
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

const { kakao } = window;

function Map() {
  function getLocation() {
    let lat, long;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // lat = position.coords.latitude;
        // long = position.coords.longitude;
        lat = 37.3235993369;
        long = 127.0773597443;
        map.setCenter(new kakao.maps.LatLng(lat, long));
        const markerPosition = new kakao.maps.LatLng(lat, long);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(16, 16)),
        });
        marker.setMap(map);
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
      return;
    }
  }
  getLocation();

  const { storeList, setCurrentStore } = useStore();
  const [map, setMap] = useState(null);
  const mapEle = useRef();

  const markStore = useCallback((storeList) => {
    const imageSize = new kakao.maps.Size(32, 52);
    storeList.forEach(ele => {
      const imagePath = isPlay(ele.time) ? on : off;
      const markerImage = new kakao.maps.MarkerImage(imagePath, imageSize);
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(ele.lat, ele.long),
        title: ele.name,
        image: markerImage,
        clickable: true
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        setCurrentStore(ele);
      });
    })
  }, [map]);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const temp2 = new kakao.maps.Map(mapEle.current, options)
    const zoomControl = new kakao.maps.ZoomControl();
    temp2.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
    setMap(temp2);
    return () => { };
  }, []);

  useEffect(() => {
    markStore(storeList);
  }, [markStore, storeList]);

  return (
    <div className={style.mapContainer}>
      <div className={style.map} ref={mapEle}></div>
    </div>
  )
}

export default Map;