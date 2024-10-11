import React, { useEffect, useState } from "react";
// import Navbar from "./navbar";

const Form = () => {
  const [input, setInput] = useState({});
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const LastItemOfIndex = currentPage * itemsPerPage;
  const FirstItemOfIndex = LastItemOfIndex - itemsPerPage;
  const currentItems = list.slice(FirstItemOfIndex, LastItemOfIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  function handleInput(e) {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    setList(data);
  }, []);

  function handleSubmition(e) {
    e.preventDefault();

    let newList = [...list, input];
    setList(newList);
    localStorage.setItem("data", JSON.stringify(newList));
    setInput({});
  }

  // Delete Data
  function deleteData(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    localStorage.setItem("data", JSON.stringify(newList));
  }

  return (
    <>
      {/* <Navbar/> */}

      <div className="row border p-3 border-dark-subtle">
        <h2 className="text-success">Registration Form</h2>
        <form method="post" className="w-100" onSubmit={handleSubmition}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold fs-5">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name || ""}
              onChange={handleInput}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold fs-5">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={input.email || ""}
              onChange={handleInput}
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold fs-5">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={input.password || ""}
              onChange={handleInput}
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-bold fs-5">
              Message
            </label>
            <textarea
              className="form-control"
              name="message"
              value={input.message || ""}
              onChange={handleInput}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>

      {/* user data  */}

      <form className="mt-3 p-2">
        <input type="text" className="w-100 shadow-sm p-2 " placeholder="Search User" onChange={(e) => setSearch(e.target.value)} />
      </form>

      <table className="table table-striped table-bordered mt-5">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems
              .filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item.name.toLocaleLowerCase().includes(search);
              })
              .map((val, i) => (
                <tr key={i}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.password}</td>
                  <td>{val.message}</td>
                  <td>
                    <button
                      onClick={() => deleteData(i)}
                      className="btn btn-danger my-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No data available
              </td>
            </tr>
          )}
          <tr key="" className="text-center">
            <td>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage == index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Form;
