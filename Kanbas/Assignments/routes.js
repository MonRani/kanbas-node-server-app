import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.status(201).json(newAssignment);
  });

  // Retrieve all assignments for a specific course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter(a => a.course === cid);
    res.json(assignments);
  });

  // Update an assignment by ID
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(a => a._id === aid);
    if (assignmentIndex === -1) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter(a => a._id !== aid);
    res.sendStatus(200);
  });
}
