// GET HTML ELEMENTS
const elContainerGroups = document.querySelector('#col-1-container-groups');
const elSelSortGroups = document.querySelector("#sel-sort");

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




// LOAD GROUPS AND PROGRESS BARS
function loadGroupsAndProgresses() {
    // Load other groups
    for (let i = 0; i < numberOfGroups; i++) {
    elContainerGroups.innerHTML += `
        <div id="group-${i}-container" class="container-groups-grid other-group grid-group" data-group-number="${i+1}">
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


// LOAD RANDOM GROUP PROGRESSES
function loadRandomProgresses() {
  let allGroups = document.querySelectorAll('.bar-filler');
  let allSteps = [];

  // Load specific steps
  for (let i = 0; i < numberOfTasks; i++) {
    allSteps.push(i*barStep);
  }

  // console.log(allGroups);
  // console.log(allSteps);

  allGroups.forEach(group => {
    let randomProgressIndex = getRandomInt(0, numberOfTasks);
    group.style["width"] = `${allSteps[randomProgressIndex]}%`;
    // console.log(randomProgressIndex);
  });
}

// SORT GROUPS
function sortGroups() {
  // console.log("new sort");
  let allGroupsCurrentSort = document.querySelectorAll('.grid-group');
  let allGroupDetails = [];
  // let allGroupDetailsNewSorted = [];
  // let allGroupsNewSorted = [];
  let selectedSortingMethod = elSelSortGroups.value;
  console.log("selectedSortingMethod: ", selectedSortingMethod);

  // Collect relevant group data
  for (let i = 0; i < allGroupsCurrentSort.length; i++) {
    let group = allGroupsCurrentSort[i];
    let groupBarFillerEl = document.querySelector(`#group-${i}-bar-filler`);
    let groupBarFillerWidth = Number(groupBarFillerEl.offsetWidth);
    let groupNumber = Number(group.dataset.groupNumber);

    let groupDetail = {
      thisGroupNumber: groupNumber,
      thisGroupBarFillerWidthPx: groupBarFillerWidth
    };

    allGroupDetails.push(groupDetail);
  }

  // console.log("GROUP DETAILS: ", allGroupDetails);
  let allGroupDetailsNewSorted = allGroupDetails;
  // console.log("OLD: ", allGroupDetailsNewSorted);
  
  // Sort according to selected sorting method
  switch (selectedSortingMethod) {
    case '0': // Ascending by group number
      allGroupDetailsNewSorted = allGroupDetails.sort((a, b) => (a.thisGroupNumber > b.thisGroupNumber) ? 1 : -1);
      // console.log("NEW: ", allGroupDetailsNewSorted);
      break;
    case '1': // Descending by group number
      allGroupDetailsNewSorted = allGroupDetails.sort((a, b) => (a.thisGroupNumber < b.thisGroupNumber) ? 1 : -1);
      // console.log("NEW: ", allGroupDetailsNewSorted);
      break;
    case '2': // Ascending by current task
      allGroupDetailsNewSorted = allGroupDetails.sort((a, b) => (a.thisGroupBarFillerWidthPx > b.thisGroupBarFillerWidthPx) ? 1 : -1);
      // console.log("NEW: ", allGroupDetailsNewSorted);
      break;
    case '3': // Descending by current task
      allGroupDetailsNewSorted = allGroupDetails.sort((a, b) => (a.thisGroupBarFillerWidthPx < b.thisGroupBarFillerWidthPx) ? 1 : -1);
      // console.log("NEW: ", allGroupDetailsNewSorted);
      break;  
    default:
      break;
  }
  
  // Change DOM
  elContainerGroups.innerHTML = '';

  allGroupDetailsNewSorted.forEach(group => {
    let i = group.thisGroupNumber-1;
    let width = group.thisGroupBarFillerWidthPx;

    elContainerGroups.innerHTML += `
        <div id="group-${i}-container" class="container-groups-grid other-group grid-group" data-group-number="${i+1}">
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
                <div id="group-${i}-bar-filler" class="bar-filler" style="width:${width}px"></div>
              </div>
            </div>
        </div>
        `;
  });

  
}




// RUN
loadGroupsAndProgresses();
loadRandomProgresses();
elSelSortGroups.onchange = sortGroups;

