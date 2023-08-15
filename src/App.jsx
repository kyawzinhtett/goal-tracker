import { useState } from "react";

const initialGoals = [
  {
    id: 118836,
    goal: "🏆 Lose 20 lbs",
    tags: ["health", "fitness", "lifestyle"],
    deadline: "2023-09-15",
  },
  {
    id: 933372,
    goal: "👩‍💻 Learn TypeScript",
    tags: ["programming", "software"],
    deadline: "2023-09-25",
  },
  {
    id: 499476,
    goal: "💰 Find Remote Job",
    tags: ["work", "lifestyle"],
    deadline: "2023-10-20",
  },
];

const App = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const handleOpenAddGoal = () => {
    setOpenAddGoal((prev) => !prev);
  };

  const handleAddGoal = (newGoal) => {
    setGoals((goals) => [...goals, newGoal]);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-9">
            <List goals={goals} />
          </div>
          <div className="col-md-3">
            <Button onClick={handleOpenAddGoal}>
              {openAddGoal ? "Close" : "New Goal"}
            </Button>
            {openAddGoal && (
              <AddGoalForm
                onAddGoal={handleAddGoal}
                onOpenAddGoal={setOpenAddGoal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn-sm btn-warning" onClick={onClick}>
      {children}
    </button>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GoalTracker
        </a>
      </div>
    </nav>
  );
};

const List = ({ goals }) => {
  return (
    <div className="row">
      {goals.map((goal) => (
        <Goal
          key={goal.id}
          goal={goal.goal}
          tags={goal.tags}
          deadline={goal.deadline}
        />
      ))}
    </div>
  );
};

const Goal = ({ goal, tags, deadline }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card bg-light mb-3">
        <div className="card-body">
          <h5 className="card-title pb-2">{goal}</h5>
          <div className="card-text">
            <p>{deadline}</p>
            {tags.map((tag, index) => (
              <small key={index} className="bg-info rounded px-1 me-1">
                {tag}
              </small>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddGoalForm = ({ onAddGoal, onOpenAddGoal }) => {
  const [goal, setGoal] = useState("");
  const [tags, setTags] = useState([]);
  const [deadline, setDeadline] = useState("");

  const handleTags = (e) => {
    const inputTags = e.target.value;
    const tagArray = inputTags.split(",").map((tag) => tag.trim());

    setTags(tagArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!goal || !tags || !deadline) return;

    const id = crypto.randomUUID();

    const newGoal = {
      id,
      goal,
      tags,
      deadline,
    };

    onAddGoal(newGoal);

    setGoal("");
    setTags([]);
    setDeadline("");
    onOpenAddGoal(false);
  };

  return (
    <form className="bg-light rounded mt-3 p-4" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="goal">Goal</label>
        <input
          className="form-control"
          type="text"
          name="goal"
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="tags">Tags</label>
        <input
          className="form-control"
          type="text"
          name="tags"
          placeholder="health, fitness, lifestyle"
          value={tags}
          onChange={handleTags}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="deadline">Deadline</label>
        <input
          className="form-control"
          type="date"
          name="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <Button>Add Goal</Button>
    </form>
  );
};

export default App;
