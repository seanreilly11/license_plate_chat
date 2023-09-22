import React, { useState } from "react";

function SearchBar() {
    const [search, setSearch] = useState("");
    return (
        <div className="container mb-3">
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
}

export default SearchBar;
