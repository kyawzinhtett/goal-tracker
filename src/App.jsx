import { useState } from "react";

const initialGoals = [
  {
    id: 118836,
    goal: "🏆 Lose 20 lbs",
    tags: ["health", "fitness", "lifestyle"],
    deadline: "2023-09-15",
    isCompleted: true,
  },
  {
    id: 933372,
    goal: "👩‍💻 Learn TypeScript",
    tags: ["programming", "software"],
    deadline: "2023-09-25",
    isCompleted: false,
  },
  {
    id: 499476,
    goal: "💰 Find Remote Job",
    tags: ["work", "lifestyle"],
    deadline: "2023-10-20",
    isCompleted: false,
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
    setOpenAddGoal(false);
  };

  const handleCompleteGoal = (e, completeGoal) => {
    setGoals((goals) =>
      goals.map((goal) =>
        goal.id === completeGoal.id
          ? { ...goal, isCompleted: e.target.checked }
          : goal
      )
    );
  };

  return (
    <>
      <Navbar />
      <Main>
        <GoalLists goals={goals} onCompleteGoal={handleCompleteGoal} />
        <GoalForm>
          <Button onClick={handleOpenAddGoal}>
            {openAddGoal ? "Close" : "New Goal"}
          </Button>
          {openAddGoal && <AddGoalForm onAddGoal={handleAddGoal} />}
        </GoalForm>
      </Main>
    </>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar bg-warning">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GoalTracker
        </a>
      </div>
    </nav>
  );
};

const Main = ({ children }) => {
  return (
    <div className="container-fluid p-3">
      <div className="row">{children}</div>
    </div>
  );
};

const GoalLists = ({ goals, onCompleteGoal }) => {
  return (
    <div className="col-md-9">
      <div className="row">
        {goals.map((goal) => (
          <Goal key={goal.id} goal={goal} onCompleteGoal={onCompleteGoal} />
        ))}
      </div>
    </div>
  );
};

const Goal = ({ goal, onCompleteGoal }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div
        className={`card mb-3 ${goal.isCompleted ? "bg-warning" : "bg-light"}`}
      >
        <div className="card-body">
          <h5 className="card-title pb-2">{goal.goal}</h5>
          <div className="card-text">
            <p>{goal.deadline}</p>
            {goal.tags.map((tag, index) => (
              <small
                key={index}
                className={`${
                  goal.isCompleted ? "bg-light" : "bg-warning"
                } rounded px-1 me-1`}
              >
                {tag}
              </small>
            ))}
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                checked={goal.isCompleted}
                onChange={(e) => onCompleteGoal(e, goal)}
              />
              <label className="form-check-label" htmlFor="isCompleted">
                Mark as complete
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalForm = ({ children }) => {
  return <div className="col-md-3">{children}</div>;
};

const AddGoalForm = ({ onAddGoal }) => {
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
    const isCompleted = false;

    const newGoal = {
      id,
      goal,
      tags,
      deadline,
      isCompleted,
    };

    onAddGoal(newGoal);

    setGoal("");
    setTags([]);
    setDeadline("");
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

const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn-sm btn-warning" onClick={onClick}>
      {children}
    </button>
  );
};

export default App;
