# Hack the North Frontend Challenge 2022

link to project [https://hackthenorth-22-challenge.netlify.app/](https://hackthenorth-22-challenge.netlify.app/)

## How to run it locally

In the project directory, you can run:

### `npm install` (and may need to run `yarn install`)
To install the required dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Login Info
Username: name
password: abc123

## Write Up

### Tools Used
* React: I'm a huge React fan and love how easy it makes to manage state
* Javascript
* HTML/SCSS: SCCS since it allows us to define constants and can help reduce redundancy when styling similar components

### Features
* Showing all events sorted by event start time
* Hiding private events with a login screen
* The user can view related events by clicking the link and the page will scroll to the related event
* Filtering events by type
* Searching for events
* Like events to view them separately

### Design Decisions and Development Process

#### Design Planning
I looked through the requirements and created an outline for how I'd like to display the events through figma. Here is my design page for reference, [https://www.figma.com/file/PQ0NkYpVmuUpmMZzkvLpq6/HTN'22-Application?node-id=0%3A1](https://www.figma.com/file/PQ0NkYpVmuUpmMZzkvLpq6/HTN'22-Application?node-id=0%3A1). In terms of the colours, I wanted it feel warm/welcoming so I used yellow and pink as the main colours and added other colours to make it more fun and playful. 

I want to show all the detail from the API but hide some of it so it wasn't overwhelming. Thus I used an accordian style where most of the information was hidden initially. Still, I decided not to display the speakers as the fact that some speakers had images while others didn't would lead to a somewhat inconsistent design and I didn't think this information was as valuable to hackers as other information that the API provided.

#### Development Process
I started developing by going through my Figma page and creating + designing the various components. When styling the event component I created a dummy event object to use as a model instead of the starting with the API, then I fetched data from the API to create the list of events. Then I focused on managing the state to handle login, filtering and searching. 
Things I'm proud of include the design, the state management using useReducer, and the fact that the site is fairly responsive.

This is more of a design problem but a problem that I encountered after starting to develop was that I had planned to link to related events by scolling to them, but after implementing the filtering features I noticed that sometimes the the linked event wouldn't be on the screen so we couldn't scroll to it. For this iteration, I solved this problem by showing scollable events as a link and others as just text. This is because initially when the page loads, all events are visible so they are all scrollable. But as a long term solution, if I had more time, I would open non-scrollable events in a modal or separate tab.


### Areas for Improvement
* I would add tracking for metrics such as:
  * how many users logged in vs were viewing just the public events
  * how many logged in users prefered accessing the youtube link or the hopin event
  * if users entered an event after filtering for it
  * popular search terms -> could give us ideas on what topics users are interested in

* Adding some kind of highlight or animation when the user scolls to a related event so they know which one to look at
* Storing login state and liked events in local storage
* allowing users to save their liked events to their personal calenders


