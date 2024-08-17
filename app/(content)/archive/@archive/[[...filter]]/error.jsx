'use client';

const FilterError = ({ error }) => {
  return (
    <div id="error">
      <h2> An Error ocurred!</h2>
      <p>{error.message} </p>
    </div>
  );
};

export default FilterError;
