import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl =
  "";

export const addProject = createAsyncThunk(
  "Context_slices/addProject",
  async (project) => {
    let res = await axios.post(`${baseurl}.json`, project);
    return { id: res.data.name, ...project };
  }
);

export const deleteProject = createAsyncThunk(
  "Context_slice/deleteProject",
  async (projectId) => {
    await axios.delete(`${baseurl}/${projectId}.json`);
    return projectId;
  }
);

export const updateProject = createAsyncThunk(
  "Context_slices/updateProject",
  async ({ id, updates }) => {
    await axios.patch(`${baseurl}/${id}.json`, updates);
    return { id, updates };
  }
);

export const fetchProjectById = createAsyncThunk(
  "Context_slices/fetchProjectById",
  async (id) => {
    const res = await axios.get(`${baseurl}/${id}.json`);
    return { id, ...res.data };
  }
);



export const fetchAllProjects = createAsyncThunk(
  "Context_slices/fetchAllProjects",
  async () => {
    const res = await axios.get(`${baseurl}.json`);
    const data = res.data;
    const parsed = Object.entries(data || {}).map(([id, proj]) => ({
      id,
      ...proj,
    }));
    return parsed;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    error: null,
    selected: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.error = null;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updates } = action.payload;
        const index = state.list.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...updates };
        }
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });

  },
});

export default projectSlice.reducer;
