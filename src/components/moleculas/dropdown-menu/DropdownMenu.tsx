"use client";

import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { useEffect, useRef, useState } from "react";
import "./DropdownMenu.styles.css";
import { TransactionType } from "@/models/TransationType";

export type DropdownMenuProps = {
  placeholder: string;
  selected: TransactionType;
  options: TransactionType[];
  onChange: (option: TransactionType) => void;
};

function DropdownMenu({
  placeholder,
  selected,
  options,
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
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selected.value ? selected.display : placeholder}
        <ArrowDownIcon />
      </div>
      {isActive && (
        <div className="dropdown-content">
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
