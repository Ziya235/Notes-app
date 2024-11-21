import React, { useState } from "react";
import ProfilInfo from "../Card/ProfilInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

const Navbar = ({ userInfo, onSearchNote, getAllNotes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    getAllNotes("");
  };

  const isLoggedIn = Boolean(localStorage.getItem("token")); // Adjust the key to match your stored token

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {/* Show SearchBar only if the user is logged in */}
      {isLoggedIn && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      <ProfilInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
