"use client";

import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { TransactionType } from "@/models/TransationType";
import { useEffect, useRef, useState } from "react";
import "./DropdownMenu.styles.css";

export type DropdownMenuProps = {
  placeholder: string;
  selected: TransactionType;
  options: TransactionType[];
  width?: "auto";
  onChange: (option: TransactionType) => void;
};

function DropdownMenu({
  placeholder,
  selected,
  options,
  width,
  onChange,
}: DropdownMenuProps) {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${width}`} ref={dropdownRef}>
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selected.value ? selected.display : placeholder}
        <ArrowDownIcon />
      </div>
      {isActive && (
        <div className={`dropdown-content ${width}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => {
                onChange(option);
                setIsActive(false);
              }}
            >
              {option.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
