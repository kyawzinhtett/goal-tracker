const initialGoals = [
  {
    id: 118836,
    goal: "🏆 Lose 20 lbs",
    tags: ["health", "fitness", "lifestyle"],
  },
  {
    id: 933372,
    goal: "👩‍💻 Learn TypeScript",
    tags: ["programming", "software"],
  },
  {
    id: 499476,
    goal: "💰 Find Remote Job",
    tags: ["work", "lifestyle"],
  },
];

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-9">
            <List />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
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

const List = () => {
  const goalLists = initialGoals;
  return (
    <div className="row">
      {goalLists.map((goalList) => (
        <Goal key={goalList.id} goal={goalList.goal} tags={goalList.tags} />
      ))}
    </div>
  );
};

const Goal = ({ goal, tags }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title pb-2">{goal}</h5>
          <div className="card-text">
            {tags.map((tag, index) => (
              <small key={index} className="bg-warning rounded me-1">
                {tag}
              </small>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
