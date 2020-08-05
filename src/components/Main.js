import React, { Component } from "react";
import DatePicker from "react-date-picker";


class Main extends Component {
    state = {
        date: new Date(),
        photo: {}
    };

    getNewDate = (date) => {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return `${yy}-${mm}-${dd}`;
    }

    FetchPhotoFromApi = date => {
        const apiKey = 'CJfS9Qqeg3R3Mm4JzMxbnOJTO26ndK2Fmel0D6o1'
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(photoData => this.setState({ photo: photoData }));

    };

    componentWillMount() {
        localStorage.getItem('date') && this.setState({
            date:  new Date(localStorage.getItem('date')),
        })
    }

    componentDidMount() {
        if(!localStorage.getItem('date')){
            this.FetchPhotoFromApi(this.getNewDate(this.state.date))
            console.log('new')
        } else {
            this.FetchPhotoFromApi(this.getNewDate(new Date(localStorage.getItem('date')))) // get
            console.log('localStorage')
        }
    }

    render() {
        return (
            <div>
                <h1>NASA's Astronomy Picture of the Day</h1>

                <DatePicker
                    onChange={(value) => {
                        this.FetchPhotoFromApi(this.getNewDate(value))

                        this.setState({
                            date: value
                        })
                        if (this.getNewDate(value) === this.getNewDate(new Date())) {
                            localStorage.clear()
                        } else {
                            localStorage.setItem('date', value)
                        }
                    }}
                    value={this.state.date}
                    format={"y-MM-dd"}
                    clearIcon={null}
                />

                <div>
                    <h3>{this.state.photo.title}</h3>
                    {this.state.photo.media_type === "image" ? (
                        <img
                            src={this.state.photo.url}
                            alt={this.state.photo.title}
                            className="photo"
                        />
                    ) : (
                        <iframe
                            title="space-video"
                            src={this.state.photo.url}
                            frameBorder="0"
                            gesture="media"
                            allow="encrypted-media"
                            allowFullScreen
                            className="photo"
                        />
                    )}
                    <p>{this.state.photo.explanation}</p>

                </div>
            </div>
        );
    }
}

export default Main