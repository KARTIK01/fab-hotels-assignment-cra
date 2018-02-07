import React, {Component} from "react";
import "./App.css";
import SearchField from "./components/SearchField";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img
                        src="https://lh3.googleusercontent.com/SdcuepMPgbvkmxgoylQ0KE--9Sr_GBod4A0bXdwJb8wbDWylEiiGKhtBqJohDhNXO4o=w300"
                        className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Fab Hotels</h1>
                </header>
                <p className="App-intro">
                    Search Your place here
                </p>
                <SearchField />
                <footer className="footer">
                    <p>Developed by: <a target="_blank" href="https://www.linkedin.com/in/kartik-agarwal/">Kartik
                        Agarwal</a></p>
                    <p>Contact information: <a href="mailto:kartikagarwal01@gmail.com">kartikagarwal01@gmail.com</a>.
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;
