'use client'
import { useCenteredTree } from '@/utils/helper';
import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { useDraggable } from 'react-use-draggable-scroll';

const D3FlowGraph = () => {
    const [optionValue, setOptionValue] = useState("");
    console.log(optionValue);
    const containerStyles = {
        width: "100vw",
        height: "100vh",
        overflow: "scroll"  // Ensure this is set to allow scrolling
    };
    const [dimensions, translate, containerRef] = useCenteredTree();
    const [dragEvents, setDragEvents] = useState({});
    const [treeData, setTreeData] = useState([
        {
            name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
            children: [
                {
                    name: 'Booking',
                    attributes: { department: 'Production' },
                    children: [
                        {
                            name: "A",
                            attributes: { department: 'Fabrication' },
                            children: [
                                { name: "Why you've choose this option?", children: [{ name: "A" }, { name: "B" }] }
                            ],
                        },
                        {
                            name: 'B',
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

    const handleNodeClick = (nodeData) => {
        // Set the option value to the node's name
        setOptionValue(nodeData);
        // Toggle collapse state
        if (nodeData.children) {
            const newTreeData = toggleChildrenVisibility(treeData, nodeData);
            setTreeData(newTreeData);
        }
    };



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
                nodeSize={{ x: 150, y: 200 }}
                separation={{ siblings: 2, nonSiblings: 2 }}
                pathFunc="diagonal"
                initialDepth={0}
            />
        </div>
    );
};

export default D3FlowGraph;

