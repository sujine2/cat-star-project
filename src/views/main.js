import React from "react";
import "./main.css";
import planet from "../img/catStar.png";
import twitter from "../img/twitter.png";
import rocket from "../img/rocket.png";
import tele from "../img/tele.png";
import { Link } from "react-router-dom";
import { klaytn, caver } from "../wallet/caver";
import { prepare } from "klip-sdk";
import QRModal from "../components/QRModal";
import QRCode from "qrcode";
import klip from "../img/Klip.png";
import { Cookies } from "react-cookie";

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Main() {
  const cookies = new Cookies();
  const [QRurl, setQRurl] = React.useState("");
  const [key, setKey] = React.useState("");
  const [QRModalShow, setQRModalShow] = React.useState(false);
  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = [
    "opacity1",
    "opacity1",
    "opacity1",
    "opacity2",
    "opacity2",
    "opacity3",
  ];
  var widthWindow = window.innerWidth;
  var heightWindow = window.innerHeight;
  var set;
  return (
    <div className="planet">
      <div className="bar">
        <div className="barContent">
          <div className="barTitle">Cat-planet</div>

          <div className="barRight">
            {klaytn.selectedAddress}
            {klaytn.selectedAddress === undefined ? (
              <button
                className="mainWalletConnect"
                onClick={async () => {
                  if (klaytn === undefined) {
                    alert("카이카스 지갑을 설치해 주세요!");
                  } else {
                    await klaytn.enable();
                    window.location.reload();
                  }
                }}
              >
                Kaikas로 로그인
              </button>
            ) : (
              <button className="mainWalletConnect">Kaikas 연결됨</button>
            )}

            {cookies.get("user") === undefined ? (
              <button
                className="mainKlipConnect"
                onClick={async () => {
                  const bappName = "cat-planet";
                  const res = await prepare.auth({
                    bappName,
                  });
                  if (res.err) {
                    alert(
                      "카카오톡 클립(Klip) 인증 오류가 발행하였습니다. 나중에 다시 시도해 주세요."
                    );
                    // 에러 처리
                  } else if (res.request_key) {
                    // request_key 보관

                    await setKey(res.request_key);

                    QRCode.toDataURL(
                      "https://klipwallet.com/?target=/a2a?request_key=" +
                        res.request_key,
                      function (err, url) {
                        setQRurl(url);
                        setQRModalShow(true);
                      }
                    );
                  }
                }}
              >
                <img
                  style={{ width: 30, height: 30, marginRight: 5 }}
                  src={klip}
                ></img>
                Klip으로 로그인
              </button>
            ) : (
              <button className="mainKlipConnect">
                <img
                  style={{ width: 30, height: 30, marginRight: 5 }}
                  src={klip}
                ></img>
                Klip 연결됨
              </button>
            )}

            <QRModal
              show={QRModalShow}
              onHide={() => setQRModalShow(false)}
              url={QRurl}
              qrkey={key}
            />

            <div className="barGuide">
              <a
                target="_blank"
                href="https://wiry-ruby-135.notion.site/Cat-Planet-52ec98c6c0aa40eea78cdf3d17d77a34"
              >
                이용 가이드
              </a>
            </div>

            <div className="barTw">
              <img src={twitter}></img>
            </div>
            <div className="barTele">
              <img src={tele}></img>
            </div>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="barBtn">^</button>
        </div>
      </div>
      <div className="constelacao">
        {Array(250)
          .fill(0)
          .map((_, index) => {
            return (
              <span
                className={
                  "estrela " +
                  style[getRandomArbitrary(0, 4)] +
                  " " +
                  opacity[getRandomArbitrary(0, 6)] +
                  " " +
                  tam[getRandomArbitrary(0, 5)] +
                  " "
                }
                style={{
                  animationDelay: getRandomArbitrary(0, 9) + "s",
                  left: getRandomArbitrary(0, widthWindow),
                  top: getRandomArbitrary(0, heightWindow),
                  opacity: [getRandomArbitrary(0, 6)],
                }}
              ></span>
            );
          })}
      </div>
      <div className="head">
        <div className="imgCon">
          <img src={planet}></img>
          <br />
          <p className="welcome">220301</p>
        </div>

        <div className="des">
          어린왕자는 8번째 별인 고양이 별에 도착했습니다.
          <br />이 별에는 고양이들이 살았고, 밤이되면 고양이들은 별이 되어
          누군가를 위해 반짝였습니다.
          <br />이 곳에서 고양이들은 사라지지도, 아프지도 않았고 하늘에서 밝게
          빛날 뿐이었습니다.
        </div>
        <br />
        <div className="moveCon">
          <Link to="/stars" className="move">
            행성에 들어가기 <img className="rocket" src={rocket}></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Main;
