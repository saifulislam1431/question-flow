import React, { useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialData = [/* your JSON data here */];

function createNodesAndEdges(data, parentId = null, posY = 0, offsetX = 0) {
    let nodes = [];
    let edges = [];
    let positionX = offsetX;

    data.forEach((item, index) => {
        const nodeId = `node-${item._id}`;
        const node = {
            id: nodeId,
            type: 'default',
            data: { label: `${item.Question}` },
            position: { x: positionX, y: posY * 150 }
        };
        nodes.push(node);

        if (parentId) {
            const edgeId = `e-${parentId}-${item._id}-${index}`;
            const edge = {
                id: edgeId,
                source: parentId,
                target: nodeId,
                animated: true,
                arrowHeadType: 'arrowclosed'
            };
            edges.push(edge);
        }

        if (item.Options) {
            item.Options.forEach((option, optionIndex) => {
                const childId = option.NextStepId ? `node-${option.NextStepId}` : `node-end-${option.Name}-${optionIndex}`;
                const childNode = {
                    id: childId,
                    type: 'default',
                    data: { label: `${option.Name}` },
                    position: { x: positionX, y: (posY + 1) * 150 }
                };
                nodes.push(childNode);
                const edgeId = `e-${nodeId}-${childId}`;
                edges.push({
                    id: edgeId,
                    source: nodeId,
                    target: childId,
                    animated: true,
                    arrowHeadType: 'arrowclosed'
                });

                if (option.child) {
                    const [childNodes, childEdges] = createNodesAndEdges([option.child], childId, posY + 2, positionX);
                    nodes = [...nodes, ...childNodes];
                    edges = [...edges, ...childEdges];
                    positionX += 300; // Adjust as necessary
                }
            });
        }
    });

    return [nodes, edges];
}

const FlowChart = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const [initialNodes, initialEdges] = createNodesAndEdges(initialData);
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center w-full">
            <div style={{ height: 800, width: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </main>
    );
};

export default FlowChart;
