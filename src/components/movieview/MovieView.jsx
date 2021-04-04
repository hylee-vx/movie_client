import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './MovieView.scss';

const MovieView = props => {
    const { movie, user } = props;
    const [favourites, setFavourites] = useState([]);
    if (!movie) return null;

    // convert ISO format date to display full year only
    const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();
    const directors = movie.Directors;
    const actors = movie.Actors;

    const handleAddFavourite = () => {
        const accessToken = localStorage.getItem('token');

        axios({
            method: 'post',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}/movies/${movie._id}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { FavouriteMovies: movie._id }
        })
            .then(response => {
                setFavourites([response.data]);
                console.log(`${movie.Title} successfully added to favourites`);
            })
            .then(() => props.updateProfile(user))
            .catch(error => error + ` error adding ${movie.Title} to favourites`);
    };

    return (
        <Container className="movie-view" fluid>
            <Row className="movie-view-header">
                <h3 className="movie-title">{movie.Title}</h3>
                <h3 className="movie-release-year">{`(${movieReleaseYear})`}</h3>
            </Row>
            <Row className="movie-view-content">
                <Col className="movie-poster">
                    <img src={movie.ImagePath} />
                </Col>
                <Col className="movie-details">
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div>

                    <div className="movie-directors">
                        <span className="label">Directors: </span>
                        {directors.map(d =>
                            <Link to={`/directors/${d.Name}`}>
                                <Button className="value" variant="link">{d.Name}</Button>
                            </Link>
                        )}
                    </div>

                    <div className="movie-actors">
                        <span className="label">Actors: </span>
                        {actors.map(a =>
                            <Link to={`/actors/${a.Name}`}>
                                <Button className="value" variant="link">{a.Name}</Button>
                            </Link>
                        )}
                    </div>

                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button className="value" variant="link">{movie.Genre.Name}</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row className="float-right">
                <Button
                    className="add-movie-btn"
                    variant="primary"
                    onClick={() => {
                        handleAddFavourite();
                    }}
                >
                    Add to favourites
                </Button>

                <Link to={'/'}>
                    <Button className="back-btn" variant="primary">Back</Button>
                </Link>
            </Row>
        </Container >
    );
};


MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Directors: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string.isRequired
        })).isRequired,
        Actors: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string
        })),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};

export default MovieView;