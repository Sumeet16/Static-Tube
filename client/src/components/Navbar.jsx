import React from 'react'
import styled from "styled-components";
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilPlusCircle } from '@iconscout/react-unicons'
import { UilEstate } from '@iconscout/react-unicons'
import { NavLink } from 'react-router-dom';


const NavBar = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content:space-between;
    padding: 35px 50px;
    
`;
const Left = styled.div`
    width: 12%;
    height: 10%;
    display: flex;
    justify-content:space-between;
    align-items:center;

    @media only screen and (max-width: 760px) {
        width: 10%;
        height: 10%;
        margin-left: -10%;
    }
`;
const Right = styled.div`
    width: 5%;
    height: auto;
    display: flex;
    justify-content:space-between;

    @media only screen and (max-width: 760px) {
        width: 20%; 
        margin-right: -8%;
    }
`;
const LogoText = styled.p`
    font-size: 25px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;

    @media only screen and (max-width: 760px) {
        width: 0%;     
        font-size: 20px;
    }
`;

const Navbar = () => {
    return (
        <>
            <NavBar>
                <Left>
                    <UilPlayCircle />
                    <LogoText>StaticTube</LogoText>
                </Left>

                <Right>
                    <NavLink activeClassName="active_class" to="/"><UilEstate style={{ cursor: "pointer" }} /></NavLink>
                    <NavLink activeClassName="active_class" to="/upload"><UilPlusCircle style={{ cursor: "pointer" }} /></NavLink>
                </Right>
            </NavBar>
        </>
    )
}

export default Navbar