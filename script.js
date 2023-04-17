// GET HTML ELEMENTS
const elContainerGroups = document.querySelector('#col-2-container-groups');
const elMyGroupBarFiller = document.querySelector('#myGroup-bar-filler');
const elBtnRegress = document.querySelector('#btn-regress');
const elBtnHelp = document.querySelector('#btn-help');
const elBtnHelpIcon = document.querySelector('#btn-help-icon');
const elBtnProgress = document.querySelector('#btn-progress');

// GET THE ROOT ELEMENT
var r = document.querySelector(':root');

// CONSTANTS
const numberOfGroups = 20;
const numberOfTasks = 5;
const barStep = (100/numberOfTasks) + 5;

// VARIABLES
let myBarLength = 0;
let groupStatus = 0; // 0 = working; 1 = need help

// STARTUP
r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
elBtnRegress.disabled = true;




// LOAD GROUPS AND PROGRESS BARS
function loadGroupsAndProgresses() {
    for (let i = 0; i < numberOfGroups; i++) {
    elContainerGroups.innerHTML += `
        <div id="group-${i}-container" class="container-groups">
              <div id="group-${i}-container-group-name" class="container-group-name">
                <h4>Group ${i+1}</h4>
              </div>

              <div>
              <div class="container-numbers">
                <ul id="group-${i}-ul-numbers">
                  <li><h5>1</h5></li>
                  <li><h5>2</h5></li>
                  <li><h5>3</h5></li>
                  <li><h5>4</h5></li>
                  <li><h5>5</h5></li>
                </ul>
              </div>

              <!-- bar -->
              <div class="bar-behind">
                <div id="group-${i}-bar-filler" class="bar-filler"></div>
              </div>
            </div>
        </div>
        `;
    }
}




// BUTTON REGRESS
function btnRegress(event) {
    event.preventDefault();

    if (myBarLength != 0) {
        myBarLength -= barStep;
        r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
        console.log(`--bar-filler-width: ${myBarLength}%`);
    } else {
        elBtnRegress.disabled = true;
    }
}




// BUTTON PROGRESS
function btnProgress(event) {
    event.preventDefault();

    if (myBarLength != 100) {
        myBarLength += barStep;
        r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
        elBtnRegress.disabled = false;
        console.log(`--bar-filler-width: ${myBarLength}%`);
    } else if (myBarLength == 100) {
        elBtnProgress.disabled = true;
    }
}




// BUTTON HELP
function btnHelp(event) {
  event.preventDefault();

  if (!groupStatus) {
    // elBtnHelpIcon.className = 'fa-circle-notch fa-spin';
    elBtnHelp.className = 'btn-help-asking';

    elBtnHelp.innerHTML = `
      <i id="btn-help-icon" class="fa-solid fa-circle-notch fa-spin" style="margin-bottom: 1rem; font-size: 3rem; color: var(--color-blue);"></i>
      Awaiting Help
    `;

    groupStatus = 1;
    console.log("HELP ME!");
    console.log(elBtnHelpIcon);
  } else {
    // elBtnHelpIcon.className = 'fa-solid fa-circle-question';
    elBtnHelp.className = 'btn-help-idle';
    
    elBtnHelp.innerHTML = `
      <i id="btn-help-icon" class="fa-solid fa-circle-question" style="margin-bottom: 1rem; font-size: 3rem; color: var(--color-white);"></i>
      Ask for Help
    `;

    groupStatus = 0;
    console.log("back to work");
    console.log(elBtnHelpIcon);
  }
}


// RUN
loadGroupsAndProgresses();