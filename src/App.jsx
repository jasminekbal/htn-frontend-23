import './App.scss';
import { useEffect, useReducer } from 'react';
import NavBar from "./sections/Navbar/Navbar.jsx"
import Landing from './sections/Landing/Landing.jsx';
import {reducer, ACTIONS} from "./utils.js"


function App() {
  const [state, dispatch] = useReducer(reducer, {isLoggedIn: false,
    filterOutTechTalk: false,
    filterOutActivity: false,
    filterOutWorkshop: false,
    allSortedEvents: [],
    eventsToDisplay: [],
    showingLikedEvents: false,
    showingAllEvents: true,
  })

  useEffect(() => {
    callApi()
    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function callApi () {
    const url = "https://api.hackthenorth.com/v3/events"
    const response = await fetch(url)
    const data = await response.json();

    if (!data.error) {

      var eventIdMap = {}

      var events = data.map( result => {
        const event = {
          id: result["id"],
          name: result["name"],
          type: result["event_type"],
          startTime: result["start_time"],
          endTime: result["end_time"],
          isPublic: result["permission"] === "public",
          youtubeLink: result["public_url"],
          hopinEvent: result["private_url"],
          description: result["description"],
          relatedEvents: result["related_events"],
          liked: false
        }
        eventIdMap[result["id"]] = {name: result["name"], isPublic: event.isPublic}
        return event
      })

      for (var i = 0; i< events.length; i++){
        if (events[i].relatedEvents) {
          var relatedEvents = []
          for (var j = 0; j<events[i].relatedEvents.length; j++){
            var relatedEventId = events[i].relatedEvents[j]
            relatedEvents.push({"id": relatedEventId,
            "name": eventIdMap[relatedEventId].name,
            "isPublic":eventIdMap[relatedEventId].isPublic})
          }
          events[i].relatedEvents = relatedEvents
        }
      }

      events.sort((a, b)=>{ return a.start_time - b.start_time})
      dispatch({type: ACTIONS.UPDATE_ALL_EVENTS, payload:{eventList: events}})
    }
  } 

  return (
    <div className="App">
      <NavBar isLoggedIn={state.isLoggedIn} dispatch={dispatch}/>
      <Landing state={state} dispatch={dispatch}/>
    </div>
  );
}

export default App;
