/*jshint esversion: 6*/
const fill = document.querySelector('.fill');
// Since there are multiple "empty" class elemenets, we use querySelectorAll
// which will then place each item into a node list
const empties = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empties and call drag events
for(const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
  // Add hold class to object that is currently held
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  // Return to its original class name
  this.className = 'fill';
}

// The 'e' being passed is the response from event handler
function dragOver(e) {
  // This line allows the object being held to trigger the drop event
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  // Return the objects class to the original value
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}
