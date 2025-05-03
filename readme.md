# API Discription

This api is for managing tasks and various api are made for task

# Set up instruction

1. npm install
2. npm run dev
3. npm run test

# Document for each API

1. GET - /api/v1/tasks?completed=true - used to take all task
2. GET - /api/v1/tasks/:id - used to get a single task
3. POST - /api/v1/tasks - used to created task
   BODY -
   title: "Set up environment-new",
   description: "Install Node.js, npm, and git-new",
   completed: true
   priority: medium

4. PUT - /api/v1/tasks/:id - used to updated task
   BODY -
   title: "Set up environment-new",
   description: "Install Node.js, npm, and git-new",
   completed: true
   priority: medium

5. DELETE - /api/v1/tasks/:id - used to delete task

6. GET - /api/v1/tasks/priority/:level - used to get task on the basis of level
