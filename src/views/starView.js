import React, { useEffect } from "react";
import "./starView.css";
import ViewModal from "../components/Modal";
import Meteoro from "../components/Meteoro";
import plus from "../img/plus.png";
import FormModal from "../components/FormModal";
import Search from "../img/search.png";
import $ from "jquery";
import { address, abi } from "../components/contract/contractInfo";
import { klaytn, caver } from "../wallet/caver";
import land from "../img/land.png";
import Caver from "caver-js";
import searchLoading from "../img/catStar.png";

global.Buffer = global.Buffer || require("buffer").Buffer;
let colorSearch = "";

function setSearchBarShow() {
  if ($(".search-container").css("display") === "block") {
    $(".search-container").css("display", "none");
    if (colorSearch !== "") {
      $("#" + colorSearch).css("width", "3px");
      $("#" + colorSearch).css("height", "3px");
      $("#" + colorSearch).css("background-color", "white");
      colorSearch = "";
    }
  } else {
    $(".search-container").css("display", "block");
  }
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function StarView() {
  const [modalShow, setModalShow] = React.useState({ setShow: false, id: "" });
  const { setShow, id } = modalShow;
  const [account, setAccount] = React.useState("");
  const [formModalShow, setFormModalShow] = React.useState(false);
  const [viewStar, setViewStar] = React.useState(false);
  const [tokenID, setTokenID] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [test, setTest] = React.useState([
    {
      styleClass: "",
      inlineStyle: {
        animationDelay: "0s",
        left: 0,
        top: 0,
        opacity: 0,
      },
    },
  ]);

  if (klaytn !== undefined) {
    klaytn.on("accountsChanged", function (accounts) {
      if (viewStar === true) {
        viewMyStar(account).then(setAccount(accounts[0]));
      } else {
        setAccount(accounts[0]);
      }
    });
  }

  let style = ["style1", "style2", "style3", "style4"];
  let tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  let opacity = [
    "opacity1",
    "opacity1",
    "opacity1",
    "opacity2",
    "opacity2",
    "opacity3",
  ];
  let widthWindow = window.innerWidth;
  let heightWindow = window.innerHeight;
  let owner;

  const getTokenNum = async () => {
    if (klaytn === undefined) {
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      const contract = new _caver.klay.Contract(abi, address);
      const TokenID = await contract.methods.tokenID().call();
      return TokenID;
    } else {
      const contract = new caver.klay.Contract(abi, address);
      const TokenID = await contract.methods.tokenID().call();
      return TokenID;
    }
  };

  const viewMyStar = async (_owner) => {
    if (klaytn === undefined) {
      alert("Non-Kaikas browser detected. You should consider trying Kaikas!");
    } else {
      if (klaytn.selectedAddress === undefined) {
        await klaytn.enable();
        setAccount(klaytn.selectedAddress);
      }
      const contract = new caver.klay.Contract(abi, address);
      const myStarList = await contract.methods.getMyStar(_owner).call();
      if (viewStar === false) {
        setViewStar(true);
        for (let i in myStarList) {
          let data = await contract.methods.getCatData(myStarList[i]).call();
          $("#" + myStarList[i]).addClass("style5");
          $("#" + myStarList[i]).css("width", "17px");
          $("#" + myStarList[i]).css("height", "17px");
          $("#" + myStarList[i]).css("background-color", "#" + data.catColor);

          $(".myStar").css("opacity", "100%");
          $(".myStar").css("text-shadow", "0px 0px 8px white");

          $(".myStar").text("내 별 보기");
        }
      } else if (viewStar === true) {
        setViewStar(false);
        for (let i in myStarList) {
          $("#" + myStarList[i]).css("width", "2px");
          $("#" + myStarList[i]).css("height", "2px");
          $("#" + myStarList[i]).css("background-color", "white");
          $("#" + myStarList[i]).removeClass("style5");
          $(".myStar").css("opacity", "60%");
          $(".myStar").css("text-shadow", "");
          $(".myStar").text("내 별 보기 - off");
        }
      }
    }
  };

  const findColor = async (_findColor) => {
    let colorOwner;
    let contract;
    if (klaytn === undefined) {
      const _caver = new Caver("https://api.baobab.klaytn.net:8651");
      contract = new _caver.klay.Contract(abi, address);
    } else {
      contract = new caver.klay.Contract(abi, address);
    }

    colorOwner = await contract.methods.getWhoColor(_findColor).call();
    if (colorOwner == 0x0) {
      alert("It's not exist color code");
    } else {
      let tokenList = await contract.methods.getMyStar(colorOwner).call();
      for (let i in tokenList) {
        let data = await contract.methods.getCatData(tokenList[i]).call();
        if (data !== "" && _findColor === data.catColor) {
          $("#" + tokenList[i]).addClass("style5");
          $("#" + tokenList[i]).css("width", "17px");
          $("#" + tokenList[i]).css("height", "17px");
          $("#" + tokenList[i]).css("background-color", "#" + _findColor);
          colorSearch = tokenList[i];
        }
      }
    }
  };

  const findIndex = async (_index) => {
    let contract;
    if (_index < 0 || _index >= tokenID) {
      alert("It's not exist cat star");
    } else {
      if (klaytn === undefined) {
        const _caver = new Caver("https://api.baobab.klaytn.net:8651");
        contract = new _caver.klay.Contract(abi, address);
      } else {
        contract = new caver.klay.Contract(abi, address);
      }

      const data = await contract.methods.getCatData(_index).call();
      $("#" + _index).addClass("style5");
      $("#" + _index).css("width", "17px");
      $("#" + _index).css("height", "17px");
      $("#" + _index).css("background-color", "#" + data.catColor);
      colorSearch = _index;
    }
  };

  const search = async () => {
    if (colorSearch !== "") {
      $("#" + colorSearch).removeClass("style5");
      $("#" + colorSearch).css("width", "2px");
      $("#" + colorSearch).css("height", "2px");
      $("#" + colorSearch).css("background-color", "white");
    }
    let searchInputs = $(".search-bar").val();
    $(".loading").css("display", "block");
    if (searchInputs !== "") {
      if (searchInputs[0] === "#") {
        searchInputs = searchInputs.substr(1);
        await findColor(searchInputs);
      } else {
        await findIndex(searchInputs);
      }
    }
    $(".loading").css("display", "none");
  };

  const fff = () => {
    if (tokenID !== -1) {
      setTest(
        Array(tokenID)
          .fill(0)
          .map(() => {
            return {
              styleClass:
                "view-estrela " +
                style[getRandomArbitrary(0, 4)] +
                " " +
                opacity[getRandomArbitrary(0, 6)] +
                " " +
                tam[getRandomArbitrary(0, 5)] +
                " ",

              inlineStyle: {
                animationDelay: getRandomArbitrary(0, 9) + "s",
                left: getRandomArbitrary(0, widthWindow),
                top: getRandomArbitrary(0, heightWindow),
                opacity: [getRandomArbitrary(0, 6)],
              },
            };
          })
      );
    }
  };

  useEffect(() => {
    const ff = async () => {
      if (klaytn !== undefined) {
        owner = await klaytn.enable();
        setAccount(klaytn.selectedAddress);
        if (klaytn.networkVersion !== 1001) {
          alert("baobab 네트워크로 전환해 주세요.");
        }
      }
    };
    ff();
  }, [owner]);

  useEffect(() => {
    const f = async () => {
      const ID = await getTokenNum();
      console.log("view Token! : ", ID);
      setTokenID(parseInt(ID));
    };

    f().then(() => {
      if (tokenID !== -1) {
        fff();
        setIsLoading(true);
      }
    });
  }, [tokenID]);

  return (
    <>
      {!isLoading ? (
        <div />
      ) : (
        <div className="view-planet">
          <div className="view-constelacao">
            {
              //200
              tokenID <= 200 &&
                Array(tokenID)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <span
                        id={index}
                        className={test[index].styleClass}
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShow({
                            setShow: true,
                            id: index,
                          });
                        }}
                        style={test[index].inlineStyle}
                      ></span>
                    );
                  })
            }
          </div>
          <ViewModal
            show={setShow}
            onHide={() =>
              setModalShow({
                setShow: false,
                id: "",
              })
            }
            tokenid={id}
          />
          <div className="chuvaMeteoro"></div>

          {/* <div className="floresta">
            <img
              src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png"
              alt=""
            />
          </div> */}

          <div className="land">
            <img src={land} alt="" />
          </div>

          <div className="loading">
            <img className="loadingImg" src={searchLoading} />
            <p className="loadingText">loading...</p>
          </div>

          <div className="form">
            <img
              src={plus}
              id="plusbtn"
              onClick={async () => {
                if (klaytn === undefined) {
                  alert(
                    "Non-Kaikas browser detected. You should consider trying Kaikas!"
                  );
                } else if (klaytn.selectedAddress == undefined) {
                  await klaytn.enable();
                  setAccount(klaytn.selectedAddress);
                }

                setFormModalShow(true);
              }}
            />
            <FormModal
              show={formModalShow}
              onHide={() => setFormModalShow(false)}
            />

            <img
              className="search"
              onClick={(e) => {
                e.preventDefault();
                setSearchBarShow();
              }}
              src={Search}
            />
          </div>

          <div className="myStarCon">
            {account !== "" && (
              <>
                <div
                  className="myStar"
                  onClick={() => viewMyStar(klaytn.selectedAddress)}
                >
                  내 별 보기 - off
                </div>
              </>
            )}
          </div>

          <form className="search-container">
            <input type="text" className="search-bar" />
            <a onClick={search}>
              <img className="search-icon" src={Search} />
            </a>
          </form>
        </div>
      )}
    </>
  );
}

export default StarView;
