import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!!!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const tripTitles = [
  "European Quest",
  "Autumn Roadtrip",
  "Diving Adventure in Egypt",
  "City Break in Gdańsk",
];

const tripImages = [
  "https://imgur.com/kBhblVA.jpeg",
  "https://imgur.com/LEbNkdn.jpeg",
  "https://i.imgur.com/2k8WNSM.jpeg",
  "https://i.imgur.com/VIevFSY.jpeg",
];

const trips = [...Array(100).keys()].map((tripId) => {
  return {
    id: tripId,
    countries: [
      "Poland",
      "Norway",
      "Germany",
      "Austria",
      "Italy",
      "Switzerland",
      "France",
      "Spain",
    ],
    emissions: Math.floor(Math.random() * 1000),
    days: Math.floor(Math.random() * 30),
    title: tripTitles[Math.floor(Math.random() * 3)],
    imageUrl: tripImages[Math.floor(Math.random() * 3)],
    rating: Math.floor(Math.random() * 5),
  };
});

app.get("/trips", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const totalTrips = trips.length;
  const totalPages = totalTrips / limit;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTrips = trips.slice(startIndex, endIndex);

  if (!trips || page > totalPages) {
    return res.status(404).send("Trips found");
  } else {
    return res.json({
      page,
      limit,
      totalPages,
      totalTrips,
      trips: paginatedTrips,
    });
  }
});

// Server routing is not set up so while this endpoint will work when requesting data from it. It won't work on page refresh on that url
// In other words. Only client side routing is set up
app.get("/trips/:id", (req: Request, res: Response) => {
  const trip = trips.find((trip) => trip.id === parseInt(req.params.id));
  if (!trip) {
    return res.status(404).send("Trip not found");
  } else {
    return res.json(trip);
  }
});
