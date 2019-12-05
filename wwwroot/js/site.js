const uri = 'api/TodoItems';
const uri1 = 'api/TodoItems/Tasks';
const uri2 = 'api/TodoSubItems';

function getItems() {

    $("#output").empty();

    fetch(uri1)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
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

function taskStatusChange(newStatus, itemId, subItemId, itemTaskName, isSubTask) {

    if (isSubTask) {

        var uriType = uri2;
        var idToSend = subItemId;
        var dropDownElement = `subStatusDropDown${subItemId}`;
        var statusIconElement = `subStatusIcon${subItemId}`;
        var hiddenStatusElement = `subHiddenTaskStatus${subItemId}`;

        var item = {
            todoSubItemID: parseInt(subItemId, 10),
            todoItemID: parseInt(itemId, 10),
            subTaskName: itemTaskName,
            subTaskStatus: newStatus
        };

    } else if (isSubTask == false) {

        var uriType = uri;
        var idToSend = itemId;
        var dropDownElement = `statusDropDown${itemId}`;
        var statusIconElement = `statusIcon${itemId}`;
        var hiddenStatusElement = `hiddenTaskStatus${itemId}`;

        var item = {
            todoItemID: parseInt(itemId, 10),
            taskName: itemTaskName,
            taskStatus: newStatus
        };

    }

    fetch(`${uriType}/${idToSend}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => $(`#${dropDownElement}`).html(newStatus))
        .then(() => $(`#${statusIconElement}`).attr("src", `lib/statusIcons/${newStatus}.png`))
        .then(() => $(`#${hiddenStatusElement}`).text(`${newStatus}`))
        .catch(error => console.error('Unable to delete item.', error));

}

function taskNameChange(itemId, subItemId, isSubTask) {

    if (isSubTask == true) {

        var newTaskName = $(`#subInputNameChange${subItemId}`).val();
        newTaskName = newTaskName.toString();

        var taskStatus = $(`#subHiddenTaskStatus${subItemId}`).text();

        var taskNameElement = `subTaskNameHeader${itemId}`;
        var inputAreaElement = `subAreaInputNameChange${itemId}`;

        var uriType = uri2;
        var idToSend = subItemId;


        var item = {
            todoSubItemID: parseInt(subItemId, 10),
            todoItemID: parseInt(itemId, 10),
            subTaskStatus: taskStatus,
            subTaskName: newTaskName
        };


    } else if (isSubTask == false) {

        var newTaskName = $(`#inputNameChange${itemId}`).val();
        newTaskName = newTaskName.toString();

        var taskStatus = $(`#hiddenTaskStatus${itemId}`).text();

        var taskNameElement = `taskNameHeader${itemId}`;
        var inputAreaElement = `areaInputNameChange${itemId}`;


        var uriType = uri;
        var idToSend = itemId;

        var item = {
            todoItemID: parseInt(itemId, 10),
            taskStatus: taskStatus,
            taskName: newTaskName
        };

    }

    fetch(`${uriType}/${idToSend}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => $(`#${taskNameElement}`).text(`${newTaskName}`))
        .then(() => $(`#${inputAreaElement}`).toggleClass('d-none'))
        .then(() => $(`#${taskNameElement}`).toggleClass('d-none'))
        .catch(error => console.error('Unable to delete item.', error));
}

function displayTaskInput(itemId, subItemId, isSubTask) {

    if (isSubTask == true) {

        $(`#subTaskNameHeader${subItemId}`).addClass('d-none');
        $(`#subAreaInputNameChange${subItemId}`).toggleClass('d-none');
        $(`#subInputNameChange${subItemId}`).focus();

    } else if (isSubTask == false) {

        $(`#taskNameHeader${itemId}`).addClass('d-none');
        $(`#areaInputNameChange${itemId}`).toggleClass('d-none');
        $(`#inputNameChange${itemId}`).focus();

    }
}

function deleteTask(itemId, subItemId, isSubTask) {

    if (isSubTask == true) {

        fetch(`${uri2}/${subItemId}`, {
            method: 'DELETE'
        })
            .then(() => getItems())
            .catch(error => console.error('Unable to delete item.', error));

    }
    else if (isSubTask == false) {

        fetch(`${uri}/${itemId}`, {
            method: 'DELETE'
        })
            .then(() => getItems())
            .catch(error => console.error('Unable to delete item.', error));
    }
}

function toggleCollapse(itemId, isSubTask) {

    if (isSubTask == true) {

        $(`#subCollapse${itemId}`).collapse('toggle');
    }
    else if (isSubTask == false) {

        $(`#taskCollapse${itemId}`).collapse('toggle');
    }

}

function addSubItem(itemId) {

    const item = {

        todoItemID: parseInt(itemId, 10),
        subTaskStatus: "Not Started",
        subTaskName: ""
    };

    fetch(uri2, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(data => displaySubItems(data))
        .catch(error => console.error('Unable to add item.', error));

}

function displayItems(data) {


    data.forEach(item => {

        var cheveronHide = item.todoSubItems ? "" : 'd-none';
       
        var addSubTaskHide = "";

        var taskHTML = `

            <div id="taskAccordion${item.todoItemID}">
                    <div id="taskCard${item.todoItemID}" class="card bg-dark">
                        <div>
                            <svg class="${addSubTaskHide} float-left my-1" onclick="addSubItem(${item.todoItemID})" id="i-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M16 2 L16 30 M2 16 L30 16" />
                            </svg>
                            <svg class="${cheveronHide} align-middle mr-4" onclick="toggleCollapse('${item.todoItemID}', false)" id="i-chevron-bottom${item.todoItemID}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M30 10 L16 26 2 10 Z" />
                            </svg>
                            <svg class="float-right my-1" id="btnDeleteTask${item.todoItemID}" onclick="deleteTask(${item.todoItemID}, 'N/A', false)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <path d="M2 30 L30 2 M30 30 L2 2" />
                            </svg>
                        </div>
                        <div class="card-header" id="taskHeading${item.todoItemID}">
                            <img id="statusIcon${item.todoItemID}" class="float-left" height="80" width="8" src="lib/statusIcons/${item.taskStatus}.png" />
                            <div class="mb-0 float-left" id="divTaskName${item.todoItemID}">
                                <h5 onclick="displayTaskInput('${item.todoItemID}', 'N/A', false)" class="mx-2 mt-1" id="taskNameHeader${item.todoItemID}">${item.taskName}</h5>
                                <div class="input-group mb-3 d-none" id="areaInputNameChange${item.todoItemID}">
                                    <input id="inputNameChange${item.todoItemID}" maxlength="25" onfocusout="taskNameChange('${item.todoItemID}', 'N/A', false)" type="text" class="form-control bg-dark text-white border-0" aria-describedby="basic-addon2">
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
                                <div class="dropdown-menu ml-3 mt-1" aria-labelledby="statusDropDown${item.todoItemID}">
                                    <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${item.todoItemID}', 'N/A', '${item.taskName}', false)" href="#">Not Started</a>
                                    <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${item.todoItemID}', 'N/A', '${item.taskName}', false)" href="#">In-Progress</a>
                                    <a class="dropdown-item" onclick="taskStatusChange('Completed', '${item.todoItemID}', 'N/A', '${item.taskName}', false)" href="#">Completed</a>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div id="taskCollapse${item.todoItemID}" class="collapse bg-secondary" aria-labelledby="taskHeading${item.todoItemID}" item-parent="#taskAccordion${item.todoItemID}">

                        </div>
                    </div>
                </div>
                <br />
            `;

        var newDiv = document.createElement('div');
        newDiv.innerHTML = taskHTML;
        document.getElementById("output").appendChild(newDiv);

        if (item.todoSubItems != null) {

            displaySubItems(item);

        }
    });

}


function displaySubItems(item) {

    if ('todoSubItems' in item) {

        var cheveronHide = item.todoSubItems ? "" : "d-none";

        item.todoSubItems.forEach(subItem => {

            createSubTaskHTML(subItem);

        });

    } else {

        var cheveronHide = "";

        console.log('running')

        var subItem = item;

        createSubTaskHTML(subItem);

    }

    function createSubTaskHTML(subItem) {


        var subTaskHTML = `

            <div id="subAccordion${subItem.todoSubItemID}">
            <div class="card bg-dark">
                <div>
                <svg class="${cheveronHide} align-middle mr-2" onclick="toggleCollapse('${subItem.todoSubItemID}', true)" id="i-chevron-bottom${item.todoItemID}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M30 10 L16 26 2 10 Z" />
                </svg>
                <svg class="float-right my-1" id="btnDeleteTask${subItem.todoSubItemID}" onclick="deleteTask(${item.todoItemID}, ${subItem.todoSubItemID}, true)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M2 30 L30 2 M30 30 L2 2" />
                </svg>
            </div>
                <div class="card-header" id="subHeading${subItem.todoSubItemID}">
                    <img id="subStatusIcon${subItem.todoSubItemID}" class="float-left" height="40" width="8" src="lib/statusIcons/${subItem.subTaskStatus}.png" />
                    <div class="mb-0 float-left" id="divTaskName${subItem.todoSubItemID}">
                        <p onclick="displayTaskInput('${item.todoItemID}', '${subItem.todoSubItemID}', true)" class="font-weight-light mx-2 mt-1" id="subTaskNameHeader${subItem.todoSubItemID}">${subItem.subTaskName}</p>
                    <div class="input-group mb-3 d-none" id="subAreaInputNameChange${subItem.todoSubItemID}">
                            <input id="subInputNameChange${subItem.todoSubItemID}" onfocusout="taskNameChange('${item.todoItemID}','${subItem.todoSubItemID}', true)" type="text" class="form-control bg-dark text-white border-0" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                            </div>
                        </div>
                    </div>
                    <div class="d-none">
                        <p id="subHiddenTaskStatus${subItem.todoSubItemID}">${subItem.subTaskStatus}</p>
                    </div>
                    <div class="dropdown show">
                        <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="subStatusDropDown${subItem.todoSubItemID}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${subItem.subTaskStatus}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="statusDropDown${subItem.todoSubItemID}">
                            <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${item.todoItemID}', '${subItem.todoSubItemID}', '${subItem.subTaskName}', true)" href="#">Not Started</a>
                            <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${item.todoItemID}', '${subItem.todoSubItemID}', '${subItem.subTaskName}', true)" href="#">In-Progress</a>
                            <a class="dropdown-item" onclick="taskStatusChange('Completed', '${item.todoItemID}', '${subItem.todoSubItemID}', '${subItem.subTaskName}', true)" href="#">Completed</a>
                        </div>
                    </div>
                    <div>
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

    }
}
