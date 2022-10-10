## Running the project
To run the project use the following command:

 `docker-compose up -d`

Sometimes the server will fail when running this as the database hasn't been setup in time, just run the script for a second time if this happens.

## Design overview

### Server

Fastify has been chosen as my framework of choice as its extremely modular and quick to build rest API's. It also has great compatibility with Prisma which is my choice of ORM.

The server has four endpoints:

- `GET /new-jobs`
- `GET /accepted-jobs`
- `PUT /accept/{jobId}`
- `PUT /decline/{jobId}`

##### To be improved
- More unit tests
- The addition of integration tests
- Pagination for when the fetching of data grows more than 6 entries
- Caching
- Restrict CORS to only known servers
- Add health endpoint

Just to note that this application will not scale. In an ideal world, this application would be pulling in events from a kinesis stream and use the CQRS pattern.

### UI

- My recent experience on front-end development has been very Vue.js heavy so this was a slight learning curve for me using React after a few years.
- I have built a basic UI which follows a basic react component pattern, this does the job for the front-end requirements. Due to time constraints I was not able to add tests for this or fix a bug on the decline button.
##### To be improved

- Error handling
- Add unit and integration tests
- Use of typescript
- Remove hardcoded base url
- Fix decline button bug