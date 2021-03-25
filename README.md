# ideahunt

Create an idea list where you can share ideas with your friends.

## Steps to run locally

Client

```bash
cd client
expo start --web
```

API + DB:

```bash
docker-compose up
```

## Deploying

Expo App

`NODE_ENV=production BACKEND_URL=drizzle-ideahunt.herokuapp.com expo publish`
