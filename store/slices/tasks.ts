import { RootState } from "./../index";
import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../screens/Home";

interface State {
  tasks: Task[];
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  } as State,
  reducers: {
    addTask: (state: State, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    toggleIsDone: (state: State, action) => {
      state.tasks.forEach((task: Task) => {
        if (task.id === action.payload) {
          task.isDone = !task.isDone;
        } else return;
      });
    },
    removeTask: (state: State, action) => {
      state.tasks = state.tasks.filter(
        (task: Task) => action.payload !== task.id
      );
    },
  },
});

export const selectTasks = (state: RootState) => state.tasksStore.tasks;
export const { addTask, toggleIsDone, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
