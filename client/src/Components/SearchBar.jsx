import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/actions/user.actions";

function SearchBar({ setSearchActive }) {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        search && dispatch(userActions.getPlateUsers(search));
    }, [search]);

    return (
        <div className="container mb-3">
            <form>
                <input
                    type="text"
                    onFocus={() => setSearchActive(true)}
                    // onBlur={() => setSearchActive(false)}
                    className="form-control ml-0"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
}

export default SearchBar;
