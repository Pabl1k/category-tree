import {useState} from "react";

const hasChildren = (state, id) => state.some((node) => node.parentId === id);

const App = () => {
  const [state, setState] = useState([]);

  const handleAddParent = () => {
    const parentsCount = state.filter((node) => !node.parentId).length;

    const newNode = {
      id: parentsCount + 1,
      parentId: null,
      label: "Parent",
    };

    setState([...state, newNode]);
  }

  const handleAddChildren = (id) => {
    const newNode = {
      id: Math.random().toFixed(5),
      parentId: id,
      label: "Lorem",
    };

    setState([...state, newNode]);
  };

  const displayChildren = (id) => {
    if (!hasChildren(state, id)) {
      return null;
    }

    const childrens = state.filter((node) => node.parentId === id);

    return childrens.map((node) => (
      <div key={node.id} style={{ display: "flex", flexDirection: "column", marginLeft: 20, borderLeft: "1px solid black" }}>
        <div key={node.id} style={{ display: "flex" }}>
          <div style={{ margin: 10 }}>
            - {node.label} {node.id}
          </div>
          <button onClick={() => handleAddChildren(node.id)}>+</button>
        </div>
        {displayChildren(node.id)}
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex"}}>
        <button style={{width: 100, marginBottom: 10}} onClick={handleAddParent}>Add parent+</button>
        {state.length > 0 && (
          <button style={{width: 100, marginBottom: 10, marginLeft: 10}} onClick={() => setState([])}>Reset state</button>
        )}
      </div>
      {state.map((node) => {
        if (node.label !== "Parent") {
          return null;
        }

        return (
          <div
            key={node.id}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ margin: 10 }}>
                - {node.label} {node.id}
              </div>
              <button onClick={() => handleAddChildren(node.id)}>+</button>
            </div>
            {displayChildren(node.id)}
          </div>
        );
      })}
    </div>
  );
};

export default App;
