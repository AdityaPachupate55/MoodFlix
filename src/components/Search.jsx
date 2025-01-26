import React from "react";

const Search = ({ searchTerm, setsearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src='search.svg' alt="search image" />
        <input
          type="text"
          placeholder="What's on your mind ?"
          value={searchTerm}
          onChange={(event) => {
            setsearchTerm(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Search;

