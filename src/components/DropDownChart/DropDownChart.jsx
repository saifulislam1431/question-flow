import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';


const MyNodeComponent = ({ node }) => {
    return (
        <div className="initechNode" onClick={() => alert("Hi my real name is: " + node.name)}>{node.name}</div>
    );
};

const DropDownChart = () => {

    const initechOrg = {
        _id: "66266fbb66d7129162f79bfe",
        name: "Good day! I'm thrilled to assist you with your train ticket booking. How may I serve you today?",
        children: [
            {
                name: "Booking",
                Type: "Button",
                Action: "",
                NextStepId: "6628b3f9517701e1dee3c3fc",
                children: [
                    {
                        _id: "6628b3f9517701e1dee3c3fc",
                        FlowId: "662640ef73cacc52bc86a733",
                        ParentId: "66266fbb66d7129162f79bfe",
                        name: "Choose Option",
                        children: [
                            {
                                name: "A",
                                Type: "Button",
                                Action: "",
                                NextStepId: "6628b456517701e1dee3c3fe",
                                children: [
                                    {
                                        _id: "6628b456517701e1dee3c3fe",
                                        FlowId: "662640ef73cacc52bc86a733",
                                        ParentId: "6628b3f9517701e1dee3c3fc",
                                        name: "Why you've choose this option?",
                                        children: [
                                            {
                                                name: "A",
                                                Type: "Button",
                                                Action: "",
                                                NextStepId: ""
                                            },
                                            {
                                                name: "B",
                                                Type: "Button",
                                                Action: "",
                                                NextStepId: ""
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "B",
                                Type: "Button",
                                Action: "",
                                NextStepId: ""
                            }
                        ]
                    }
                ]
            },
            {
                name: "Return",
                Type: "Button",
                Action: "",
                NextStepId: ""
            },
            {
                name: "Cancel",
                Type: "Button",
                Action: "",
                NextStepId: "6628b419517701e1dee3c3fd",
                children: [
                    {
                        _id: "6628b419517701e1dee3c3fd",
                        FlowId: "662640ef73cacc52bc86a733",
                        ParentId: "66266fbb66d7129162f79bfe",
                        name: "Why are you cancelling?",
                        children: [
                            {
                                name: "Hamara Morji",
                                Type: "Button",
                                Action: "",
                                NextStepId: ""
                            },
                            {
                                name: "I don't know",
                                Type: "Button",
                                Action: "",
                                NextStepId: ""
                            }
                        ]
                    }
                ]
            }
        ],
        FlowId: "662640ef73cacc52bc86a733"
    }




    return (
        <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />
    );
};

export default DropDownChart;