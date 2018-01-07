import React from "react";
import { Container, Row } from "../../components/Grid";
import { FixedHeader } from "../../components/Header";
import { Body } from "../../components/Body";
import { Login, Register } from "../../components/Modal";
import { H1, Margin } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { NavButton } from "../../components/Nav";

const Home = () =>
<div>
    <Body>
        <div className="fixed-top fixed-top-custom"></div>
        <FixedHeader>
                <Container>
                    <Row>
                        <Logo/>
                        <NavButton>
                            <H1>
                                <Button toggle="modal" target="#login">Login</Button>
                                <Button toggle="modal" target="#register">Register</Button>
                            </H1>
                        </NavButton>
                    </Row>
                </Container>
        </FixedHeader>
        <Login/>
        <Register/>
        <Margin/>
        <a href="/findproperty" className="btn btn-large-success">Find a new home.</a>
    </Body>
</div>

export default Home;