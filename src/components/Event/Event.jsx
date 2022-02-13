import React, {useState} from "react";
import "./Event.scss";
import activity from "../../resources/images/activity.svg"
import techTalk from "../../resources/images/techtalk.svg"
import workshop from "../../resources/images/workshop.svg"
import heartFull from "../../resources/images/heartFull.svg"
import heartEmpty from "../../resources/images/heartEmpty.svg"
import youtube from "../../resources/images/youtube.svg"
import calender from "../../resources/images/calender.svg"
import {Link} from 'react-scroll'
import { ACTIONS, EVENT_TYPES } from "../../utils";



function formatDateTime(unixTimeStamp){
    const dateObject = new Date(unixTimeStamp)
    return dateObject.toLocaleString()
}

const Event = ({event, isLoggedIn, dispatch}) => {
    var [showMoreInfo, setShowMoreInfo] = useState(false);

    const getRelatedEvents = () => {
        const relatedEvents = event.relatedEvents.map((event, index) => {
            const canShowEventName = isLoggedIn || event.isPublic
          const eventName = (
            <Link className="event-related-event-item" to={`${event.id}`} spy={true}
            smooth={true}
            duration={1000} offset={-100} key={index}>
                {event["name"]}
            </Link>
          )
          return canShowEventName && eventName 
        })
        return relatedEvents
    }

    const getEventImage = () => {
        switch (event.type){
            case EVENT_TYPES.ACTIVITY:
                return <img src={activity} alt="" className="event-type-icon"/>
            case EVENT_TYPES.WORKSHOP:
                return <img src={workshop}alt="" className="event-type-icon"/>
            case EVENT_TYPES.TECH_TALK:
                return <img src={techTalk} alt="" className="event-type-icon"/>
            default:
                return <></>
        } 
    }

    return (
        <div className="event-wrapper" id={`${event.id}`}>

            <div className="event-header-info-wrapper">
                <div className="event-name-icon-wrapper">
                    {getEventImage()}

                    <div className="event-name-date-wrapper">
                        <h4 className="event-name">{event.name}</h4>
                        <p className="event-date-time">{formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}</p>
                    </div>
                </div>
            
                {event.liked && isLoggedIn ? <img onClick={() => dispatch({type: ACTIONS.TOGGLE_LIKED, payload:{id: event.id}}) } src={heartFull} alt="" className="event-heart"/>:
                isLoggedIn && <img src={heartEmpty} alt="" onClick={() => dispatch({type: ACTIONS.TOGGLE_LIKED, payload:{id: event.id}}) } className="event-heart"/>}
            </div>

            <div className="event-links">
                
               { event.isPublic && <a target="_blank" rel="noreferrer" className="event-link" href={`${event.youtubeLink}`}>
                    <img src={youtube} alt="" className="event-link-image"/>
                    Youtube Link
                </a>}

                { isLoggedIn && <a className="event-link" target="_blank" rel="noreferrer" href={`${event.hopinEvent}`}>
                    <img src={calender} alt="" className="event-link-image"/>
                    Hopin Event
                </a>}

                <div className="event-link" onClick={e=> setShowMoreInfo(!showMoreInfo)}>
                    {showMoreInfo ? "- Less Info" : "+ More Info"}
                </div>
            </div>

            {showMoreInfo && 
            <div className="event-more-info-wrapper">
                <div className="event-description">{event["description"]}
                </div>

                {event.relatedEvents.length > 0 && <div>
                    <div className="event-related-events-title">
                    More Like This:
                </div>
                {getRelatedEvents()}</div>}
            </div>}

            
            
        </div>
    )
}

export default Event;