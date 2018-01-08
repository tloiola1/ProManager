import React from "react";
import { Container, Row } from "../../components/Grid";
import { FixedHeader } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { InverseButton } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { Span, Margin } from "../../components/Tag";
import { NavButton } from "../../components/Nav";

const Manager = () =>
<div>
    <div className="fixed-top fixed-top-custom"></div>
    <FixedHeader>
            <Container>
                <Row>
                    <Logo/>
                    <NavButton>
                            <Span>
                                <strong> 
                                    Hello Tarciso 
                                </strong>
                            </Span>
                            <a id="logoff" href="/"><strong> | Log Off</strong></a>
                    </NavButton>
                </Row>
            </Container>
    </FixedHeader>

    <Margin/>
        <Container>
            <Row >
                <InverseButton className="justify-content-sm-center col-md-3 col-sm-4" toggle="modal" target="#add-property-modal" >
                    Add a Property
                </InverseButton>
            </Row>
        </Container>
    <Modal/>
</div>

export default Manager;