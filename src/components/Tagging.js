import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";

class Tagging extends Component {

    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    removeItem(item){
        console.log(item);
        const list = this.props.listofSearchItem;
        const index = this.props.listofSearchItem.indexOf(item);
        if (index !== -1) {
            list.splice(index, 1);
        }
        this.props.removeSelection(list);
    }

    handleSelection(item){
        this.props.viewAgain(item);
    }

    render() {
        const
            display = this.props.listofSearchItem.map(item => {
                return (
                    <span key={item}>
                    <button className="align-self-center cancel-button"
                            onDoubleClick={()=>this.handleSelection(item)}>
                        {item}
                    <FontAwesomeIcon className="removeSelection"
                                     onClick={()=>this.removeItem(item)} icon={faMinusCircle}
                                             size="1x"/>
                    </button>
                    </span>
                )
            })
        return (
            <div>
                {display}
            </div>)

    }
}
export default Tagging;