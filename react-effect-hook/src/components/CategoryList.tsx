import React, { SetStateAction } from "react";

interface Props {
  setCategory: (category: string) => void;
}

const CategoryList = ({ setCategory }: Props) => {
  return (
    <div>
      <select
        className="form-select mb-3"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="sports">Sports</option>
        <option value="kitchen">Kitchen</option>
      </select>
    </div>
  );
};

export default CategoryList;
