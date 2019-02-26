
$(document).ready(onReady);
let selectID = 0;

function onReady(){

//Click Handlers///////////////////////////////////////
    $('#task-form').on('submit', sendTask);
    $('#delete-task').on('click', sweetDelete);
    $('#complete-task').on('click', completeTask);

    $('#de-select-row').on('click', function(){
        selectID = 0;
        $("#task-table tr").removeClass("highlight");
    });

    $('#task-table').on('click', '.task-row', function(){
        selectID = $(this).data('id');
        console.log(selectID);
        let selected = $(this).hasClass("highlight");
        $("#task-table tr").removeClass("highlight");
        if(!selected){
                $(this).addClass("highlight");
        }
    });
///////////////////////////////////////////////////////

    getTasks();
}

// Sets selected task to complete
function completeTask(){
    if(selectID === 0){
        alert('No task selected');
    }else{
        $.ajax({
            method: 'PUT',
            url: `/tasks/${selectID}`
        }).then((response) => {
            getTasks();
        }).catch((error) => {
            console.log('Error in put', error);
        });
    }
}

//Requires confirmation for deletion
function sweetDelete(deleteId){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteTask();
        swal("The task has been permanently removed!", {
          icon: "success",
        });
      } else {
        swal("Delete cancelled!");
      }
    });
  }
  
//Deletes a task
function deleteTask(){
    if(selectID === 0){
        alert('No task selected');
    }else{
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${selectID}`
        }).then((response) => {
            getTasks();
        }).catch((error) => {
            console.log('Error in delete', error);
        });
    }
}

//Submits a task to the Database
function sendTask(event){
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            description: $('#task-description').val()
        }
    }).then((response) => {
        getTasks();
    }).catch((error) => {
        console.log('Error in POST', error);
    });
    $('#task-description').val("");

}

//Retreives tasks from database
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        appendTasksToDOM(response)
        selectID = 0;
    }).catch((error) => {
        console.log(error);
    });
    
}

//displays tasks on the DOM
function appendTasksToDOM(taskList){
    let completeClass;
    $('#task-table').empty();
        for(let task of taskList){
            if(task.status == 'N'){
                completeClass = 'nonComplete';
            }else if(task.status == 'Y'){
                completeClass = 'complete';
            }
            $('#task-table').append(`<tr class="task-row ${completeClass}" data-id="${task.id}">
                                        <td>${task.description}</td>
                                        <td>${task.status}</td>
                                    </tr>`);
        }
}