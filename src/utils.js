// constants for actions and event types
export const ACTIONS = {
    UPDATE_ALL_EVENTS : "updateAllEvents",
    LOGIN: "login",
    LOGOUT: "logout",
    TOGGLE_FILTER_TECH_TALK: "filterTechTalk",
    TOGGLE_FILTER_ACTIVITY: "filterActivity",
    TOGGLE_FILTER_WORKSHOP: "filterWorkshop",
    SHOW_LIKED_EVENTS: "likedEvents",
    FILTER: "filter",
    SHOW_ALL_EVENTS: "allEvents",
    TOGGLE_LIKED: "toggleLiked"
  }
  
  export const EVENT_TYPES = {
    ACTIVITY: "activity",
    TECH_TALK: "tech_talk",
    WORKSHOP: "workshop"
  }
  

  // functions to help filter events in various ways
  function didPassEventTypeFilters(state, event) {
    switch (event.type){
      case EVENT_TYPES.ACTIVITY:
          return !state.filterOutActivity
      case EVENT_TYPES.WORKSHOP:
          return !state.filterOutWorkshop
      case EVENT_TYPES.TECH_TALK:
          return !state.filterOutTechTalk
      default:
        return true
    } 
  }
  
  function filterEvents (state) {
    let searchString = document.getElementById("search-bar").value.toLowerCase()
    return state.allSortedEvents.filter(event => {
      return (
        event.name.toLowerCase().includes(searchString) && didPassEventTypeFilters(state, event) && (!state.showingLikedEvents || event.liked)
      );
    });
  }
  
   function areShowingAllEvents (state) {
    return !state.filterOutWorkshop && !state.filterOutActivity && !state.filterOutTechTalk && !state.showingLikedEvents
  }
  
  // to toggle the liked state on a given event
  function toggleLike (allEvents, eventId) {
    return allEvents.map(event => { 
      if (event.id === eventId) {
        return {...event, liked: !event.liked}
      }
      return event
    })
  }
  
  // reducer function to help handle various state changes
  export function reducer(state, action) {
    switch (action.type){
      case ACTIONS.UPDATE_ALL_EVENTS:
        return {...state, allSortedEvents: action.payload.eventList, eventsToDisplay: action.payload.eventList}
      case ACTIONS.LOGIN:
        return {...state, isLoggedIn: true}
      case ACTIONS.LOGOUT:
        return {...state, isLoggedIn:false}
      case ACTIONS.TOGGLE_FILTER_ACTIVITY:
        return {...state, filterOutActivity: !state.filterOutActivity}
      case ACTIONS.TOGGLE_FILTER_TECH_TALK:
        return {...state, filterOutTechTalk: !state.filterOutTechTalk}
      case ACTIONS.TOGGLE_FILTER_WORKSHOP:
        return {...state, filterOutWorkshop: !state.filterOutWorkshop}
      case ACTIONS.SHOW_LIKED_EVENTS:
        return {...state, showingLikedEvents: !state.showingLikedEvents, showingAllEvents: false}
      case ACTIONS.FILTER:
        return {...state, eventsToDisplay: filterEvents(state), showingAllEvents: areShowingAllEvents(state)}
      case ACTIONS.SHOW_ALL_EVENTS:
        return {...state, eventsToDisplay: state.allSortedEvents, showingAllEvents: true,
           showingLikedEvents: false, filterOutActivity: false,
            filterOutTechTalk:false, filterOutWorkshop: false}
      case ACTIONS.TOGGLE_LIKED:
        return {...state, allSortedEvents: toggleLike(state.allSortedEvents, action.payload.id), eventsToDisplay:toggleLike(state.eventsToDisplay, action.payload.id)}
      default:
        return state
    } 
  }
  