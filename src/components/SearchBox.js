import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

const INPUT_TIMEOUT = 250;
class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state={
            searchText: '',
            predictions: [],


        }

        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    handleClick(e){

            this.props.handleClick(this.state.searchText);
            this.setState({searchText:'',predictions: []});


    }
    getPredictions(value) {
      const  values = [
            'Bob',
            'Alice',
            'Acme',
            "dave",
            "carol"
        ];
        return values.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    handleOnChange(event){
        clearTimeout(this.timeout);
        const value = event.target.value;

        if (value.length > 0) {
            this.timeout = setTimeout(() => {
                const predictions = this.getPredictions(value);
                this.setState({
                    predictions
                });
            }, INPUT_TIMEOUT);
        } else {
            this.setState({
                predictions: []
            });
        }

        this.setState({searchText: event.target.value.trim().toLowerCase()});
        this.props.clearContent();
    }

    render() {

        return (
            <form onSubmit={e=>e.preventDefault()} className="form-inline col-lg-8 col-md-6 col-sm-12 p-0 ml-auto">
                <div className="md-form my-0">
                    <input
                        className=" textbox-css ml-sm-2"
                        value={this.state.searchText}
                        onChange={this.handleOnChange} type="text"/>
                        <input onClick={this.handleClick} className="btn btn-outline-white btn-md my-0 ml-sm-2"
                               type="button" value="Search"/>
                    <div>
                        {
                            this.state.predictions.map((item, index) => (
                                <div className="suggestions" key={index + item}><FontAwesomeIcon  icon={faSearch}  fixedWidth size="1x"/>{" "+item}</div>
                            ))
                        }
                    </div>
                </div>

            </form>
        );
    }
}
    export default SearchBox;