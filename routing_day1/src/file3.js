import React from 'react';
import PropsTypes from 'prop-types';
import {persons} from "./file2";

export default function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
  
function WelcomePerson(props) {
    const { firstName, lastName, email } = props.person;

    return (
        <p>
            {firstName} {lastName} your e-mail is {email}
        </p>
    );
}

WelcomePerson.propTypes = {
    person: PropsTypes.shape({
        firstName: PropsTypes.string.isRequired,
        lastName: PropsTypes.string.isRequired,
        email: PropsTypes.string.isRequired,
    }),
};

export function MultiWelcome() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edith" />

            {persons.map((person) =>(
                <WelcomePerson
                    person={person}
                    key={person.firstName + person.lastName + person.email + person.phone}
                />
            ))}
        </div>
    );
}

