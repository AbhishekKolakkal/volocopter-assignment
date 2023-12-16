# Volocopter Code Challenge

Our intent with this repo is to save you time when doing our code challenge. Here, you'll find a complete setup with front end and back end.

## IMPORTANT

1. Usage of this repository's code is **not** at all mandatory for the completion of our code challenge.
2. **If you decide to use this repo** for your code challenge's response, feel free to change **anything** you want in it. Make it your own!

## Run the app locally

### Pre-requisites

In order to run this repo locally, you will need to have the following dependencies installed:

- Docker
- Python (v3.12)
- Node

### Setup

First, make sure that the port for the `proxy` service (port `8080`) is free in case you already have other Docker containers running. You can also update it in [`docker-compose.yml`](./docker-compose.yml), if you prefer.

Once the app is running, you should see it in [`http://localhost:8080`](http://localhost:8080).

In order to run the repo there are a few options:

#### Open a terminal at the root directory of the repo and execute

        ./go run

\* Our 'go' file is just a zsh script which runs `docker compose`.

alternatively, you can directly use:

        docker compose up -d

#### Run server and client separately

- Server

    In the terminal, navigate to the `/server` directory, and run:

          uvicorn src.main:app --host YOUR_HOST --port YOUR_PORT --reload

- Client

    In the terminal, navigate to the `/client` directory, and run:

          yarn dev

#### Last considerations

We recommend using a Python virtual environment and using VSCode as your IDE for a better development experience.

### UI Designs

For convenience, the designs from the challenge are also here in this repo, at the [`ui-designs`](./ui-designs/) folder.


### Thinking Out Loud

* I need to be able to control and oversee the status of all missions on a given day.


The user expects to be able to:
1. View all the Flight Missions in each state on the same page
The states are: Pre-Flight, In-Flight, and Post-Flight.
2. Insert Flight Missions on the board;
3. Move the Flight Missions from one state to the next;
4. Delete Flight Missions;

**This totally means they wanted a JIRA Kanban Board like thing that can move the flight mission, Insert flight Mission, and Delete Flight Mission**


**I can pretty much use a NOSQL DB for now that there is not much of thing is to be done but will make pros and cons of database once I come up with the whole class diagram**


**I would be focussing on these points**
• Creating clean, readable and extensible code - This can be achieved by showing we can add ore feature
• Testing your code properly - Using test cases
• Using Git with proper commits

**Please make sure that testing is very important thing to be done**



