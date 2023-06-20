import React, { useState, useEffect } from 'react';



function Collapsible({ recipeList, setFilter, activeFilter, setActiveFilter }) {
    /*Different hooks for opening individual collapsible filters */
    const [isMealOpen, setIsMealOpen] = useState(false);
    const [isCuisineOpen, setIsCuisineOpen] = useState(false);
    const [isLifeStyleOpen, setIsLifeStyleOpen] = useState(false);
    const [isTimeSavingOpen, setIsTimeSavingOpen] = useState(false);
    const [isFoodSpecificOpen, setIsFoodSpecificOpen] = useState(false);
    const [isMiscOpen, setIsMiscOpen] = useState(false);
    const [prevFilter, setPrevFilter] = useState('');
    const [activeButton, setActiveButton] = useState(null);
    //activeFilters Array hooks
    const [activeFilters, setActiveFilters] = useState([]);

    useEffect(() => {

        if (activeFilter === 'All') {
            setFilter(recipeList);
            setPrevFilter(activeFilter);
            return
        }

        const filtered = recipeList.filter((recipe) => recipe.Category.includes(activeFilter));
        setFilter(filtered);
        setPrevFilter(activeFilter);


    }, [activeFilter]);

    function handleFilterClick(filter) {
        if (prevFilter == filter) {
            setActiveFilter('All');
            setActiveButton("All");
        } else {
            setActiveFilter(filter);
            setActiveButton(filter);
        }
    }
    useEffect(() => {
        let filtered = recipeList;
        //iterate through activeFilters array a
        for (let i = 0; i < activeFilters.length; i++) {
            const filter = activeFilters[i];
            filtered = filtered.filter((recipe) =>
                recipe.Category.includes(filter)
            );
        }

        setFilter(filtered);
        setPrevFilter(activeFilter);
    }, [activeFilter, activeFilters]);

    function handleFilterClick(filter) {
        const index = activeFilters.indexOf(filter);

        if (index === -1) {
            setActiveFilters([...activeFilters, filter]);
        } else {
            setActiveFilters([
                ...activeFilters.slice(0, index),
                ...activeFilters.slice(index + 1),
            ]);
        }

        setActiveButton(filter);
    }

    function isActive(filter) {
        return activeFilters.includes(filter);
    }

    /* reused from sidebar partial page */



    return (
        <div className='SideBar'>
            <button className='btn btn-light btn-lg Fb' onClick={() => setIsMealOpen(!isMealOpen)}><b>Meal Type (+) </b></button>
            {isMealOpen && <div className='SideBar-List'>

                <button type="button" className={`btn btn-secondary sb ${isActive('Breakfast') ? "active" : ""}`} onClick={() => handleFilterClick("Breakfast")}>
                    Breakfast
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Lunch') ? "active" : ""}`} onClick={() => handleFilterClick("Lunch")}>
                    Lunch
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Dinner') ? "active" : ""}`} onClick={() => handleFilterClick("Dinner")}>
                    Dinner
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Dessert') ? "active" : ""}`} onClick={() => handleFilterClick("Dessert")}>
                    Dessert
                </button>


                <button type="button" className={`btn btn-secondary sb ${isActive('Snacks') ? "active" : ""}`} onClick={() => handleFilterClick("Snacks")}>
                    Snacks
                </button>


            </div>}

            <button className='btn btn-light btn-lg Fb' onClick={() => setIsCuisineOpen(!isCuisineOpen)}><b>Cuisine  (+) </b></button>
            {isCuisineOpen && <div className='SideBar-List'>

                <button type="button" className={`btn btn-secondary sb ${isActive('Asian') ? "active" : ""}`} onClick={() => handleFilterClick("Asian")}>
                    Asian
                </button>

                <button type="button" className={`btn btn-secondary sb ${isActive('American') ? "active" : ""}`} onClick={() => handleFilterClick("American")}>
                    American
                </button>

                <button type="button" className={`btn btn-secondary sb ${isActive('Seafood') ? "active" : ""}`} onClick={() => handleFilterClick("Seafood")}>
                    Seafood
                </button>


            </div>}



            <button className='btn btn-light btn-lg Fb' onClick={() => setIsLifeStyleOpen(!isLifeStyleOpen)}><b>LifeStyle (+) </b></button>
            {isLifeStyleOpen && <div className='SideBar-List'>

                <button type="button" className={`btn btn-secondary sb ${isActive('Vegan') ? "active" : ""}`} onClick={() => { handleFilterClick("Vegan"); }}>
                    Vegan
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Gluten-free') ? "active" : ""}`} onClick={() => handleFilterClick("Gluten-free")}>
                    Gluten-free
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Low-Carb') ? "active" : ""}`} onClick={() => handleFilterClick("Low-Carb")}>
                    Low-Carb
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('Keto') ? "active" : ""}`} onClick={() => handleFilterClick("Keto")}>
                    Keto
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive("Budget-friendly") ? "active" : ""}`} onClick={() => handleFilterClick("Budget-friendly")}>
                    Budget-friendly
                </button>


            </div>}


            <button className='btn btn-light btn-lg Fb' onClick={() => setIsTimeSavingOpen(!isTimeSavingOpen)}><b> Time Saving (+) </b></button>
            {isTimeSavingOpen && <div className='SideBar-List'>
                <button type="button" className={`btn btn-secondary sb ${isActive('Easy') ? "active" : ""}`} onClick={() => handleFilterClick("Easy")}>
                    Easy
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('30 minutes or less') ? "active" : ""}`} onClick={() => handleFilterClick("30 minutes or less")}>
                    30 minutes or less
                </button>
                <button type="button" className={`btn btn-secondary sb ${isActive('60 minutes or less') ? "active" : ""}`} onClick={() => handleFilterClick("60 minutes or less")}>
                    60 minutes or less
                </button>

            </div>}


            <button className='btn btn-light btn-lg Fb' onClick={() => setIsFoodSpecificOpen(!isFoodSpecificOpen)}><b> Food Specific (+) </b></button>
            {isFoodSpecificOpen && <div className='SideBar-List'>
                <button type="button" className={`btn btn-secondary sb ${isActive('Vegetables') ? "active" : ""}`} onClick={() => handleFilterClick("Vegetables")}>
                    Vegetables
                </button>

                <button type="button" className={`btn btn-secondary sb ${isActive('Chicken') ? "active" : ""}`} onClick={() => handleFilterClick("Chicken")}>
                    Chicken
                </button>

            </div>}


            <button className='btn btn-light btn-lg Fb' onClick={() => setIsMiscOpen(!isMiscOpen)}><b> Misc (+) </b></button>
            {isMiscOpen && <div className='SideBar-List'>


                <button type="button" className={`btn btn-secondary sb ${isActive('Baking') ? "active" : ""}`} onClick={() => handleFilterClick("Baking")}>
                    Baking
                </button>

                <button type="button" className={`btn btn-secondary  sb ${isActive('Parties') ? "active" : ""}`} onClick={() => handleFilterClick("Parties")}>
                    Parties
                </button>


            </div>}

        </div>
    );
}

export default Collapsible;