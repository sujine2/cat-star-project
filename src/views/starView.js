import React, { useEffect } from "react";
import "./starView.css";
import ViewModal from "../components/Modal";
import plus from "../img/plus2.png";
import FormModal from "../components/FormModal";
import Search from "../img/search2.png";
import Search_ from "../img/search.png";
import $ from "jquery";
import { address, _abi } from "../components/contract/contractInfo";
import { klaytn, caver } from "../wallet/caver";
import searchLoading from "../img/catStar.png";
import Decoration from "../components/Decoration";
import { Cookies } from "react-cookie";
import RequestLogin from "../components/RequestLogin";
import princeBack from "../img/prince-back.png";

global.Buffer = global.Buffer || require("buffer").Buffer;
let colorSearch = "";

function setSearchBarShow() {
  if ($(".search-container").css("display") === "block") {
    $(".search-container").css("display", "none");
    if (colorSearch !== "") {
      $("#" + colorSearch).css("width", "2px");
      $("#" + colorSearch).css("height", "2px");
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
  const cookies = new Cookies();
  const [viewStarAccount, setViewStarAccount] = React.useState("");
  const [modalShow, setModalShow] = React.useState({ setShow: false, id: "" });
  const { setShow, id } = modalShow;
  const [account, setAccount] = React.useState("");
  const [formModalShow, setFormModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = React.useState(false);
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

  const [test1, setTest1] = React.useState([
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
  const [test2, setTest2] = React.useState([
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
  const [test3, setTest3] = React.useState([
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
  const [test4, setTest4] = React.useState([
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
  const [test5, setTest5] = React.useState([
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
    const contract = new caver.klay.Contract(_abi, address);
    const TokenID = await contract.methods.tokenID().call();
    return TokenID;
  };

  const viewMyStar = async (_owner) => {
    const contract = new caver.klay.Contract(_abi, address);
    const myStarList = await contract.methods.getMyStar(_owner).call();
    if (viewStar === false) {
      setViewStar(true);
      for (let i in myStarList) {
        let data = await contract.methods.getCatData(myStarList[i]).call();
        let tempColorValue = parseInt(data.catColor).toString(16);
        while (tempColorValue.length !== 6) {
          tempColorValue = "0" + tempColorValue;
        }

        $("#" + myStarList[i]).addClass("style5");
        $("#" + myStarList[i]).css("width", "17px");
        $("#" + myStarList[i]).css("height", "17px");
        $("#" + myStarList[i]).css("background-color", "#" + tempColorValue);

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
  };

  const findColor = async (_findColor) => {
    let colorOwner;
    let contract;

    contract = new caver.klay.Contract(_abi, address);

    colorOwner = await contract.methods
      .getWhoColor(parseInt(_findColor, 16))
      .call();
    if (colorOwner == 0x0) {
      alert("존재하지 않는 컬러 코드입니다.");
    } else {
      let tokenList = await contract.methods.getMyStar(colorOwner).call();
      for (let i in tokenList) {
        let data = await contract.methods.getCatData(tokenList[i]).call();
        if (
          data !== "" &&
          _findColor === parseInt(data.catColor).toString(16)
        ) {
          while (_findColor.length !== 6) {
            _findColor = "0" + _findColor;
          }
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
      alert("존재하지 않는 별입니다!");
    } else {
      contract = new caver.klay.Contract(_abi, address);

      const data = await contract.methods.getCatData(_index).call();
      let tempColorValue = parseInt(data.catColor).toString(16);
      while (tempColorValue.length !== 6) {
        tempColorValue = "0" + tempColorValue;
      }
      $("#" + _index).addClass("style5");
      $("#" + _index).css("width", "17px");
      $("#" + _index).css("height", "17px");
      $("#" + _index).css("background-color", "#" + tempColorValue);
      colorSearch = _index;
    }
  };

  async function search() {
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
  }

  const fff = () => {
    if (tokenID !== -1) {
      setTest(
        Array(300)
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
    setTest1(
      Array(300)
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
              top: getRandomArbitrary(300, 400),
              opacity: [getRandomArbitrary(0, 6)],
            },
          };
        })
    );
    setTest2(
      Array(100)
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
              top: getRandomArbitrary(150, 300),
              opacity: [getRandomArbitrary(0, 6)],
            },
          };
        })
    );
    setTest3(
      Array(100)
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
              top: getRandomArbitrary(300, 500),
              opacity: [getRandomArbitrary(0, 6)],
            },
          };
        })
    );
  };

  useEffect(() => {
    const ff = async () => {
      if (klaytn !== undefined) {
        setAccount(klaytn.selectedAddress);
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

  useEffect(() => {
    if (window.sessionStorage.getItem("id_&") !== null) {
      setModalShow({
        setShow: true,
        id: window.sessionStorage.getItem("id_&"),
      });
      window.sessionStorage.removeItem("id_&");
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <div />
      ) : (
        <div className="view-planet">
          <div className="view-constelacao">
            {
              //200
              tokenID > 0 &&
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
            {
              //200
              tokenID > 0 &&
                Array(tokenID - 251)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <span
                        id={index + 251}
                        className={test1[index].styleClass}
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShow({
                            setShow: true,
                            id: index,
                          });
                        }}
                        style={test1[index].inlineStyle}
                      ></span>
                    );
                  })
            }
            {/* {
              //200
              tokenID > 0 &&
                Array(100)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <span
                        id={index}
                        className={test2[index].styleClass}
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShow({
                            setShow: true,
                            id: index,
                          });
                        }}
                        style={test2[index].inlineStyle}
                      ></span>
                    );
                  })
            }
            {
              //200
              tokenID > 0 &&
                Array(100)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <span
                        id={index}
                        className={test3[index].styleClass}
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShow({
                            setShow: true,
                            id: index,
                          });
                        }}
                        style={test3[index].inlineStyle}
                      ></span>
                    );
                  })
            } */}
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
          <Decoration showDeco={setShow} id={id} />

          <div className="chuvaMeteoro"></div>

          {/* <div className="floresta">
            <img
              src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png"
              alt=""
            />
          </div> */}

          <div className="princeBackImg">
            <img src={princeBack} alt="" />
          </div>

          <div className="loading">
            <img className="loadingImg" src={searchLoading} />
            <p className="loadingText">loading...</p>
          </div>

          <div className="form">
            <img
              style={{ marginLeft: 10 }}
              src={plus}
              id="plusbtn"
              onClick={async () => {
                if (
                  klaytn !== undefined &&
                  klaytn.selectedAddress === undefined &&
                  cookies.get("user") === undefined
                ) {
                  setLoginModalShow(true);
                } else if (
                  klaytn === undefined &&
                  cookies.get("user") === undefined
                ) {
                  setLoginModalShow(true);
                } else {
                  setFormModalShow(true);
                }
              }}
            />
            <FormModal
              show={formModalShow}
              onHide={() => setFormModalShow(false)}
              id={tokenID}
            />

            <RequestLogin
              show={loginModalShow}
              onHide={() => setLoginModalShow(false)}
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
            {account !== undefined &&
              account !== "" &&
              cookies.get("user") === undefined && (
                <>
                  <div
                    className="myStar"
                    onClick={() => {
                      if (
                        klaytn.selectedAddress !== undefined &&
                        klaytn !== undefined
                      ) {
                        viewMyStar(klaytn.selectedAddress);
                      }
                    }}
                  >
                    내 별 보기 - off
                  </div>
                </>
              )}
            {cookies.get("user") !== undefined &&
              (account === undefined || account == "") && (
                <>
                  <div
                    className="myStar"
                    onClick={() => {
                      if (cookies.get("user") !== undefined) {
                        viewMyStar(cookies.get("user"));
                      } else {
                        alert("Kilp 로그인 만료");
                      }
                    }}
                  >
                    내 별 보기 - off
                  </div>
                </>
              )}

            {cookies.get("user") !== undefined &&
              account !== undefined &&
              account !== "" && (
                <>
                  <div
                    className="myStar"
                    onClick={() => {
                      viewStar === true && viewMyStar(viewStarAccount);
                    }}
                  >
                    내 별 보기 - off
                  </div>

                  {viewStar === false && (
                    <div className="myStarMenuCon">
                      <div className="myStarMenu">
                        <div
                          className="menu"
                          onClick={async () => {
                            if (cookies.get("user") !== undefined) {
                              setViewStarAccount(cookies.get("user"));
                              viewMyStar(cookies.get("user"));
                            } else {
                              alert("Kilp 로그인 만료");
                            }
                          }}
                        >
                          Klip 지갑
                        </div>
                        <div
                          className="menu"
                          onClick={() => {
                            if (
                              klaytn.selectedAddress !== undefined &&
                              klaytn !== undefined
                            ) {
                              setViewStarAccount(klaytn.selectedAddress);
                              viewMyStar(klaytn.selectedAddress);
                            }
                          }}
                        >
                          Kaikas 지갑
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
          </div>
          <div className="search-container-con">
            <form className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="#색상코드, 별 번호 검색"
                onKeyPress={(e) => {
                  if (window.event.keyCode == 13) {
                    e.preventDefault();
                    search();
                  }
                }}
              />
              <a
                onClick={() => {
                  search();
                }}
              >
                <img className="search-icon" src={Search_} />
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default StarView;
