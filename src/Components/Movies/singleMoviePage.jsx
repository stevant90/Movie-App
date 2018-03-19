import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from './../../constants';
import { SingleMovieComponent } from './singleMovieComponent';


export default class SingleMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            episodes: [],
            casts: [],
            seasons: []
        };
    }

    componentDidMount() {
        const showId = this.props.match.params.id;

        this.fetchData(showId);
    }

    fetchData(showId) {
        const singleMovieUrl = `${BASE_URL}/shows/${showId}`;
        const episodesUrl = `${BASE_URL}/shows/${showId}/episodes`;
        const showCastUrl = `${BASE_URL}/shows/${showId}/cast`;
        const seasonsUrl = `${BASE_URL}/shows/${showId}/seasons`;

        axios.get(singleMovieUrl)
            .then(response => {
                this.setState({ movie: response.data });

                return axios.get(episodesUrl)
                    .then(response => {
                        this.setState({ episodes: response.data });

                        return axios.get(showCastUrl)
                            .then(response => {
                                this.setState({ casts: response.data });

                                return axios.get(seasonsUrl)
                                    .then(response => {
                                        this.setState({ seasons: response.data });
                                    });
                            });
                    });

            }).catch(error => alert(error));
    }

    render() {

        const { movie, episodes, casts, seasons } = this.state;

        if (!movie || !episodes || !casts) {
            return <p>Loading movie...</p>
        }

        return <SingleMovieComponent movie={movie} episodes={episodes} casts={casts} seasons={seasons} />

    }
}
