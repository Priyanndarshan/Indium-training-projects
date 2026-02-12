const prompt = require("prompt-sync")({ sigint: true });
 
async function get() {
  const res = await fetch("http://localhost:3000/todo");
  const data = await res.json();
  console.log(data);
}
 
async function post(data) {
  const res = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Task added");
}
 
async function put(id, data) {
  const res = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
 
  console.log("Task updated (PUT)");
}
 
async function patch(id, data) {
  const res = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
 
  console.log("Task updated (PATCH)");
}
 
async function del(id) {
  const res = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "DELETE",
  });
 
  console.log("Task deleted");
}
 
async function main() {
  let next = true;
  while (next) {
    console.log("1.GET");
    console.log("2.POST");
    console.log("3.PUT");
    console.log("4.PATCH");
    console.log("5.DELETE");
    console.log("6.EXIT");
    let input = prompt("Enter your choice: ");
    switch (input) {
      case "1":
        await get();
        break;
 
      case "2": {
        const task = prompt("Enter task name: ");
        const status = prompt("Enter status: ");
        await post({
          task,
          status,
          createdAt: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        });
        break;
      }
 
      case "3": {
        const id = prompt("Enter id: ");
        const task = prompt("Enter new task:");
        const status = prompt("Enter status: ");
        await put(id, {
          task,
          status,
          createdAt: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        });
        break;
      }
 
      case "4": {
        const id = prompt("Enter id");
        const status = prompt("Enter new status: ");
        await patch(id, { status });
        break;
      }
 
      case "5": {
        const id = prompt("Enter id: ");
        await del(id);
        break;
      }
 
      case "6":
        next = false;
        break;
    }
  }
}
main();