import React, {useEffect} from "react";
import "./Landing.scss";
import activity from "../../resources/images/activity.svg"
import techTalk from "../../resources/images/techtalk.svg"
import workshop from "../../resources/images/workshop.svg"
import Event from "../../components/Event/Event.jsx"
import { ACTIONS, EVENT_TYPES } from "../../utils";


const Landing = ({state, dispatch}) => {

    const getEventsList = () => {
        const eventsList = state.eventsToDisplay.map((event, index) => {
        const canShowEvent = state.isLoggedIn || event.isPublic
        return canShowEvent && <Event key={index} event={event} isLoggedIn={state.isLoggedIn} dispatch={dispatch}/> 
        })
        return eventsList
    }

    let likedEventsBtnClassName = state.showingLikedEvents ? "filled-pink-btn" : "empty-pink-btn"
    let allEventsBtnClassName = state.showingAllEvents ? "filled-pink-btn" : "empty-pink-btn"
    let techTalkClassName = state.filterOutTechTalk ? "landing-event-type landing-event-type-filtered" : "landing-event-type"
    let activityClassName = state.filterOutActivity ? "landing-event-type landing-event-type-filtered" : "landing-event-type"
    let workshopClassName = state.filterOutWorkshop ? "landing-event-type landing-event-type-filtered" : "landing-event-type"


    function showLikedEvents(){
        dispatch({type: ACTIONS.SHOW_LIKED_EVENTS})
        dispatch({type: ACTIONS.FILTER})
    }

    function filterEventType (eventType) {
        if (eventType == EVENT_TYPES.ACTIVITY) {
            dispatch({type: ACTIONS.TOGGLE_FILTER_ACTIVITY})
        } else if (eventType == EVENT_TYPES.TECH_TALK) {
            dispatch({type: ACTIONS.TOGGLE_FILTER_TECH_TALK})
        } else if (eventType == EVENT_TYPES.WORKSHOP) {
            dispatch({type: ACTIONS.TOGGLE_FILTER_WORKSHOP})
        }
        dispatch({type: ACTIONS.FILTER})
    }

    return (
        <div className="landing-wrapper"> 
            <h1>
                HACKATHON GLOBAL
            </h1>
            <h3>
                Connecting through Virtual Environments
            </h3>
            
            <input className="landing-search-bar" id="search-bar" onChange={()=> dispatch({type: ACTIONS.FILTER})} placeholder="Search Events"/>
            <div className="landing-event-btns">
                <div className={`${allEventsBtnClassName}`} onClick={()=> dispatch({type: ACTIONS.SHOW_ALL_EVENTS})}>
                    All Events
                </div>
                {state.isLoggedIn && <div className={`${likedEventsBtnClassName}`} onClick={()=> showLikedEvents()}>
                    Liked Events
                </div>}
            </div>

            <div className="landing-event-filters">
                <div className={`${techTalkClassName}`} onClick={()=> filterEventType(EVENT_TYPES.TECH_TALK)}>
                    <img src={techTalk}  className="landing-event-type-img"/>
                    Tech Talk
                </div>
                <div className={`${activityClassName}`} onClick={()=> filterEventType(EVENT_TYPES.ACTIVITY)}>
                    <img src={activity} className="landing-event-type-img"/>
                    Activity
                </div>
                <div className={`${workshopClassName}`} onClick={()=> filterEventType(EVENT_TYPES.WORKSHOP)}>
                    <img src={workshop}  className="landing-event-type-img"/>
                    Workshop
                </div>
            </div>

            <div className="landing-event-list-wrapper">
                {getEventsList()}
            </div>
            
        </div>
    )
}

export default Landing;