'use client'
import React, { useRef } from 'react';
import Tree from 'react-d3-tree';
import { useDraggable } from 'react-use-draggable-scroll';

const D3FlowGraph = () => {
    const containerRef = useRef(null);
    const { events } = useDraggable(containerRef, {
        applyRubberBandEffect: true,
    });
    const orgChart = {
        name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
        children: [
            {
                name: 'Manager',
                attributes: {
                    department: 'Production',
                },
                children: [
                    {
                        name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
                        attributes: {
                            department: 'Fabrication',
                        },
                        children: [
                            {
                                name: 'Worker',
                            },
                        ],
                    },
                    {
                        name: 'Foreman',
                        attributes: {
                            department: 'Assembly',
                        },
                        children: [
                            {
                                name: 'Worker',
                            },
                        ],
                    },
                ],
            },
        ],
    };

    const handleNodeClick = (nodeName) => {
        alert(nodeName);
    };

    // const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
    //     const padding = 10; // Padding inside the rectangle
    //     const charWidth = 10; // Approximate width per character
    //     const textLength = nodeDatum.name.length;
    //     const rectWidth = textLength * charWidth + 2 * padding; // Calculate width based on text length

    //     return (
    //         <g onClick={(e) => {
    //             e.stopPropagation(); // Prevents event bubbling
    //             handleNodeClick(nodeDatum.name);
    //             toggleNode();
    //         }}>
    //             <defs>
    //                 <filter id="f1" x="0" y="0" width="200%" height="200%">
    //                     <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
    //                     <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
    //                     <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    //                 </filter>
    //             </defs>
    //             <rect
    //                 width={rectWidth}
    //                 height="50"
    //                 x={-rectWidth / 2}
    //                 y="-25"
    //                 fill="#26C279"
    //                 stroke="#155F3D"
    //                 strokeWidth="1px"
    //                 rx="10" // Set border radius here
    //                 ry="10"
    //                 filter="url(#f1)" // Apply shadow effect
    //             />
    //             <text
    //                 fill="#ffffff"
    //                 stroke="#ffffff"
    //                 strokeWidth=".5"
    //                 x="0"
    //                 y="0"
    //                 textAnchor="middle"
    //                 alignmentBaseline="middle"
    //                 style={{ pointerEvents: "none" }} // Prevent text from capturing click events
    //             >
    //                 {nodeDatum.name}
    //             </text>
    //         </g>
    //     );
    // };


    const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
        const maxCharsPerLine = 28; // Adjust this if needed
        const lineHeight = 20; // Line height in pixels
        const verticalPadding = 10; // Vertical padding inside the rectangle
        const horizontalPadding = 10; // Horizontal padding inside the rectangle
        const rectWidth = 220; // Fixed width of the rectangle

        // Function to split text into lines without breaking words
        const splitText = (text, maxChars) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                if (currentLine.length + words[i].length + 1 <= maxChars) {
                    currentLine += ' ' + words[i];
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            lines.push(currentLine);
            return lines;
        };

        const lines = splitText(nodeDatum.name, maxCharsPerLine); // Split text into lines
        const rectHeight = lines.length * lineHeight + 2 * verticalPadding; // Calculate height based on number of lines

        return (
            <g onClick={(e) => {
                e.stopPropagation(); // Prevents event bubbling
                handleNodeClick(nodeDatum.name);
                toggleNode();
            }}>
                <defs>
                    <filter id="f1" x="0" y="0" width="200%" height="200%">
                        <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
                <rect
                    width={rectWidth}
                    height={rectHeight}
                    x={-rectWidth / 2}
                    y={-rectHeight / 2}
                    fill="#26C279"
                    stroke="#155F3D"
                    strokeWidth="1px"
                    rx="10"
                    ry="10"
                    filter="url(#f1)"
                />
                {lines.map((line, index) => (
                    <text
                        key={index}
                        fill="#ffffff"
                        stroke="none"
                        strokeWidth="0"
                        x={lines.length === 1 ? 0 : -rectWidth / 2 + horizontalPadding} // Center if only one line
                        y={lines.length === 1
                            ? 0 // Vertically center if only one line
                            : -rectHeight / 2 + verticalPadding + lineHeight * (index + 0.5)}
                        textAnchor={lines.length === 1 ? "middle" : "start"}
                        alignmentBaseline="middle"
                        style={{ pointerEvents: "none" }}
                    >
                        {line}
                    </text>
                ))}
            </g>
        );
    };




    return (
        <div id="treeWrapper" style={{
            width: "100%",
            height: "600px",
            border: "1px solid #000"
        }} className="overflow-scroll"
            ref={containerRef}
            {...events}
        >
            <Tree data={orgChart} zoomable={true} Draggable={true} collapsible={true} orientation='vertical' renderCustomNodeElement={renderCustomNodeElement} />
        </div>
    );
};

export default D3FlowGraph;