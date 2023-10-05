import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";
import SearchListItem from "./SearchListItem";

function SearchBar() {
    const [search, setSearch] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const userSearch = useSelector((state) => state.users.items);
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
                    className="form-control ml-0"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <div className="mb-3">
                {searchActive && search !== ""
                    ? userSearch?.map((user) => (
                          <SearchListItem user={user} key={user._id} />
                      ))
                    : ""}
            </div>
        </div>
    );
}

export default SearchBar;
