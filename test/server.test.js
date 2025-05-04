const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

// tap.test("POST /tasks", async (t) => {
//   const newTask = {
//     title: "New Task",
//     description: "New Task Description",
//     completed: false,
//   };
//   const response = await server.post("/tasks").send(newTask);
//   t.equal(response.status, 201);
//   t.end();
// });

// tap.test("POST /tasks with invalid data", async (t) => {
//   const newTask = {
//     title: "New Task",
//   };
//   const response = await server.post("/tasks").send(newTask);
//   t.equal(response.status, 400);
//   t.end();
// });

tap.test("GET /tasks", async (t) => {
  const response = await server.get("/api/v1/tasks");
  t.equal(response.status, 200);
  t.hasOwnProp(response.body.data[0], "id");
  t.hasOwnProp(response.body.data[0], "title");
  t.hasOwnProp(response.body.data[0], "description");
  t.hasOwnProp(response.body.data[0], "completed");
  t.type(response.body.data[0].id, "number");
  t.type(response.body.data[0].title, "string");
  t.type(response.body.data[0].description, "string");
  t.type(response.body.data[0].completed, "boolean");
  t.end();
});

tap.test("GET /tasks/:id", async (t) => {
  const response = await server.get("/api/v1/tasks/1");
  t.equal(response.status, 200);
  const expectedTask = {
    id: 1,
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    // createdAt: "2025-04-18T13:05:06.313Z",
    // priority: "medium",
  };
  t.match(response.body.data, expectedTask);
  t.end();
});

tap.test("GET /tasks/:id with invalid id", async (t) => {
  const response = await server.get("/tasks/999");
  t.equal(response.status, 404);
  t.end();
});

tap.test("PUT /tasks/:id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
  };
  const response = await server.put("/api/v1/tasks/1").send(updatedTask);
  t.equal(response.status, 200);
  t.end();
});

tap.test("PUT /tasks/:id with invalid id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
  };
  const response = await server.put("/api/v1/tasks/999").send(updatedTask);
  t.equal(response.statusCode, 404);
  t.end();
});

tap.test("PUT /tasks/:id with invalid data", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: "true",
  };
  const response = await server.put("/api/v1/tasks/1").send(updatedTask);
  t.equal(response.status, 400);
  t.end();
});

// tap.test("DELETE /tasks/:id", async (t) => {
//   const response = await server.delete("/api/v1/tasks/18");
//   t.equal(response.status, 200);
//   t.end();
// });

// tap.test("DELETE /tasks/:id with invalid id", async (t) => {
//   const response = await server.delete("/api/v1/tasks/999");
//   console.log("<=====>", response.statusCode, response.body);
//   t.equal(response.status, 404);
//   t.end();
// });

tap.teardown(() => {
  process.exit(0);
});
