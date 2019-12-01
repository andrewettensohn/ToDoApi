const uri = 'api/TodoItems';
const uri1 = 'api/TodoItems/Tasks';
let todos = [];

function getItems() {

    $("#output").empty();

    fetch(uri1)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function displayTaskInput(itemId) {

    $(`#btnTaskDropDown${itemId}`).addClass('d-none');
    $(`#areaInputNameChange${itemId}`).toggleClass('d-none');
    $(`#inputNameChange${itemId}`).focus();
}

function addItem() {

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
        .then(() => getItems())
        .then(() => $("#add-name").focus())
        .then(() => {
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));

} 


function taskStatusChange(newStatus, itemId, itemTaskName) {


    const item = {
        todoItemID: parseInt(itemId, 10),
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

function taskNameChange(itemId) {

    var newTaskName = $(`#inputNameChange${itemId}`).val();
    var taskStatus = $(`#hiddenTaskStatus${itemId}`).text();


    const item = {
        todoItemID: parseInt(itemId, 10),
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
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));

}

function deleteTask(itemId) {

    fetch(`${uri}/${itemId}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));

}

function displayItems(data) {

    var accordionBtnState = "active";


    data.forEach(item => {


        if (item.todoSubItems == "undefined" || item.todoSubItems == null)
        {
            accordionBtnState = "disabled";
        }

            var taskHTML = `

              <div id="taskAccordion${item.todoItemID}">
                <div id="taskCard${item.todoItemID}" class="card bg-dark">
                    <div class="card-header" id="taskHeading${item.todoItemID}">
                        <img id="statusIcon${item.todoItemID}" class="float-left" height="80" width="8" src="lib/statusIcons/${item.taskStatus}.png" />
                        <div class="mb-0 float-left" id="divTaskName${item.todoItemID}">
                            <button class="btn text-white" id="btnTaskDropDown${item.todoItemID}" data-toggle="collapse" data-target="#taskCollapse${item.todoItemID}" aria-expanded="false" aria-controls="taskCollapse${item.todoItemID}" ${accordionBtnState}>
                                <h5 id="taskNameHeader${item.todoItemID}">${item.taskName}</h5>
                            </button>
                            <div class="input-group mb-3 d-none" id="areaInputNameChange${item.todoItemID}">
                                <input id="inputNameChange${item.todoItemID}" onfocusout="taskNameChange('${item.todoItemID}')" type="text" class="form-control bg-dark text-white border-0" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                </div>
                            </div>
                        </div>
                        <div class="d-none">
                            <p id="hiddenTaskStatus${item.todoItemID}">${item.taskStatus}</p>
                        </div>
                        <div class="dropdown show">
                            <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="statusDropDown${item.todoItemID}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${item.taskStatus}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="statusDropDown${item.todoItemID}">
                                <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${item.todoItemID}', '${item.taskName}')" href="#">Not Started</a>
                                <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${item.todoItemID}', '${item.taskName}')" href="#">In-Progress</a>
                                <a class="dropdown-item" onclick="taskStatusChange('Completed', '${item.todoItemID}', '${item.taskName}')" href="#">Completed</a>
                            </div>
                        </div>
                        <div>
                            <button class="btn text-white float-right" id="btnDeleteTask${item.todoItemID}" onclick="deleteTask(${item.todoItemID})">
                                <svg id="i-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M2 30 L30 2 M30 30 L2 2" />
                                </svg>
                            </button>
                            <button class="btn text-white float-right" id="btnEditTaskName${item.todoItemID}" onclick="displayTaskInput('${item.todoItemID}')">
                                <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                <div id="taskCollapse${item.todoItemID}" class="collapse bg-secondary" aria-labelledby="taskHeading${item.todoItemID}" item-parent="#taskAccordion${item.todoItemID}">
                
                </div>
                </div>
            </div>
            `;

        var newDiv = document.createElement('div');
        newDiv.innerHTML = taskHTML;
        document.getElementById("output").appendChild(newDiv);



        if (item.todoSubItems != "undefined" || item.todoSubItems != null) {

            item.todoSubItems.forEach(subItem => {

                console.log(item.todoItemID);
                console.log(subItem);
                //the first line of this html is jacked up
                var subTaskHTML = `

       <div id="subAccordion${subItem.todoSubItemID}">
        <div class="card bg-dark">
            <div class="card-header" id="subHeading${subItem.todoSubItemID}">
                <img class="float-left" height="40" width="8" src="lib/statusIcons/${subItem.subTaskStatus}.png" />
                <div class="mb-0 float-left" id="divTaskName${subItem.todoSubItemID}">
                    <button class="btn text-white" id="btnTaskDropDown${subItem.todoSubItemID}" data-toggle="collapse" data-target="#subCollapse${subItem.todoSubItemID}" aria-expanded="false">
                        <h5 id="taskNameHeader${subItem.todoSubItemID}">${subItem.subTaskName}</h5>
                    </button>
                    <div class="input-group mb-3 d-none" id="areaInputNameChange${subItem.todoSubItemID}">
                        <input id="inputNameChange${subItem.todoSubItemID}" onfocusout="taskNameChange('${subItem.todoSubItemID}')" type="text" class="form-control bg-dark text-white border-0" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                        </div>
                    </div>
                </div>
                <div class="d-none">
                    <p id="hiddenTaskStatus${subItem.todoSubItemID}">${subItem.taskStatus}</p>
                </div>
                <div class="dropdown show">
                    <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="statusDropDown${subItem.todoSubItemID}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${subItem.subTaskStatus}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="statusDropDown${subItem.todoSubItemID}">
                        <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${subItem.todoSubItemID}', '${subItem.subTaskName}')" href="#">Not Started</a>
                        <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${subItem.todoSubItemID}', '${subItem.subTaskName}')" href="#">In-Progress</a>
                        <a class="dropdown-item" onclick="taskStatusChange('Completed', '${subItem.todoSubItemID}', '${subItem.subTaskName}')" href="#">Completed</a>
                    </div>
                </div>
                <div>
                    <button class="btn text-white float-right" id="btnDeleteTask${subItem.todoSubItemID}" onclick="deleteTask(${subItem.todoSubItemID})">
                        <svg id="i-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M2 30 L30 2 M30 30 L2 2" />
                        </svg>
                    </button>
                    <button class="btn text-white float-right" id="btnEditTaskName${subItem.todoSubItemID}" onclick="displayTaskInput('${subItem.todoSubItemID}')">
                        <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="subCollapse${subItem.todoSubItemID}" class="collapse bg-dark" data-parent="#subAccordion${subItem.todoSubItemID}">
                <br />
                <p>Using Bootstrap accordions as an alternative to tables.</p>
            </div>
        </div>
    </div>
                
                `;

                var newDiv = document.createElement('div');
                newDiv.innerHTML = subTaskHTML;
                document.getElementById(`taskCollapse${item.todoItemID}`).appendChild(newDiv);

            });
        }

    });

    todos = data;
}
