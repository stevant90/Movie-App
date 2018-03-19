import React, { Component } from 'react';
import axios from 'axios';
import { Row, Button } from 'react-materialize';

import { BASE_URL, MOVIES_KEY } from './../../constants';
import { MoviesComponent } from './moviesComponent';
import SearchBar from './../Common/searchBar';

export default class MoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            filteredShows: [],
            visibility: 'hidden',

        };
    }

    componentDidMount() {

        if (this.hasLocalPosts()) {
            this.loadData();
        } else {
            this.fetchData();
        }
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.showHideBackToTopBtn);
    }

    hasLocalPosts() {
        return !!localStorage.getItem(MOVIES_KEY);
    }

    loadData() {
        const localString = localStorage.getItem(MOVIES_KEY);

        if (localStorage) {
            const allShows = JSON.parse(localString);
            this.setState({
                shows: allShows,
                filteredShows: allShows
            });
        }
    }

    fetchData() {
        const showsUrl = `${BASE_URL}/shows`;

        axios.get(showsUrl)
            .then(response => {
                this.setState({
                    shows: response.data,
                    filteredShows: response.data
                });

                const showsForStorage = response.data;
                localStorage.setItem(MOVIES_KEY, JSON.stringify(showsForStorage));

            }).catch(error => alert(error));
    }

    movieSearch = (term) => {
        const currentShows = this.state.shows;

        let filteredList = currentShows.filter(item => {
            return item.name.toLowerCase().includes(term.toLowerCase());
        });

        this.setState({ filteredShows: filteredList })

    }  

    showHideBackToTopBtn = () => {

        this.setState({ visibility: 'hidden' });

        if (window.scrollY > 100) {
            this.setState({ visibility: '' });
        }
    }

    render() {

        const shows = this.state.filteredShows;

        if (!shows) {
            return <p>Loading shows...</p>
        }

        window.addEventListener('scroll', this.showHideBackToTopBtn);

        return (

            <Row>
                <SearchBar handleSearch={this.movieSearch} />
                {shows.map(show => {
                    return <MoviesComponent show={show} key={show.id} />
                })}
                <a style={{ visibility: this.state.visibility }} href="#"><Button floating large className='red up-btn' waves='light' icon='keyboard_arrow_up' /></a>
            </Row>

        );
    }
}