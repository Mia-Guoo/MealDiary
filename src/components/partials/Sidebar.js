import React, { useState, useEffect } from 'react';

function SideBar({ recipeList, setFilter, activeFilter, setActiveFilter }) {
    {/* seperated buttons by hooks to solve the button opening all filter categories*/ }
    const [isMealOpen, setIsMealOpen] = useState(false);
    const [isLowCalOpen, setIsLowCalOpen] = useState(false);
    const [isTimeSavingOpen, setIsTimeSavingOpen] = useState(false);
    const [isCheapEatsOpen, setIsCheapEatsOpen] = useState(false);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilter(recipeList);
            return;
        }

        /* Insert functionality for sorting filters here  */
    })

    {/* Used Warning yellow for the filter buttons, feel free to change if something else is prefered 

       **** side note  **** 
        feel free to change the buttons to the respective names in the filter categories 

        */}

    return (
        <div className="SideBar">
            <button className='btn btn-warning Pb' onClick={() => setIsMealOpen(!isMealOpen)}> <b>Meal Type (+)</b> </button>
            {isMealOpen && <div className="SideBar-List">
                <button type='button' className='btn btn-secondary sb'> Breakfast </button>
                <button type='button' className='btn btn-secondary sb'> Lunch </button>
                <button type='button' className='btn btn-secondary sb'> Dinner</button>
                <button type='button' className='btn btn-secondary sb'> Other </button>


            </div>}
            <button className='btn btn-warning Pb' onClick={() => setIsLowCalOpen(!isLowCalOpen)}> <b>Low Calorie Options (+)</b> </button>
            {isLowCalOpen && <div className="SideBar-List2">
                <button type='button' className='btn btn-secondary sb'> Breakfast </button>
                <button type='button' className='btn btn-secondary sb'> Lunch </button>
                <button type='button' className='btn btn-secondary sb'> Dinner</button>
                <button type='button' className='btn btn-secondary sb'> Other </button>


            </div>}
            <button className='btn btn-warning Pb' onClick={() => setIsTimeSavingOpen(!isTimeSavingOpen)}> <b>Time Saving (+)</b> </button>
            {isTimeSavingOpen && <div className="SideBar-List2">
                <button type='button' className='btn btn-secondary sb'> Breakfast </button>
                <button type='button' className='btn btn-secondary sb'> Lunch </button>
                <button type='button' className='btn btn-secondary sb'> Dinner</button>
                <button type='button' className='btn btn-secondary sb'> Other </button>


            </div>}

            <button className='btn btn-warning Pb' onClick={() => setIsCheapEatsOpen(!isCheapEatsOpen)}> <b>Cheap Eats (+)</b> </button>
            {isCheapEatsOpen && <div className="SideBar-List2">
                <button type='button' className='btn btn-secondary sb'> Breakfast </button>
                <button type='button' className='btn btn-secondary sb'> Lunch </button>
                <button type='button' className='btn btn-secondary sb'> Dinner</button>
                <button type='button' className='btn btn-secondary sb'> Other </button>


            </div>}




        </div>

    )
}

export default SideBar;