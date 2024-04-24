'use client'
import React, { useState } from 'react';
import VerticalFlow from '../VerticalFlow/VerticalFlow';

const Option = ({ option, level }) => {
    const [expanded, setExpanded] = useState(false);
    const [currentOption, setCurrentOption] = useState("");
    console.log(currentOption);

    const handleToggle = () => {
        if (option?.child) {
            setExpanded(!expanded);
        }
        if (level === 1) {
            setCurrentOption(option?.Name + level)
        }
    };
    return (
        <div className={`py-2 rounded mt-6 space-y-6 relative gap-5 w-full`}>
            <div onClick={handleToggle} className='cursor-pointer border p-6 rounded w-full'
                style={{
                    // boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'

                    boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px'
                }}
            >
                {expanded ? '▼' : option.child && '+'} {option.Name}
            </div>
            <div className={`${expanded && option.child ? "relative -left-16 text-nowrap" : ""} w-full`}>
                {expanded && option.child ? (
                    <VerticalFlow data={option.child} level={level + 1} parent={option?.Name} />
                ) : null}
            </div>
        </div>
    );
};

export default Option;