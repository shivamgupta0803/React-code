import React from 'react';

const MyComponent = () => {

    // const styleThx = {
    //     fontSize: "70px",
    //     color: "blue",
    //     padding: "0 20px"
    // }

    return (
        <>
            <div className="hero py-16 mt-4  ">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="w-1/2">
                        <h1 className="text-3xl md:text-5xl font-bold"> THANK YOU  !</h1>
                        <hr/>
                        <button className="px-6 py-2 font-bold mt-4">'THANK YOU  FOR COMPLETEING THE ORDER WE'LL IN TOUCH WITH YOU SOON'</button>
                    </div>
                    <div className="w-1/2">
                        <img
                            className="w-4/5"
                            src="/images/Empty-cart.png"
                            alt="pizza"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyComponent;