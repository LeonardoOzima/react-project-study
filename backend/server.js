import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  users.push(req.body);
  res.status(201).send("User added successfully");
});

app.get("/users", async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name ? { contains: req.query.name } : undefined,
        age: req.query.age ? parseInt(req.query.age) : undefined,
        email: req.query.email ? { contains: req.query.email } : undefined,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  users.push(req.body);
  res.status(201).send("User added successfully");
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).send("User deleted successfully");
});

app.listen(3000);
