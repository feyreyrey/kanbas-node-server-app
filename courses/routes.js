import Database from "../Databases/index.js";
function CourseRoutes(app) {
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params; // Extract the id from request parameters
    const course = Database.courses.find(c => c._id === id); // Find the course
  
    if (course) {
      res.send(course); // Send the found course
    } else {
      res.status(404).send('Course not found'); // Send a 404 response if the course is not found
    }
  });
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id !== id);
    res.sendStatus(204);
  });
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

}
export default CourseRoutes;

