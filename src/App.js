import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

function App() {
  const [datas, setDatas] = useState([]);
  const [checked, isChecked] = useState({});
  const [selected, setSelected] = useState([]);
  const [enable, setEnable] = useState(false);
  const [filtered, setFiltered] = useState(datas);
  const [inputValue, setInputValue] = useState("");
  const menuRef = useRef(null);

  /* API */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setDatas(data.results);
      setFiltered(data.results);
      const initialChecked = {};
      data.results.forEach((item) => {
        initialChecked[item.id] = false;
      });
      isChecked(initialChecked);
    };

    fetchData();
  }, []);

  /* INSIDE BUTTON */
  const buttonHandler = (id) => {
    isChecked({
      ...checked,
      [id]: !checked[id],
    });
    if (selected.includes(datas[id - 1])) {
      const updatedSelected = selected.filter((item) => item !== datas[id - 1]);
      setSelected(updatedSelected);
    } else {
      setSelected([...selected, datas[id - 1]]);
    }
    setFiltered(datas);
    setInputValue("");
  };

  /* MENU OPEN BUTTON */
  const enableHandler = () => {
    setEnable(!enable);
  };

  /* Filter */
  const inputHandler = (e) => {
    e.preventDefault();
    const filter = e.target.value.toLocaleLowerCase();
    setInputValue(e.target.value);
    const filteredData = datas.filter((i) =>
      i.name.toLocaleLowerCase().includes(filter)
    );
    if (filteredData.length > 0) {
      setFiltered(filteredData);
    } else {
      setFiltered(null);
    }
    setEnable(true);
  };

  /* Scroll Reset */
  useEffect(() => {
    if (inputValue.length <= 1 && menuRef.current) {
      menuRef.current.scrollTo(0, 0);
    }
  }, [inputValue]);

  console.log(inputValue.length);

  /* DeleteItem */
  const deleteHandler = (id) => {
    const updatedSelected = selected.filter((item) => item !== datas[id - 1]);
    setSelected(updatedSelected);
    isChecked({
      ...checked,
      [id]: !checked[id],
    });
  };

  /* Index value */
  const formatName = (name, inputValue) => {
    const index = name
      .toLocaleLowerCase()
      .indexOf(inputValue.toLocaleLowerCase());

    if (index !== -1) {
      return (
        <>
          {name.slice(0, index)}
          <span className="font-bold">{inputValue}</span>
          {name.slice(index + inputValue.length)}
        </>
      );
    } else {
      return name.length < 15 ? name : name.slice(0, 15).concat("...");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="flex items-center justify-center relative  pt-40 ">
        <div
          className={` bg-fistik-yesil bg-opacity-40 ring-2 ring-hover-yesil rounded-xl flex px-4 py-2  shadow-ince focus:outline-none w-80  focus:ring-retro-yesil  translate-x-2 ${
            selected.length > 2 ? " flex-col " : ""
          }`}
        >
          <div
            className={`${
              selected.length > 2 ? "grid grid-cols-2  " : "flex "
            } gap-2 whitespace-nowrap`}
          >
            {selected.map((i) => (
              <div
                key={i.id}
                className="flex items-center px-2 py-1 bg-retro-mor text-white rounded-full"
              >
                <button
                  key={i.id}
                  className="text-xs "
                  onClick={() => deleteHandler(i.id)}
                >
                  <FaXmark />
                </button>
                <p className="text-xs">
                  {`${
                    i.name.length < 15
                      ? i.name
                      : i.name.slice(0, 15).concat("...")
                  }`}
                </p>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder={selected.length !== 0 ? "" : "Karakterinizi Giriniz!"}
            value={inputValue}
            onChange={inputHandler}
            className={` outline-none z-4 bg-transparent w-full ${
              selected.length !== 0 ? "w-20" : ""
            } `}
          />
        </div>
        <button
          className={`${
            enable ? "" : "rotate-90"
          }  relative right-6 text-hover-yesil transition ease-in-out duration-200`}
          onClick={enableHandler}
        >
          <FaCaretDown />
        </button>
      </div>

      {/* MENU */}
      <div
        ref={menuRef}
        className={`${
          !enable
            ? "opacity-0 -translate-y-32 w-0 h-0"
            : " opacity-100 h-48 w-auto"
        } scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll scrollbar-thin scrollbar-track-hover-yesil transition duration-300 ease-in-out scrollbar-thumb-retro-yesil relative ring-1 ring-hover-yesil rounded-lg flex flex-col `}
      >
        <div
          className={`${
            filtered === null ? "opacity-100 w-72" : "opacity-0 w-0 h-0"
          }  `}
        >
          <h1 className="text-center text-3xl text-retro-mor font-bold justify-center pt-12">
            Böyle Bir Karakter Yok Dostum :/
          </h1>
        </div>
        {filtered &&
          filtered.length > 0 &&
          filtered.map((i, index) => (
            <div
              key={index}
              className="flex px-4 py-4 w-72 left-0 relative items-center gap-3 ring-1 ring-hover-yesil bg-fistik-yesil bg-opacity-40"
            >
              <button
                className="ring ring-hover-yesil rounded-md w-4 h-4"
                onClick={() => {
                  buttonHandler(i.id);
                }}
              >
                <FaCheck
                  className={`${
                    checked[i.id] ? "opacity-100" : "opacity-0"
                  } transition ease-in-out duration-200`}
                />
              </button>
              <img
                src={i.image}
                className="w-10 h-10 object-cover rounded-xl"
              />
              <div className="flex flex-col">
                <div
                  className={` text-sm font-semibold whitespace-nowrap capitalize`}
                  key={i.id}
                >
                  {formatName(i.name, inputValue)}
                </div>
                <div className="text-sm">{`${i.episode.length} Episodes`}</div>
              </div>
            </div>
          ))}
      </div>
      {/* MENU */}
    </div>
  );
}

export default App;
