
import React from "react";

const MemberTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {props.members.map(m => <tr key={m.name}>
                                            <td>{m.name}</td>
                                            <td>{m.age}</td>
                                        </tr>)}
            </tbody>
        </table>
    );
}

const MemberDemo = (props) => {
    return (
        <div>
            <h4>{props.heading}</h4>
            <MemberTable members={props.members} />
        </div>
    );
}

const Members = () => {
    const initialMembers = [{name : "Peter", age: 18},
                            {name : "Hanne", age: 35},
                            {name : "Janne", age: 25},
                            {name : "Holger", age: 22}];
    return (
        // React så man ikke får 2 div 
        <React.Fragment>
            <MemberDemo heading='All Members' members={initialMembers} />
            <MemberDemo heading='All Cool Members' members={initialMembers} />
        </React.Fragment> 
        
    );
}

export default Members;

