import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

export const registerUser = createAsyncThunk(
  "Context_slices/registerUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });
      return {
        uid: user.uid,
        email: user.email,
        role: role,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "Context_slices/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      return {
        uid: user.uid,
        email: user.email,
        role: userData?.role || "user", 
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loginSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loginSuccess = false;
      signOut(auth);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginSuccess = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.loginSuccess = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginSuccess = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
