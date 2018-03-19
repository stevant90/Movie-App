import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, Col } from 'react-materialize';

export const MoviesComponent = ({ show }) => {

    const { id, name } = show;
    const summary = show.summary.replace(/<[^>]*>/g, '');

    const image = show.image.medium;

    return (

        <Col s={12} m={6} l={2} className='grid-example'>
            <Card className='main-card' header={<CardTitle reveal image={image} waves='light' />}
                title={name}
                reveal={<p>{summary}</p>}>
                <p><Link to={`/shows/${id}`}>See movie details</Link></p>
            </Card>
        </Col>
    );
}