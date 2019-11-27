const uri1 = 'weatherforecast';
const uri = 'api/TodoItems';
let todos = [];

function getItems() {
    fetch(uri)
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
        .then(data => displayNewItem(data))
        .then(() => {
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));

} 

function displayNewItem(data) {

    var item = data;

    var taskHTML = `
            <!--Accordion | Parent Task Accordion -->
            <div id="taskAccordion${item.id}">
                <div class="card bg-dark">
                    <div class="card-header" id="taskHeading${item.id}">
                        <img id="statusIcon${item.id}" class="float-left" height="80" width="8" src="lib/statusIcons/${item.taskStatus}.png" />
                        <h1 class="mb-0 float-left">
                            <button class="btn text-white" data-toggle="collapse" data-target="#taskCollapse${item.id}" aria-expanded="false" aria-controls="taskCollapse${item.id}">
                                <h5 id="taskNameHeader${item.id}">${item.taskName}</h5>
                            </button>
                        </h1>
                        <div class="dropdown show">
                            <a class="btn text-white dropdown-toggle float-left" href="#" role="button" id="statusDropDown${item.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${item.taskStatus}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="statusDropDown${item.id}">
                                <a class="dropdown-item" onclick="taskStatusChange('Not Started', '${item.id}', '${item.taskName}')" >Not Started</a>
                                <a class="dropdown-item" onclick="taskStatusChange('In-Progress', '${item.id}', '${item.taskName}')" >In-Progress</a>
                                <a class="dropdown-item" onclick="taskStatusChange('Completed', '${item.id}', '${item.taskName}')">Completed</a>
                            </div>
                        </div>
                    </div>
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
        .catch(error => console.error('Unable to delete item.', error));

}


function displayItems(data) {

    data.forEach(item => {

            var taskHTML = `

                <div id="taskAccordion${item.id}">
                <div class="card bg-dark">
                    <div class="card-header" id="taskHeading${item.id}">
                        <img id="statusIcon${item.id}" class="float-left" height="80" width="8" src="lib/statusIcons/${item.taskStatus}.png" />
                        <h1 class="mb-0 float-left">
                            <button class="btn text-white" data-toggle="collapse" data-target="#taskCollapse${item.id}" aria-expanded="false" aria-controls="taskCollapse${item.id}">
                                <h5 id="taskNameHeader${item.id}">${item.taskName}</h5>
                            </button>
                        </h1>
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
