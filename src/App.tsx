import { useEffect, useState, FormEvent } from "react";
import "./App.css";

interface InputData {
  name: string;
  email: string;
  age: string;
}

interface DataItem {
  id: string;
  datas: InputData;
}

const getData = (): DataItem[] => {
  const data = localStorage.getItem("store-ts");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const App: React.FC = () => {
  const [inputdata, setInputData] = useState<InputData>({
    name: "",
    email: "",
    age: "",
  });

  const [allData, setAllData] = useState<DataItem[]>(getData());

  const [storeId, setStoreId] = useState<string | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toggle) {
      let UpdateItem = allData.map((ele) => {
        if (ele.id === storeId) {
          return { ...ele, datas: inputdata };
        }
        return ele;
      });
      setAllData(UpdateItem);
      setStoreId(null);
      setToggle(false);
    } else {
      const withId = { id: Math.random().toString(), datas: inputdata };
      setAllData([...allData, withId]);
    }
    setInputData({ name: "", email: "", age: "" });
  };

  const handleDelete = (id: string) => {
    setAllData(allData.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    const newEditItem = allData.find((ele) => {
      return ele.id === id;
    });

    if (newEditItem) {
      setInputData(newEditItem.datas);
      setStoreId(id);
      setToggle(true);
    }
  };

  const allDelete = () => {
    setAllData([]);
  };

  useEffect(() => {
    localStorage.setItem("store-ts", JSON.stringify(allData));
  }, [allData]);


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="input-field"
            name="name"
            value={inputdata.name}
            onChange={handleChange}
            placeholder="Enter your Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="input-field"
            name="email"
            value={inputdata.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Age:</label>
          <input
            id="age"
            className="input-field"
            name="age"
            value={inputdata.age}
            onChange={handleChange}
            placeholder="Enter your Age"
          />
        </div>

        <button type="submit" className="add-button">
          {toggle ? "Update" : "Add"}
        </button>
      </form>
      {allData.length > 1 && (
        <button onClick={allDelete} style={{ marginTop: "10px" }}>
          All Delete
        </button>
      )}

      {allData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item) => (
              <tr key={item.id}>
                <td>{item.datas?.name}</td>
                <td>{item.datas?.email}</td>
                <td>{item.datas?.age}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  &nbsp;
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="found">Data Not found !</span>
      )}
    </div>
  );
};

export default App;





