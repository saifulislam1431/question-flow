'use client'
import React, { useState } from 'react';
import Option from '../Option/Option';
import Line from '../Line/Line';

const VerticalFlow = ({ data, level = 0, parentExpanded, parent }) => {
    console.log(parent);
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };
    return (
        <div style={{ marginLeft: `60px` }}>
            <div onClick={handleToggle} className='cursor-pointer shadow p-6 rounded w-full'
                style={{
                    boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
                }}
            >
                {
                    parent && <div className='w-full flex justify-end items-center'>
                        <p></p>
                        <p className='bg-red-600 px-3 py-1 text-xs text-white rounded-3xl font-medium'>{parent}</p>
                    </div>
                }
                <p>{expanded ? '▼' : '►'} {data.Question}</p>
            </div>
            {expanded && (
                <div className='relative flex items-start justify-between w-full gap-8'>
                    {data.Options.map((option, index) => (
                        <Option
                            key={index}
                            option={option}
                            level={level + 1}
                            parentExpanded={expanded}
                        />
                    ))}
                    {level > 0 && parentExpanded && <Line />}
                </div>
            )}
        </div>

    );
};

export default VerticalFlow;