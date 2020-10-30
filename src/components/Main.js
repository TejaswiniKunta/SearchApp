import React, {Component} from 'react';
import Header from "./Header";
import SearchBox from "./SearchBox";
import calendar from '../shared/calendar.json';
import contacts from '../shared/contacts.json';
import dropbox from '../shared/dropbox.json';
import slack from '../shared/slack.json';
import tweet from '../shared/tweet.json';
import List from "./List";
import {Jumbotron} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import Tagging from "./Tagging";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchItem: '',
            list: [],
            errorMessage: '',
            listofSearchItem: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.clearContent = this.clearContent.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    }

    /*
     handles  filtering of data from json files
     if content not found, displays error message
     */
    handleChange(item) {
        console.log(item);
        if (item === "") {
            this.setState({searchItem: '', list: [], errorMessage: ''});
        } else {
            this.setState({searchItem: item});
            if (this.state.listofSearchItem.indexOf(item) === -1) {
                this.state.listofSearchItem.push(item);
            }
            const list = [];
            calendar.calendar.forEach(c => {
                c.matching_terms.forEach(d => d === item ? list.push(c) : 0)
            });
            contacts.contacts.forEach(c => {
                c.matching_terms.forEach(d => d === item ? list.push(c) : 0)
            });
            dropbox.dropbox.forEach(c => {
                c.matching_terms.forEach(d => d === item ? list.push(c) : 0)
            });
            slack.slack.forEach(c => {
                c.matching_terms.forEach(d => d === item ? list.push(c) : 0)
            });
            tweet.tweet.forEach(c => {
                c.matching_terms.forEach(d => d === item ? list.push(c) : 0)
            });
            console.log(list.length);
            if (list.length!== 0) {
                this.setState({list: list});
            } else {
                this.setState({errorMessage: "Sorry! We couldn't find any results matching " + "'" + item + "'",list:[]});
            }
        }

    }

    /*
     clears search results on tag removal
     */
    removeSelection(list) {
        if (list.indexOf(this.state.searchItem) < 0) {
            this.setState({searchItem: '', list: [], errorMessage: '', listofSearchItem: list});
        } else {
            this.setState({listofSearchItem: list});
        }
    }

/*
Clears searched content
 */
    clearContent() {
        this.setState({searchItem: '', list: [], errorMessage: ''});
    }

    render() {
        return (
            <div>
                <Header/>
                <div>
                    <Jumbotron className="jumbotron">
                        <div className="container">
                            <SearchBox searchItem={this.state.searchItem}
                                       handleClick={this.handleChange}
                                       clearContent={this.clearContent}/>
                        </div>
                    </Jumbotron>
                    <div className="container">
                        <Tagging searchItem={this.state.searchItem}
                                 listofSearchItem={this.state.listofSearchItem}
                                 removeSelection={this.removeSelection}
                                 viewAgain = {(item)=>this.handleChange(item)}
                        /></div>
                    {this.state.list.length !== 0 ?
                        <div className="container">
                            <List list={this.state.list}
                            /></div> :
                        <div>{this.state.errorMessage !== "" ?
                            <div className="container">
                                <FontAwesomeIcon icon={faExclamationCircle} size="1x"/>
                                {this.state.errorMessage}</div>
                            : <div></div>}
                        </div>}
                </div>
            </div>
        );
    }
}

export default Main;
