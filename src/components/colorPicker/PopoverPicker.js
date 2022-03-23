import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {useDebouncyEffect} from "use-debouncy";

import useClickOutside from "./useClickOutside";

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);
  const [value, setValue] = useState(color);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  useDebouncyEffect(() => onChange(value), 200, [value]);
 
  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ background: `linear-gradient(to top, #000000, ${color}, #000000) ` }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={value} onChange={setValue}/>
        </div>
      )}
    </div>
  );
};