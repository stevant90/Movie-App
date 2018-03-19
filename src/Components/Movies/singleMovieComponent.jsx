import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle, Icon } from 'react-materialize';


export const SingleMovieComponent = ({ movie, episodes, casts, seasons }) => {

    const { id, name, premiered, runtime, officialSite } = movie;
    const summary = movie.summary.replace(/<[^>]*>/g, '');
    const genre = movie.genres[0];
    const img = movie.image.original;


    return (
        <Row>
            <Col s={12} m={6} l={5} offset='l1'>
                <Link to='/' className='back-btn'><Icon small>arrow_back</Icon></Link>
                <Card header={<CardTitle image={img}></CardTitle>} actions={[<a key={id} href={officialSite} target='_blank'>Link to show</a>]}>
                    <p>{summary}</p>
                </Card>
                <Card>
                    <h3>Seasons ({seasons.length})</h3>
                    {seasons.map(season => {
                        return <ul key={season.id}>Season {season.number}: Start: {new Date(season.premiereDate).toDateString()} - 
                        End: {new Date(season.endDate).toDateString()}</ul>
                    })}
                </Card>
            </Col>
            <Col s={12} m={6} l={5}>
                <Card>
                    <h1>{name}</h1>
                    <h5>Episodes ({episodes.length})</h5>
                    <p>Genre: {genre}</p>
                    <p>Premiered: {new Date(premiered).toDateString()}</p>
                    <p>Runtime: {runtime} min</p>
                    <h5>Casts</h5>
                    <div>{casts.map(cast => {
                        return <a key={cast.person.id} target='_blank' href={cast.person.url}>
                            <Card><img src={cast.person.image.medium}
                                alt={cast.person.name} style={{ width: '50px', borderRadius: '5px' }} /> {cast.person.name} - {cast.character.name}</Card></a>
                    })}</div>
                </Card>
            </Col>
        </Row>

    );
}