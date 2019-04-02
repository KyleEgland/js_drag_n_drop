/*jshint esversion: 6*/
// app.js
// Javascript Drag-n-Drop Example
// This application is for demonstrating how to drag and drop elements on an
// HTML document
// Constant to handle the new button action
let addnew = document.querySelector('.add-new');

class AddNew {
  // Making all the methods static so that the class
  // doesn't need to be instantiated for the methods to
  // be called
  static SubmitTask() {
    // Method for handling the addition of a new task
    console.log('Form submitted');

    const task = document.querySelector('#next-task').value;

    if(task == '') {
      this.showAlert("Task can't be blank!", "danger");
    } else {
      // Destroy the container that held the form
      var destroy = document.querySelector('#new-task');
      destroy.parentNode.removeChild(destroy);

      // Grab the list so we can stick the new task in it
      const tasklist = document.querySelector('#list');

      // Create the div for the new task
      const newtask = document.createElement('div');
      newtask.classNaem = 'task';

      // Insert the html into the new div
      newtask.innerHTML = `
      <div class="task-handler" draggable="true">
        <span class="handle">
          <i class="fas fa-grip-vertical"></i>
        </span>
        <span class="task-content">
          ${task}
        </span>
      </div>
      `;

      // Add the new div to the task list
      tasklist.appendChild(newtask);

      // Finally, put the add new option back
      this.AppendNew(tasklist);
    }
  }

  static showAlert(message, className) {
    // Method for presenting a message to the user. It takes in
    // message (string of text for user to see) and a className which
    // will be styled with CSS to reflect the context of the message
    // (e.g. styled red for negative messages - inavlid credentials).

    // Create a variable to represent the container of the message
    const div = document.createElement('div');

    // Give the container the appropriate className as passed by the
    // caller - using back-ticks below allows the passing of the variable
    div.className = `alert alert-${className}`;

    // Stick the message (passed by called) into the container div
    div.appendChild(document.createTextNode(message));

    // container is assigned the thing in which the new div will be placed
    const container = document.querySelector('#container');

    // Wrapper is assigned the wrapper object that we want our new div
    // to appear before.
    const wrapper = document.querySelector('.wrapper');

    // Insert the div into the container before the wrapper
    container.insertBefore(div, wrapper);

    // Clear the alert after 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static AppendNew(list) {
    // Method for re-adding the add new button, allowing users to continue to add items to the lsit
    const readdnew = document.createElement('div');
    readdnew.className = 'task add-new';
    readdnew.id = "new-task";

    readdnew.innerHTML = `
    <i class="fas fa-plus-square" id="new-button"></i>
    `;

    list.appendChild(readdnew);
  }
}

// One-off functions
function createTask() {
  addnew.removeEventListener('click', createTask);
  console.log('Function: createTask: Removing icon');
  while (addnew.firstChild) addnew.removeChild(addnew.firstChild);

  console.log('Function: createTask: Changing class');
  addnew.className = 'task';

  console.log('Function: createTask: Adding form');
  addnew.innerHTML = `
  <form>
    <input type="text" id="next-task" class="form-text">
    <input type="submit" value="Add Task" class="form-button">
  </form>
  `;
}

// -------------- //
// Event handlers //
// -------------- //
// Event: Add new button clicked
// Watching for the event that the user clicks anywhere in the div
// with the button in it.  We're then calling the createTask function.
addnew.addEventListener('click', createTask);

document.addEventListener('submit', (e) => {
  // Prevent an actual submition
  e.preventDefault();

  AddNew.SubmitTask();
});
