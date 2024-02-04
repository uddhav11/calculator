import React, { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import "./cal.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOnClick = (value) => {


    switch (value) {
      case "C":
        setResult(0);
        setInput("");
        break;
      case "=":
      case "Enter":
        try {
          const claculatedResult = evaluate(input);
          setResult(claculatedResult);
          setInput(claculatedResult.toString());
        } catch (error) {
          setResult("Error");
        }
        break;
      case "Backspace":
        setInput((prevInput) => prevInput.slice(0, -1));
        break;
      default:
        setInput((prevInput) => prevInput + value);
        break;
    }
  };

  const handleKeyPress=(event) => {
    const {key} = event

    if(/^[\d\+\-\*/\(\)\.%]$/.test(key) ||
    key === "Backspace" ||
    key === "Enter" ||
    key=== '='
){
    handleOnClick(key)
}

  }

  return (
    <div className="outer-part" onKeyDown={handleKeyPress} tabIndex="0">
      <h1>Hello, Welcome to this Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => e.target.value}
        readOnly
        ref={inputRef}
      />
      <div className="inner-part">
        <div className="each">
          <button onClick={() => handleOnClick("7")}>7</button>
          <button onClick={() => handleOnClick("8")}>8</button>
          <button onClick={() => handleOnClick("9")}>9</button>
          <button onClick={() => handleOnClick("%")}>%</button>
          <button id="erase" onClick={() => handleOnClick("C")}>
            C
          </button>
        </div>
        <div className="each">
          <button onClick={() => handleOnClick("4")}>4</button>
          <button onClick={() => handleOnClick("5")}>5</button>
          <button onClick={() => handleOnClick("6")}>6</button>
          <button onClick={() => handleOnClick("*")}>*</button>
          <button onClick={() => handleOnClick("/")}>/</button>
        </div>
        <div className="each">
          <button onClick={() => handleOnClick("1")}>1</button>
          <button onClick={() => handleOnClick("2")}>2</button>
          <button onClick={() => handleOnClick("3")}>3</button>
          <button onClick={() => handleOnClick("+")}>+</button>
          <button onClick={() => handleOnClick("-")}>-</button>
        </div>
        <div className="each">
          <button onClick={() => handleOnClick(".")}>.</button>
          <button onClick={() => handleOnClick("0")}>0</button>
          <button onClick={() => handleOnClick("+/-")}>+/-</button>
          <button id="equalto" onClick={() => handleOnClick("=")}>
            =
          </button>
        </div>
        {/* <div className="result">
                <h2>The result is shown here</h2>
                <input type="text" value={result} disabled/>
            </div> */}
      </div>
    </div>
  );
};

export default Calculator;
