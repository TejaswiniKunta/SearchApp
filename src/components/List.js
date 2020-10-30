import React from "react";
import {ListGroup, ListGroupItem, Media} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faSlack} from "@fortawesome/free-brands-svg-icons/faSlack";
import {faDropbox} from "@fortawesome/free-brands-svg-icons/faDropbox";

import moment from "moment";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
function List({list}) {
    const displayContent = list.map(l => {

        switch (l.type) {
            case "calendar":
                return <div key={l.id}><Calendar calendar={l}/></div>

            case "contacts":
                return <div key={l.id}><Contacts contacts={l}/></div>

            case "slack":
                return <div key={l.id}><Slack slack={l}/></div>

            case "dropbox":
                return <div key={l.id}><DropBox dropbox={l}/></div>

            case "tweet":
                return <div key={l.id}><Tweet tweet={l}/></div>
            default:
                break;
        }
    })

    return(<ListGroup className="list-css">{displayContent}</ListGroup>);
}

const Calendar = ({calendar})=>{
    return( <ListGroupItem className="list-group-item list-group-item-action">
        <Media>
            <Media body>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-3"/>{moment(calendar.date).fromNow()}</Media>
            <Media body className="mt-0 mb-1"><label>Title:</label>{calendar.title}</Media>
            <Media body className="mt-0 mb-1"><label>Invitees:</label>{calendar.invitees}</Media>
        </Media>
    </ListGroupItem>)
}

const Contacts=({contacts})=>{

    const emails = contacts.emails.map(e=>{
        return(
            <span key={e}>{e}|</span>
        );
    })

    const phones = contacts.phones.map(e=>{
        return(
            <span key={e}> {e} |</span>
        );
    })

    return( <ListGroupItem className="list-group-item list-group-item-action">
        <Media>
            <Media body><FontAwesomeIcon icon={Icons.faAddressBook} className="mr-3"/>
                {moment(contacts.last_contact).fromNow()}
            </Media>
            <Media body className="mt-0 mb-1"><label>Name:</label>{contacts.name}
                <Media body className="mt-0 mb-1"><label>Company:</label>{contacts.company}</Media></Media>
            <Media body className="mt-0 mb-1"><label>Phone:</label>{phones}
                <Media body><label>Email:</label>{emails}</Media>
            </Media>
        </Media>
    </ListGroupItem>)

}

const DropBox=({dropbox})=>{
    const shared = dropbox.shared_with.map(s=>{
        return(<span>{s}|</span>);
    })
    return( <ListGroupItem className="list-group-item list-group-item-action">
        <Media>
            <Media body>
                <FontAwesomeIcon icon={faDropbox} className="mr-3"/>{moment(dropbox.created).fromNow()}</Media>
            <Media body className="mt-0 mb-1"><label>Title:</label>{dropbox.title}</Media>
            <Media body className="mt-0 mb-1"><label>Path:</label>{dropbox.path}
                <Media body className="mt-0 mb-1"><label>Shared With:</label>{shared}</Media></Media>
        </Media>
    </ListGroupItem>)
}

const Slack=({slack})=>{
    return( <ListGroupItem className="list-group-item list-group-item-action">
        <Media>
            <Media body>
                <FontAwesomeIcon icon={faSlack} className="mr-3"/>{moment(slack.timestamp).fromNow()}</Media>
            <Media body className="mt-0 mb-1"><label>Channel:</label>{slack.channel}</Media>
            <Media body className="mt-0 mb-1"><label>Author:</label>{slack.author}
                <Media body className="mt-0 mb-1"><label>Message:</label>{slack.message}</Media></Media>
        </Media>
    </ListGroupItem>)

}

const Tweet=({tweet})=>{

    return( <ListGroupItem className="list-group-item list-group-item-action">
        <Media>
            <Media body>
                <FontAwesomeIcon icon={faTwitter} className="mr-3"/>{moment(tweet.timestamp).fromNow()}</Media>
            <Media body className="mt-0 mb-1"><label>User:</label>{tweet.user}</Media>
            <Media body className="mt-0 mb-1"><label>Message:</label>{tweet.message}
            </Media>
        </Media>
    </ListGroupItem>)

}

export default List;