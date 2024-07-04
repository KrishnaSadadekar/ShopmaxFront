import React, { useState } from 'react';

function About() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [search,setSearch]=useState();
    const handleButtonClick = () => {
        setIsSearchVisible(true);
    };

    const handleCloseSearch = () => {
        setIsSearchVisible(false);
    };
    const handleSubmit=()=>
        {
            console.log(search);
        }
    return (
        <div>
            <h1>About us!</h1>
            {isSearchVisible && (
                <div className="" id='searchbox'>
                    <div className="container" id='se'>
                        <a href="#" className="search-close js-search-close" onClick={handleCloseSearch}>
                            <span className="icon-close2">Close</span>
                        </a>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" onChange={(e)=>setSearch(e.target.value)} placeholder="Search keyword and hit enter..." />
                        </form>
                        <button className="btn btn-primary m-2" onClick={handleCloseSearch}>
                            Close me!
                        </button>
                    </div>
                </div>
            )}
            <div className='m-2'>
                <button className="btn btn-primary" onClick={handleButtonClick}>
                    Click me!
                </button>

            </div>

        </div>
    );
}

export default About;
