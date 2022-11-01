import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container style={{"paddingBottom":40, "paddingTop":40 , "display": 'flex', 'alignItems':'center'}}>

                    {children}

        </Container>
    )
}

export default FormContainer
