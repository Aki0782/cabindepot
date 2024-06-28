import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

type InputProps = {
  type: "text" | "number" | "password" | "email";
  label?: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, label = "", onchange, value }) => {
  const [width, setWidth] = useState(0);
  const refLabel = useRef<HTMLLabelElement>(null);
  const bool = Boolean(value);

  const inputStyle: React.CSSProperties = {
    left: value ? width + 32 : 0
  };

  useEffect(() => {
    if (refLabel.current) {
      setWidth(refLabel.current.offsetWidth);
    }
  }, [refLabel]);

  return (
    <div className="inputContainer">
      <label className={bool ? "label" : ""} ref={refLabel} htmlFor={label}>
        {label}
      </label>
      <input value={value} type={type} id={label} onChange={onchange} style={inputStyle} />
    </div>
  );
};

export default Input;
