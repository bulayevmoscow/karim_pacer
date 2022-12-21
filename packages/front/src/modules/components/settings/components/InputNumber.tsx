import React from "react";
type TInputNumber = {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: number;
};
export const InputNumber: React.FC<TInputNumber> = ({
  onChange,
  className,
  value,
}) => {
  return (
    <div className={className}>
      <input type="number" onChange={onChange} value={value} />
    </div>
  );
};
