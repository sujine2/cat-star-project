import React from "react";
import "./main.css";
import prince from "../img/prince.png";
import { Link } from "react-router-dom";
import { klaytn } from "../wallet/caver";
import { prepare } from "klip-sdk";
import QRModal from "../components/Eng/QRModal_eng";
import QRCode from "qrcode";
import klip from "../img/Klip.png";
import { Cookies } from "react-cookie";
import logo from "../img/logo.png";
import kaikas from "../img/kaikas.png";

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
          <div className="barTitle">
            <img src={logo}></img>
          </div>

          <div className="barRight">
            {(klaytn === undefined || klaytn.selectedAddress === undefined) && (
              <button
                className="mainWalletConnect"
                onClick={async () => {
                  if (klaytn === undefined) {
                    alert("Please install a Kaikas wallet!");
                  } else {
                    await klaytn.enable();
                    window.location.reload();
                  }
                }}
              >
                <img
                  src={kaikas}
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 8,
                    marginBottom: 6,
                  }}
                ></img>
                Login as kaikas
              </button>
            )}
            {klaytn !== undefined && klaytn.selectedAddress !== undefined && (
              <button className="mainWalletConnect">
                <img
                  src={kaikas}
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 8,
                    marginBottom: 6,
                  }}
                ></img>
                Kaikas Connected
              </button>
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
                      "KakaoTalk Klip authentication error has been issued. Please try again later."
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
                Login as Klip
              </button>
            ) : (
              <button className="mainKlipConnect">
                <img
                  style={{ width: 30, height: 30, marginRight: 5 }}
                  src={klip}
                ></img>
                Klip Connected
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
                href="https://wiry-ruby-135.notion.site/Cat-Planet-Guide-English-c23f9304fdb14f2a942f970cf941f995"
              >
                User Guide
              </a>
            </div>

            <div className="barTw">
              <a href="https://twitter.com/cat_planet_HQ">Twitter</a>
            </div>
            <div className="barTele">
              <a href="https://t.me/cat_planet_official">Telegram</a>
            </div>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="barBtn">^</button>
        </div>
      </div>
      <div className="language_eng">
        <div className="kor_eng">
          <Link to="/" className="move">
            한국어
          </Link>
        </div>
        <div className="eng_eng">Engnlish</div>
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
          <img id="princeImg" src={prince}></img>

          <div>
            <img src={logo} style={{ width: 280, height: 90 }}></img>
          </div>
        </div>

        <div className="des">
          The Little Prince has arrived at the 8th star, the Cat-planet.
          <br />
          Cats lived on this planet, and at night they became stars and twinkled
          for someone.
          <br />
          Here the cats were neither sick nor gone, only shining brightly in the
          sky.
        </div>
        <br />
        <div className="moveCon">
          <Link to="/stars/eng" className="move">
            Go to the planet
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Main;
