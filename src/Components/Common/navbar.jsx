import React from 'react';
import { Navbar, NavItem } from 'react-materialize';

export const Navigation = () => {

    return (
        <Navbar brand='Movie-app' right>
            <NavItem href='#/'>Home</NavItem>
        </Navbar>
    );
}