'use client'
import DropDownChart from '@/components/DropDownChart/DropDownChart';
import VerticalFlow from '@/components/VerticalFlow/VerticalFlow';
import React, { useEffect, useState } from 'react';

const HomePage = () => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/jsons/question.json")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      {/* <div>
        {questions.map((flow, index) => (
          <VerticalFlow key={index} data={flow} />
        ))}
      </div> */}
      <DropDownChart />
    </main>
  );
};

export default HomePage;
// import React, { useEffect } from 'react';
// import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
// import 'reactflow/dist/style.css';

// const initialData = [
//   {
//     "_id": "66266fbb66d7129162f79bfe",
//     "Question": "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
//     "Options": [
//       {
//         "Name": "Booking",
//         "Type": "Button",
//         "Action": "",
//         "NextStepId": "6628b3f9517701e1dee3c3fc",
//         "child": {
//           "_id": "6628b3f9517701e1dee3c3fc",
//           "FlowId": "662640ef73cacc52bc86a733",
//           "ParentId": "66266fbb66d7129162f79bfe",
//           "Question": "Choose Option",
//           "Options": [
//             {
//               "Name": "A",
//               "Type": "Button",
//               "Action": "",
//               "NextStepId": "6628b456517701e1dee3c3fe",
//               "child": {
//                 "_id": "6628b456517701e1dee3c3fe",
//                 "FlowId": "662640ef73cacc52bc86a733",
//                 "ParentId": "6628b3f9517701e1dee3c3fc",
//                 "Question": "Why you've choose this option?",
//                 "Options": [
//                   {
//                     "Name": "A",
//                     "Type": "Button",
//                     "Action": "",
//                     "NextStepId": ""
//                   },
//                   {
//                     "Name": "B",
//                     "Type": "Button",
//                     "Action": "",
//                     "NextStepId": ""
//                   }
//                 ],
//                 "children": []
//               }
//             },
//             {
//               "Name": "B",
//               "Type": "Button",
//               "Action": "",
//               "NextStepId": ""
//             }
//           ],
//           "children": []
//         }
//       },
//       {
//         "Name": "Return",
//         "Type": "Button",
//         "Action": "",
//         "NextStepId": ""
//       },
//       {
//         "Name": "Cancel",
//         "Type": "Button",
//         "Action": "",
//         "NextStepId": "6628b419517701e1dee3c3fd",
//         "child": {
//           "_id": "6628b419517701e1dee3c3fd",
//           "FlowId": "662640ef73cacc52bc86a733",
//           "ParentId": "66266fbb66d7129162f79bfe",
//           "Question": "Why are you cancelling?",
//           "Options": [
//             {
//               "Name": "Hamara Morji",
//               "Type": "Button",
//               "Action": "",
//               "NextStepId": ""
//             },
//             {
//               "Name": "I don't know",
//               "Type": "Button",
//               "Action": "",
//               "NextStepId": ""
//             }
//           ],
//           "children": []
//         }
//       }
//     ],
//     "FlowId": "662640ef73cacc52bc86a733"
//   }
// ]

// function createNodesAndEdges(data, parentId = null, posY = 0, offsetX = 0) {
//   let nodes = [];
//   let edges = [];
//   let positionX = offsetX;

//   data.forEach((item, index) => {
//     const nodeId = `node-${item._id}`;
//     const node = {
//       id: nodeId,
//       type: 'default',
//       data: { label: `${item.Question}` },
//       position: { x: positionX, y: posY * 150 }
//     };
//     nodes.push(node);

//     if (parentId) {
//       const edgeId = `e-${parentId}-${item._id}-${index}`;
//       const edge = {
//         id: edgeId,
//         source: parentId,
//         target: nodeId,
//         animated: true,
//         arrowHeadType: 'arrowclosed'
//       };
//       edges.push(edge);
//     }

//     if (item.Options) {
//       item.Options.forEach((option, optionIndex) => {
//         const childId = option.NextStepId ? `node-${option.NextStepId}` : `node-end-${option.Name}-${optionIndex}`;
//         const childNode = {
//           id: childId,
//           type: 'default',
//           data: { label: `${option.Name}` },
//           position: { x: positionX, y: (posY + 1) * 150 }
//         };
//         nodes.push(childNode);
//         const edgeId = `e-${nodeId}-${childId}`;
//         edges.push({
//           id: edgeId,
//           source: nodeId,
//           target: childId,
//           animated: true,
//           arrowHeadType: 'arrowclosed'
//         });

//         if (option.child) {
//           const [childNodes, childEdges] = createNodesAndEdges([option.child], childId, posY + 2, positionX);
//           nodes = [...nodes, ...childNodes];
//           edges = [...edges, ...childEdges];
//           positionX += 300; // Adjust as necessary
//         }
//       });
//     }
//   });

//   return [nodes, edges];
// }

// const HomePage = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   useEffect(() => {
//     const [initialNodes, initialEdges] = createNodesAndEdges(initialData);
//     setNodes(initialNodes);
//     setEdges(initialEdges);
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center w-full">
//       <div style={{ height: 800, width: '100%' }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           fitView
//         >
//           <MiniMap />
//           <Controls />
//           <Background />
//         </ReactFlow>
//       </div>
//     </main>
//   );
// };

// export default HomePage;
