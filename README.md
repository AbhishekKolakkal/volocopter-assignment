### Brief Description About the App
The App is made with following Tech Stack
1. Front-end -> React With TypeScript
2. Back-end -> FastAPI (Python)
3. Database -> SQLite3
4. Back-end Testing -> Pytest
5. Containerization -> Docker

### Installation

Clone the repository.

**Please Note:** The whole App runs on ==docker compose==, so you will need to install it manually first 

Once docker compose is installed, use these commands to run the client as well as the server

`docker compose build`

`docker compose up` or `docker compose up -d` to run in detached mode

Now in your browser you can go to `http://localhost:3000` which will render the front-end. 
you can also paste this url to see even the back-end is running `http://localhost:9000/api/v1`. Once you pasted this url you should see a json like this 
```
{
"detail": "App is running"
}
```
which means the back-end is also running.

### Functionalities of back-end done by FastAPI

- As I have used FastAPI to build this app, the documentation of the API is also available by going to this url `http://localhost:9000/docs`. This will render all the API endpoints the App is using.
- As you can see from visiting this url we actually have 2 main endpoints 
    1. `api/v1/missions` (CRUD Operation)
    2. `api/v1/mission_state` (CRD Operation)
- In this app as to show the ==scalable functionality== I also made another endpoint called mission_state. **(Not integrated with the front-end and)** It can only be accessed using `http://localhost:9000/docs` or hitting the API Manually

**Endpoint: "/api/v1/mission_state"** can be used to create New Mission State or even the Old mission State. As soon as new Mission State is saved in the DB, it will reflect as a column in the front-end. For Example: Right now the app contains 3 state 1. Pre Flight 2. In Flight 3. Post Flight. But using this API we can add another column of Mission State and it will reflect on the Front-end

**Important Note: If the pre-flight, in-flight and post-flight is not visible then please use this API to create these. Writing the values over here, so that you can easily create.**

> For pre-flight: Use the api/v1/mission_state API in the docs with these values. Please click on Try it Out button to use the values
```
{
  "state_name": "pre-flight",
  "display_name": "Pre Flight"
}
```

> For in-flight: Use the api/v1/mission_state API in the docs with these values. Please click on Try it Out button to use the values
```
{
  "state_name": "in-flight",
  "display_name": "In Flight"
}
```

> For post-flight: Use the api/v1/mission_state API in the docs with these values. Please click on Try it Out button to use the values
```
{
  "state_name": "post-flight",
  "display_name": "Post Flight"
}
```

### Functionalities of Front-end done by React

All features mentioned in the PDF is added with the UI/UX also. Just that the Color choices you may not like :P

- Features such Add Mission, Move Mission and Delete Mission is added
- For Flash message we have used react-tostify
- Also we have used react-bootstrap for css and modal and buttons


### About Database

- We are using SQLite3 as database.
- A file named flights.db will be stores in the server directory
- We have 2 table
    1. missions
    2. mission_state

### About Testing
- There is a small testing file in the `server/src/` directory called main `test_main.py` 
- This python file has small testing snippets for missions api which covers the testing of GET,POST,PUT,DELETE.

To run the pytest you will need to exec inside the server docker container

`docker ps`

use the server container name and use `docker exec {server_container_name} -it /bin/bash`

after this run

`pytest server/src test_main.py`