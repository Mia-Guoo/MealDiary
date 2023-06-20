import React from "react"
import { FaSearch } from "react-icons/fa"

function SearchBar(props) {



    return (

        <div className="srchContainer">
            <div className="SearchBar">
                <FaSearch id="srch-icon" />
                <input className='_searchbar'
                    type="text"

                    placeholder='Find something delicious'
                    onChange={props.handleChange}


                />

            </div>
        </div>
    )
}

export default SearchBar



