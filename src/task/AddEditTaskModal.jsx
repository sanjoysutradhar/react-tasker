import { useState } from "react";

export default function AddEditTaskModal({
  onSave,
  taskToUpdate,
  onCloseClick,
}) {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );

  const [isAdd, setIsAdd] = useState(!taskToUpdate);
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!task.title.trim()) errors.title = "Title is required.";
    if (!task.description.trim())
      errors.description = "Description is required.";
    if (!task.priority) errors.priority = "Priority is required.";
    if (!task.tags.length) errors.tags = "At least one tag is required.";
    return errors;
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;

    if (name === "tags") {
      value = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean); // Split and clean tags
    }

    setTask({
      ...task,
      [name]: value,
    });
    // Clear validation error for the field
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    onSave(task, isAdd);
  };

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0 "></div>
      <form
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] 
      bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute  top-1/4 lg:left-1/4"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              required
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm">{validationErrors.title}</p>
            )}
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
            {validationErrors.description && (
              <p className="text-red-500 text-sm">
                {validationErrors.description}
              </p>
            )}
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={task.tags.join(", ")}
                onChange={handleChange}
                required
              />
              {validationErrors.tags && (
                <p className="text-red-500 text-sm">{validationErrors.tags}</p>
              )}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {validationErrors.priority && (
                <p className="text-red-500 text-sm">
                  {validationErrors.priority}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={(e) => onCloseClick(e)}
          >
            Close
          </button>
          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
