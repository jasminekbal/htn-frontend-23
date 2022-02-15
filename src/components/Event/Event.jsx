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
import { ACTIONS, EVENT_TYPES, formatDateTime } from "../../utils";

const Event = ({event, isLoggedIn, eventsDisplayed, dispatch}) => {
    var [showMoreInfo, setShowMoreInfo] = useState(false);

    // function to create the list of related events
    const getRelatedEvents = () => {
        const relatedEvents = event.relatedEvents.map((event, index) => {
            // if the user isn't logged in we don't want them to see private events in related events either
            const canShowEvent = isLoggedIn || event.isPublic

            //Don't show a clickable link if one can't scroll to that event
            const canScrollToEvent = eventsDisplayed.filter(e => {
                return (
                  e.name === event.name
                );
              }).length > 0

          const eventName = canScrollToEvent ?
            <Link className="event-related-event-item event-related-event-item-link" to={`${event.id}`} spy={true}
            smooth={true}
            duration={1000} offset={-100} key={index}>
                {event["name"]}
            </Link> : <p className="event-related-event-item"> {event["name"]} </p>
          
          return canShowEvent && eventName 
        })
        return relatedEvents
    }

    const getEventImage = () => {
        switch (event.type){
            case EVENT_TYPES.ACTIVITY:
                return activity
            case EVENT_TYPES.WORKSHOP:
                return workshop
            case EVENT_TYPES.TECH_TALK:
                return techTalk
            default:
                return 
        } 
    }

    const getHeartImage = () => {
        if (event.liked) {
            return heartFull
        } else {
            return heartEmpty
        }
    }

    const toggleLike = () => {
        dispatch({type: ACTIONS.TOGGLE_LIKED, payload:{id: event.id}})
        dispatch({type: ACTIONS.FILTER})
    }

    let relatedEventsLength = getRelatedEvents().length

    return (
        <div className="event-wrapper" id={`${event.id}`}>

            <div className="event-header-info-wrapper">
                <div className="event-name-icon-wrapper">
                    <img src={getEventImage()} alt="" className="event-type-icon"/>
                    <div className="event-name-date-wrapper">
                        <h4 className="event-name">{event.name}</h4>
                        <p className="event-date-time">{formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}</p>
                    </div>
                </div>
            
                {isLoggedIn && <img onClick={() => toggleLike() } src={getHeartImage()} alt="" className="event-heart"/>}
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

                {relatedEventsLength > 0 && <div>
                    <div className="event-related-events-title">
                    More Like This:
                </div>
                {getRelatedEvents()}</div>}
            </div>}
            
        </div>
    )
}

export default Event;