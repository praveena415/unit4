import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "";

export const addTaskToProject = createAsyncThunk(
  "tasks/addTaskToProject",
  async ({ projectId, task }) => {
    const res = await axios.post(
      `${baseUrl}/projects/${projectId}/tasks.json`,
      task
    );
    return { ...task, id: res.data.name, projectId };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ projectId, taskId }) => {
    await axios.delete(`${baseUrl}/projects/${projectId}/tasks/${taskId}.json`);
    return { projectId, taskId };
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async ({ projectId, taskId, currentStatus }) => {
    await axios.patch(`${baseUrl}/projects/${projectId}/tasks/${taskId}.json`, {
      completed: !currentStatus,
    });
    return { projectId, taskId, newStatus: !currentStatus };
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ projectId, taskId, updatedTask }) => {
    await axios.patch(
      `${baseUrl}/projects/${projectId}/tasks/${taskId}.json`,
      updatedTask
    );
    return { projectId, taskId, updatedTask };
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    loading: false,
    error: null,
    searchTerm: "",
    filter: {
      priority: "all",
      status: "all",
    },
    sortBy: "createdAt",
    pagination: {
      page: 1,
      pageSize: 5,
    },
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTaskToProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTaskToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleTaskStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      });
  },
});
export const { setSearchTerm, setFilter, setSortBy, setPage } =
  taskSlice.actions;

export default taskSlice.reducer;

export const selectProcessedTasks = (
  projectTasks,
  { searchTerm, filter, sortBy, pagination }
) => {
  let tasks = Object.entries(projectTasks || {}).map(([id, task]) => ({
    ...task,
    id,
  }));

  if (filter.priority !== "all") {
    tasks = tasks.filter((t) => t.priority === filter.priority);
  }
  if (filter.status !== "all") {
    tasks = tasks.filter(
      (t) => t.completed === (filter.status === "completed")
    );
  }

  if (searchTerm) {
    tasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
  } else {
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const start = (pagination.page - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return tasks.slice(start, end);
};
