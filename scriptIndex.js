// GET HTML ELEMENTS
const elSwitchView = document.querySelector('#container-toggle-views');
const elViewStudent = document.querySelector('#view-student');
const elViewTa = document.querySelector('#view-ta');
const elMyGroupNumber = document.querySelector('#h2-my-group');
const elContainerMyNumbers = document.querySelector('#my-container-numbers');
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
let myGroupNumber = 1;
let currentView = 0; // 0 = student; 1 = ta/teacher
let switchViewLeftMargin = 0; // start in student view
let switchViewBorderRadius = '10rem 0 0 10rem'; // start in student view

// STARTUP
r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
r.style.setProperty('--switch-left-margin', `${switchViewLeftMargin}%`);
r.style.setProperty('--switch-border-radius', `${switchViewBorderRadius}`);
elBtnRegress.disabled = true;
elMyGroupNumber.innerHTML += `Group ${myGroupNumber}`;




// LOAD GROUPS AND PROGRESS BARS
function loadGroupsAndProgresses() {
    // Load my group
    for (let i = 0; i < numberOfTasks; i++) {
      elContainerMyNumbers.innerHTML += `
        <li><h4>${i+1}</h4></li>
        `;
    }

    // Load other groups
    for (let i = 0; i < numberOfGroups; i++) {
    elContainerGroups.innerHTML += `
        <div id="group-${i}-container" class="container-groups other-group">
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




// BUTTON REGRESS
function btnRegress(event) {
    event.preventDefault();

    if (myBarLength != 0) {
        myBarLength -= barStep;
        r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
        elBtnProgress.disabled = false;
        elBtnRegress.disabled = false;
    } else {
        elBtnRegress.disabled = true;
    }

    console.log(`--bar-filler-width: ${myBarLength}%`);
}




// BUTTON PROGRESS
function btnProgress(event) {
    event.preventDefault();

    if (myBarLength != 100) {
        myBarLength += barStep;
        r.style.setProperty('--bar-filler-width', `${myBarLength}%`);
        elBtnProgress.disabled = false;
        elBtnRegress.disabled = false;
    } else {
        elBtnProgress.disabled = true;
    } 

    console.log(`--bar-filler-width: ${myBarLength}%`);
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
    // console.log("HELP ME!");
    // console.log(elBtnHelpIcon);
  } else {
    // elBtnHelpIcon.className = 'fa-solid fa-circle-question';
    elBtnHelp.className = 'btn-help-idle';
    
    elBtnHelp.innerHTML = `
      <i id="btn-help-icon" class="fa-solid fa-circle-question" style="margin-bottom: 1rem; font-size: 3rem; color: var(--color-white);"></i>
      Ask for Help
    `;

    groupStatus = 0;
    // console.log("back to work");
    // console.log(elBtnHelpIcon);
  }
}




// TOGGLE VIEW
function toggleView(event) {
  event.preventDefault();

  if (!currentView) {
    switchViewLeftMargin = 0;
    switchViewBorderRadius = '10rem 0 0 10rem';
    r.style.setProperty('--switch-left-margin', `${switchViewLeftMargin}%`);
    r.style.setProperty('--switch-border-radius', `${switchViewBorderRadius}`);

    elViewStudent.className = 'view active';
    elViewTa.className = 'view inactive';

    currentView = 1;
    console.log('switched to student view')
  } else {
    switchViewLeftMargin = 50;
    switchViewBorderRadius = '0 10rem 10rem 0';
    
    r.style.setProperty('--switch-left-margin', `${switchViewLeftMargin}%`);
    r.style.setProperty('--switch-border-radius', `${switchViewBorderRadius}`);

    elViewStudent.className = 'view inactive';
    elViewTa.className = 'view active';

    currentView = 0;
    console.log('switched to ta/teacher view')
  }

  // console.log(getComputedStyle(elViewStudent));
  // console.log(getComputedStyle(elViewTa));
}




// RUN
loadGroupsAndProgresses();
loadRandomProgresses();




// // MQTT
// import { connect } from "mqtt";
// 
// /***
//  * Browser
//  * Using MQTT over WebSocket with ws and wss protocols
//  * EMQX's ws connection default port is 8083, wss is 8084
//  * Note that you need to add a path after the connection address, such as /mqtt
//  */
// const url = 'mqtt20.item.ntnu.no:1883';
// /***
//  * Node.js
//  * Using MQTT over TCP with mqtt and mqtts protocols
//  * EMQX's mqtt connection default port is 1883, mqtts is 8883
//  */
// // const url = 'mqtt://broker.emqx.io:1883'
// 
// // Create an MQTT client instance
// const options = {
//   // Clean session
//   clean: true,
//   connectTimeout: 4000,
//   // Authentication
//   // clientId: 'emqx_test',
//   // username: 'emqx_test',
//   // password: 'emqx_test',
// }
// const client  = connect(url, options)
// client.on('connect', function () {
//   console.log('Connected')
//   // Subscribe to a topic
//   client.subscribe('g6/unit6/G6', function (err) {
//     if (!err) {
//       // Publish a message to a topic
//       // client.publish('g6/unit6/G6', 'Hello mqtt')
//       console.log("Hello MQTT");
//     }
//   })
// })
// 
// // Receive messages
// /*
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })
// */
// 
// client.on('message', function (topic, payload, packet) {
//   // Payload is Buffer
//   console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`);
//   client.end();
// });
// 
// // Subscribe to a topic named g6/unit6/G6 with QoS 0
// client.subscribe('g6/unit6/G6', { qos: 0 }, function (error, granted) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log(`${granted[0].topic} was subscribed`)
//   }
// });
// 
// 