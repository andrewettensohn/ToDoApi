const uri1 = 'weatherforecast';
const uri = 'api/TodoItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem(newTaskName) {


    const addNameTextbox = document.getElementById('add-name');


    const item = {
        taskStatus: "Not Started",
        taskName: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => displayNewItem())
        .then(() => {
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));

} 

function displayNewItem() {


    $("#output").empty();

    getItems();

    $("#add-name").focus();


}

function taskStatusChange(newStatus, itemId, itemTaskName) {


    const item = {
        id: parseInt(itemId, 10),
        taskName: itemTaskName,
        taskStatus: newStatus
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => document.getElementById(`statusDropDown${itemId}`).innerHTML = newStatus)
        .then(() => document.getElementById(`statusIcon${itemId}`).src = `lib/statusIcons/${newStatus}.png`)
        .then(() => $(`#hiddenTaskStatus${itemId}`).text(`${newStatus}`))
        .catch(error => console.error('Unable to delete item.', error));

}

function displayTaskInput(itemId) {

    $(`#btnTaskDropDown${itemId}`).addClass('d-none');
    $(`#areaInputNameChange${itemId}`).toggleClass('d-none');
    $(`#inputNameChange${itemId}`).focus();
}

function taskNameChange(itemId) {

    var newTaskName = $(`#inputNameChange${itemId}`).val();
    var taskStatus = $(`#hiddenTaskStatus${itemId}`).text();


    const item = {
        id: parseInt(itemId, 10),
        taskStatus: taskStatus,
        taskName: newTaskName
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => displayNewItem())
        .catch(error => console.error('Unable to delete item.', error));

}

function deleteTask(itemId) {

    fetch(`${uri}/${itemId}`, {
        method: 'DELETE'
    })
        .then(() => displayNewItem())
        .catch(error => console.error('Unable to delete item.', error));

}

function displayItems(data) {

    data.forEach(item => {

            var taskHTML = `

                <div id="taskAccordion${item.id}">
                <div class="card bg-dark">
                    <div class="card-header" id="taskHeading${item.id}">
                        <img id="statusIcon${item.id}" class="float-left" height="80" width="8" src="lib/statusIcons/${item.taskStatus}.png" />
                        <div class="mb-0 float-left" id="divTaskName${item.id}">
                            <button class="btn text-white" id="btnTaskDropDown${item.id}" data-toggle="collapse" data-target="#taskCollapse${item.id}" aria-expanded="false" aria-controls="taskCollapse${item.id}">
                                <h5 id="taskNameHeader${item.id}">${item.taskName}</h5>
                            </button>
                            <div class="input-group mb-3 d-none" id="areaInputNameChange${item.id}">
                              <input id="inputNameChange${item.id}" onfocusout="taskNameChange('${item.id}')" type="text" class="form-control bg-dark text-white border-0" aria-describedby="basic-addon2">
                              <div class="input-group-append">
                              </div>
                            </div>
                            <br>
                        </div>
                        <div class="d-none">
                            <p id="hiddenTaskStatus${item.id}">${item.taskStatus}</p>
                        </div>
                        <div class="dropdown show">
                            <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="statusDropDown${item.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${item.taskStatus}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="statusDropDown${item.id}">
                                <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${item.id}', '${item.taskName}')" href="#">Not Started</a>
                                <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${item.id}', '${item.taskName}')" href="#">In-Progress</a>
                                <a class="dropdown-item" onclick="taskStatusChange('Completed', '${item.id}', '${item.taskName}')" href="#">Completed</a>
                            </div>
                        </div>
                        <button class="btn text-white float-right" id="btnDeleteTask${item.id}" onclick="deleteTask(${item.id})">
                            <svg id="i-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M2 30 L30 2 M30 30 L2 2" />
                            </svg>
                        </button>
                        <button class="btn text-white float-right" id="btnEditTaskName${item.id}" onclick="displayTaskInput('${item.id}')">
                            <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                            </svg>
                        </button>
                    </div>
                    <div id="taskCollapse${item.id}" class="collapse bg-secondary" aria-labelledby="taskHeading${item.id}" item-parent="#taskAccordion${item.id}">
                        <div id="subAccordion${item.id}">
                            <div class="card bg-dark">
                                <div class="card-header" id="subHeading${item.id}">
                                    <img class="float-left" height="40" width="8" src="lib/statusIcons/iconNotStarted.png" />
                                    <h5 class="mb-0 float-left">
                                        <button class="btn text-white" data-toggle="collapse" id="subTaskNameHeader${item.id}" data-target="#subCollapse${item.id}" aria-expanded="false" aria-controls="subCollapse${item.id}">
                                            ${item.taskName}
                                        </button>
                                    </h5>
                                    <div class="dropdown show">
                                        <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="subStatusDropDown1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            In-Progress
                                        </a>

                                        <div class="dropdown-menu" aria-labelledby="subStatusDropDown1">
                                            <a class="dropdown-item" href="#">Not Started</a>
                                            <a class="dropdown-item" href="#">In-Progress</a>
                                            <a class="dropdown-item" href="#">Completed</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="subCollapse${item.id}" class="collapse bg-dark" aria-labelledby="subHeading1" data-parent="#subAccordion${item.id}">
                                    <br />
                                    <p>Using Bootstrap accordions as an alternative to tables.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            var newDiv = document.createElement('div');
            newDiv.innerHTML = taskHTML;
            document.getElementById("output").appendChild(newDiv);
    });

    todos = data;
}
