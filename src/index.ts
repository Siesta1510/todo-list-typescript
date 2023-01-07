export const input = document.querySelector(
  ".input"
) as HTMLInputElement | null;
const button = document.querySelector(".button-add") as HTMLButtonElement;
const list = document.querySelector(".list") as HTMLUListElement;
const completedAll = document.querySelector(
  ".isCompleteALL"
) as HTMLInputElement;
const time = document.querySelector(".time") as HTMLInputElement;

const errorField = document.querySelector(
  ".error-field"
) as HTMLDivElement | null;

type Task = {
  completed: boolean;
  title: string;
  deadline: string;
};

const tasks: Task[] = loadTask();

tasks.forEach(addTask);

function formatDateTime(a: string) {
  const date = new Date(a); // had to remove the colon (:) after the T in order to make it work
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const myFormattedDate =
    day +
    "-" +
    (monthIndex + 1) +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return myFormattedDate;
}

function addTask(task: Task) {
  const label = document.createElement("div");
  label.className = "todo-item";
  const isCompleted = document.createElement("input");
  isCompleted.type = "checkbox";
  const nameTask = document.createElement("li");
  const btnDelete = document.createElement("i");
  const timeLabel = document.createElement("div");

  timeLabel.className = "time-label";

  btnDelete.className = "fa-solid fa-delete-left";

  // btnDelete.innerHTML = "Delete";
  btnDelete.addEventListener("click", () => {
    btnDelete.parentElement?.remove();
  });
  nameTask.innerHTML = task.title;
  timeLabel.innerHTML = formatDateTime(task.deadline);
  isCompleted.addEventListener("change", function () {
    task.completed = isCompleted.checked;
  });
  isCompleted.checked = task.completed;
  label.append(isCompleted, nameTask, timeLabel, btnDelete);
  list?.append(label);
}

function addIntoTodo() {
  if (input?.value == "" || input?.value == undefined) {
    errorField.innerHTML = "Please enter todo in the input field!";
    console.log(errorField);
    return;
  }

  const task: Task = {
    completed: false,
    title: input?.value,
    deadline: time?.value,
  };
  input.value = "";
  input.focus();
  tasks.push(task);
  saveTask();
  addTask(task);
  errorField.innerHTML = " ";
}

button.addEventListener("click", () => {
  addIntoTodo();
});
input?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addIntoTodo();
  }
});

completedAll.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

function saveTask() {
  localStorage.setItem("TASK", JSON.stringify(tasks));
}

function loadTask(): Task[] {
  const allTasks = localStorage.getItem("TASK");
  if (allTasks == null) return [];
  return JSON.parse(allTasks);
}

console.log(loadTask());
