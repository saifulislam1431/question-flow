'use client'
import { useCenteredTree } from '@/utils/helper';
import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { useDraggable } from 'react-use-draggable-scroll';

const D3FlowGraph = () => {
    const [optionValue, setOptionValue] = useState("");
    // console.log(optionValue);
    const containerStyles = {
        width: "100vw",
        height: "100vh",
        overflow: "scroll"  // Ensure this is set to allow scrolling
    };
    const [dimensions, translate, containerRef] = useCenteredTree();
    const [dragEvents, setDragEvents] = useState({});
    const [treeData, setTreeData] = useState([
        {
            name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today? I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
            children: [
                {
                    name: 'Booking',
                    attributes: { department: 'Production' },
                    children: [
                        {
                            name: "A",
                            attributes: { department: 'Fabrication' },
                            children: [
                                { name: "Why you've choose this option? Why you've choose this option?", children: [{ name: "A" }, { name: "B" }] }
                            ],
                        },
                        {
                            name: "B",
                            attributes: { department: 'Assembly' },
                            children: [],
                        }
                    ],
                },
                {
                    name: 'Return',
                    attributes: { department: 'Production' },
                    children: [],
                },
                {
                    name: 'Cancel',
                    attributes: { department: 'Production' },
                    children: [
                        { name: "Hamara Morji", attributes: { department: 'Fabrication' } },
                        { name: "I don't know", attributes: { department: 'Assembly' }, children: [] },
                    ],
                },
            ],
        }
    ]);
    const [showTree, setShowTree] = useState(false);

    useEffect(() => { setShowTree(true) }, [])

    useEffect(() => {
        if (containerRef.current) {
            const { events } = useDraggable(containerRef, {
                applyRubberBandEffect: true,
            });
            setDragEvents(events);
        }
    }, [containerRef.current]);

    useEffect(() => {
        setTreeData(currentData => currentData.map(node => ({
            ...node,
            children: node.children.map(child => ({
                ...child,
                collapsed: true,
                children: child.children?.map(subChild => ({
                    ...subChild,
                    collapsed: true
                }))
            }))
        })));
    }, []);

    if (!showTree) {
        return <></>
    }

    // const orgChart = {
    //     name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
    //     children: [
    //         {
    //             name: 'Booking',
    //             attributes: {
    //                 department: 'Production',
    //             },
    //             children: [
    //                 {
    //                     name: "A",
    //                     attributes: {
    //                         department: 'Fabrication',
    //                     },
    //                     children: [
    //                         {
    //                             name: "Why you've choose this option?",
    //                             children: [
    //                                 {
    //                                     name: "A",
    //                                 },
    //                                 {
    //                                     name: "B",
    //                                 }
    //                             ]
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     name: 'B',
    //                     attributes: {
    //                         department: 'Assembly',
    //                     },
    //                     children: [],
    //                 }
    //             ],
    //         },
    //         {
    //             name: 'Return',
    //             attributes: {
    //                 department: 'Production',
    //             },
    //             children: [],
    //         },
    //         {
    //             name: 'Cancel',
    //             attributes: {
    //                 department: 'Production',
    //             },
    //             children: [
    //                 {
    //                     name: "Hamara Morji",
    //                     attributes: {
    //                         department: 'Fabrication',
    //                     },
    //                     children: [],
    //                 },
    //                 {
    //                     name: "I don't know",
    //                     attributes: {
    //                         department: 'Assembly',
    //                     },
    //                     children: [
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    // };

    const toggleChildrenVisibility = (nodes, nodeName) => nodes.map(node => ({
        ...node,
        children: node.children ? toggleChildrenVisibility(node.children, nodeName) : undefined,
        collapsed: node.name === nodeName ? !node.collapsed : node.collapsed,
    }));

    const handleNodeClick = (nodeData, node) => {
        // console.log(node);
        // Set the option value to the node's name
        setOptionValue(nodeData);
        // Toggle collapse state
        if (nodeData.children) {
            const newTreeData = toggleChildrenVisibility(treeData, nodeData);
            setTreeData(newTreeData);
        }
    };



    const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
        const maxCharsPerLine = 38; // Adjust this if needed
        const lineHeight = 20; // Line height in pixels
        const verticalPadding = 10; // Vertical padding inside the rectangle
        const horizontalPadding = 20; // Horizontal padding inside the rectangle
        const rectWidth = 300;
        const singleWidth = 160 // Fixed width of the rectangle
        // Fixed width of the rectangle

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

        const handleEdit = (node) => {
            console.log("Edit data of", node);
        }

        const handleAdd = (node) => {
            console.log("Add data of", node);
        }

        const lines = splitText(nodeDatum.name, maxCharsPerLine); // Split text into lines
        const rectHeight = lines.length * lineHeight + 6 * verticalPadding; // Calculate height based on number of lines

        return (
            <g onClick={(e) => {
                e.stopPropagation(); // Prevents event bubbling
                handleNodeClick(nodeDatum.name, nodeDatum);
                toggleNode();
            }}>
                <defs>
                    {nodeDatum?.children?.length > 0 ? (
                        <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
                            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
                            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                    ) : (
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            {/* <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" /> */}
                            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                            <feDropShadow
                                dx="0"
                                dy="2"
                                stdDeviation="5"
                                floodColor="#ff685e"
                                floodOpacity="0.8"
                            />
                        </filter>
                    )}
                </defs>

                <rect
                    width={lines?.length === 1 && nodeDatum.name.length < 15 ? singleWidth : rectWidth}
                    height={rectHeight}
                    x={lines?.length === 1 && nodeDatum.name.length < 15 ? -singleWidth / 2 : -rectWidth / 2}
                    y={-rectHeight / 3}
                    rx="30"
                    ry="30"
                    filter={nodeDatum?.children?.length > 0 ? "url(#f1)" : "url(#shadow)"}
                />
                {lines.map((line, index) => (
                    <g key={index}>
                        <text
                            fill="#ffffff"
                            stroke="none"
                            strokeWidth="0"
                            x={lines.length === 1 ? 0 : -rectWidth / 17 + horizontalPadding} // Center if only one line
                            y={lines.length === 1
                                ? 0 // Vertically center if only one line
                                : -rectHeight / 3 + verticalPadding + lineHeight * (index + 0.5)}
                            textAnchor={lines.length === 1 ? "middle" : "middle"}
                            alignmentBaseline="middle"
                            style={{ pointerEvents: "none" }}
                        >
                            {line}
                        </text>
                        {nodeDatum?.children?.length > 0 ? (
                            <image
                                xlinkHref="./assets/icon/edit.png" // Provide the path to the edit icon SVG
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents event bubbling
                                    handleEdit(nodeDatum)
                                }}
                                x={-10} // Example value: 20 units from the left
                                y={lines?.length === 1 ? rectHeight / 5 : lines?.length === 2 ? rectHeight / 4 : lines?.length === 3 ? rectHeight / 3 : rectHeight / 2.3}// Example value: 20 units from the top
                                width={25} // Example value: 40 units width
                                height={25} // Example value: 40 units height
                            // Set other attributes for the edit icon as needed
                            />
                        ) : (
                            <>
                                <image
                                    xlinkHref="./assets/icon/edit.png" // Provide the path to the edit icon SVG
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents event bubbling
                                        handleEdit(nodeDatum)
                                    }}
                                    x={8} // Example value: 20 units from the left
                                    y={lines?.length === 1 ? rectHeight / 5 : lines?.length === 2 ? rectHeight / 4 : lines?.length === 3 ? rectHeight / 3 : rectHeight / 2.3} // Example value: 20 units from the top
                                    width={25} // Example value: 40 units width
                                    height={25} // Example value: 40 units height
                                // Set other attributes for the edit icon as needed
                                />
                                <image
                                    xlinkHref="./assets/icon/plus.png" // Provide the path to the add icon SVG
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents event bubbling
                                        handleAdd(nodeDatum)
                                    }}
                                    x={-28} // Example value: 20 units from the left
                                    y={lines?.length === 1 ? rectHeight / 5 : lines?.length === 2 ? rectHeight / 4 : lines?.length === 3 ? rectHeight / 3 : rectHeight / 2.3} // Example value: 20 units from the top
                                    width={25} // Example value: 40 units width
                                    height={25} // Example value: 40 units height
                                // Set other attributes for the add icon as needed
                                />
                            </>
                        )}

                        {
                            nodeDatum?.children?.length > 0 && <image
                                xlinkHref="./assets/icon/chevron.png" // Provide the path to the edit icon SVG
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents event bubbling
                                    toggleNode();
                                }}
                                x={-13} // Example value: 20 units from the left
                                y={lines.length === 1 ? 60 : rectHeight / 1.4}  // Example value: 20 units from the top
                                width={25} // Example value: 40 units width
                                height={25} // Example value: 40 units height
                            // Set other attributes for the edit icon as needed
                            />
                        }
                    </g>
                ))}
            </g>

        );
    };




    return (

        <div id="treeWrapper"
            {...dragEvents}  // Apply draggable events
            className="overflow-scroll"
            style={containerStyles}
            translate={translate}
            ref={containerRef}
        >
            <Tree
                data={treeData}
                zoomable={true}
                translate={translate}
                orientation='vertical'
                renderCustomNodeElement={renderCustomNodeElement}
                nodeSize={{ x: 200, y: 200 }}
                separation={{ siblings: 2, nonSiblings: 2 }}
                pathFunc="diagonal"
                initialDepth={0}
                shouldCollapseNeighborNodes={true}
            />
        </div>
    );
};

export default D3FlowGraph;

