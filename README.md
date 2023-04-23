## How to run the project

- From your project directory, type `docker compose up` to build the app with the updated Compose file, and run it.
- list the Docker containers, we can use the `docker ps` or `docker container ls` command
- attach the container to the shell
  `docker exec -it <container id> sh`
- go to project's directory `cd guess-the-number`
- run `npm install`
- run `npm run dev`
- the project will be available at: http://localhost:3000
