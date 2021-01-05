import React from 'react'
import TacticsResources from './tactics'
// import MiscResources from './miscellaneous'
import DisclosurePolicy from './disclosurePolicy'
import EndgameResources from './endgames'
import StrategyResources from './strategy'
import OpeningResources from './openings'
import OneClickBuyAll from './oneClickCheckout'
import ThankYou from './thankYou'

const Resources = () => {

    return (
        <div className="resources-page"> 
            <DisclosurePolicy />
            <OneClickBuyAll />
            <TacticsResources />
            <EndgameResources />
            <StrategyResources />
            <OpeningResources />
            {/* <MiscResources /> */}
        
        </div>
    )
}

export default Resources
