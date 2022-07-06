import React from "react";
import logoImg  from '../assets/images/logo.svg'
function Header(step1) {
    let st;
    st = step1.step1;   
    return (
        <header className="header d-flex">
		<div className="logo">
            <img src={logoImg} alt="logo" />
                    </div>
                    <div className="enquiry-steps d-flex">
                    <div className={st >= 1 ? 'steps active' : 'steps'}>
                            <span>step 1</span>
                            <span>make an enquiry</span>
                        </div>
                        <div className={st >= 2 ? 'steps active' : 'steps'}>
                            <span>step 2</span>
                            <span>select your service</span>
                        </div>
                        <div className={step1.step1>=3 ? 'steps active' : 'steps'}>
                            <span>step 3</span>
                            <span>add your details</span>
                        </div>
                        <div className={step1.step1>=4 ? 'steps active' : 'steps'}>
                            <span>step 4</span>
                            <span>select your service provider</span>
                        </div>
                    </div>
        </header>
    )
}

export default Header;