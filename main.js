listObjectsToAssignments();
    renderTaskList();
    renderTeamMemberList();
    renderAssignments();


    //Funksjon for å liste ut alle lagrede objekter i "Tildelinger"-menyen
    function listObjectsToAssignments() {
      const taskSelect = document.getElementById("select-task");
      const teamMemberSelect = document.getElementById("select-team-member");

      const taskList = JSON.parse(localStorage.getItem("taskChecking")) || [];
      const teamMemberList = JSON.parse(localStorage.getItem("teamMember")) || [];
      
      taskSelect.innerHTML = "";
      teamMemberSelect.innerHTML = "";


      for (const task of taskList){
            taskSelect.innerHTML += "<option value=" +  task.workTask + `>${task.workTask}</option>`;
      }

      for (const teamMember of teamMemberList) {
            teamMemberSelect.innerHTML += "<option value=" + `${teamMember.surname} ${teamMember.lastName}">${teamMember.surname} ${teamMember.lastName}</option>`; 
      }  
    }

    //Funksjon for å tildele Teammedlem-objekt til Arbeidsoppgave (lage objekt)
    var assignmentChecking = JSON.parse(localStorage.getItem('assignment')) || [];
    function assignMemberToTask() {
        event.preventDefault();

        const assignedTaskValue = document.getElementById("select-task");
        const assignedTeamMemberValue = document.getElementById("select-team-member");

        const taskToBeAssigned = assignedTaskValue.options[assignedTaskValue.selectedIndex].text;
        const memberToBeAssigned = assignedTeamMemberValue.options[assignedTeamMemberValue.selectedIndex].text;
        
        const assignmentObject = {taskToBeAssigned, memberToBeAssigned};
        assignmentChecking.push(assignmentObject);
        localStorage.setItem("assignment", JSON.stringify(assignmentChecking));
        
        const assignmentListEl = document.getElementById("assignment-list");
        assignmentListEl.innerHTML = '';
        renderAssignments();
    }

    //Funksjon for å liste ut alle assignments
    function renderAssignments() {
      const assignmentList = JSON.parse(localStorage.getItem("assignment")) || [];
       
          const assignmentListEl = document.getElementById("assignment-list");
       
          assignmentListEl.innerHTML = "<h2>Assignments: </h2>";
       
          for (const assignment of assignmentList) {
            const assignmentEl = document.createElement("div");
            assignmentEl.innerHTML = `<strong>Name: </strong>${assignment.memberToBeAssigned} 
            <br><strong>Medlem: </strong> ${assignment.taskToBeAssigned}<br><br>`;
            assignmentListEl.appendChild(assignmentEl);
 
          }
    }


    //Funksjon for lagring av arbeidsoppgave-objekt
    function addTask(event){
        const taskChecking = JSON.parse(localStorage.getItem("taskChecking")) || [];

        event.preventDefault();
 
        //Uthenting av alle verdier i formen (og legger dem inn i variabler)
        var workTask = document.querySelector("[name='work-task']").value;
        var startDate = document.querySelector("[name='start-date']").value;
        var deadline = document.querySelector("[name='deadline']").value;
 
        //Deklarering av objekt
       
        var taskObject = {workTask, startDate, deadline};
        taskChecking.push(taskObject);
        localStorage.setItem("taskChecking", JSON.stringify(taskChecking));
        //const taskListEl = document.getElementById("task");
        //taskListEl.innerHTML = '';
        renderTaskList();
    }
   
   
    //Funksjon for lagring av teammedlem-objekt
    var memberChecking = JSON.parse(localStorage.getItem('teamMember')) || [];
    function addMembers(event){
       
        event.preventDefault();
 
        //Uthenting av alle verdier i formen (og legger dem inn i variabler)
        const surname = document.querySelector("[name = 'surname']").value;
        const lastName = document.querySelector("[name = 'last-name']").value;
           
        //Deklarering av objekt
        var memberObject = {surname, lastName}
        memberChecking.push(memberObject)
        // console.log(taskChecking)
        localStorage.setItem("teamMember", JSON.stringify(memberChecking))
        const taskListEl = document.getElementById("teamMemberList");
        taskListEl.textContent = ''
        renderTeamMemberList()
 
        //Lagring av objektet i local storage
 
        event.target.reset();
    }
   
 
   
        // render av teammembers
   
        function renderTeamMemberList() {
          const teamMemberList = JSON.parse(localStorage.getItem("teamMember")) || [];
       
          const teamMemberListEl = document.getElementById("teamMemberList");
       
          teamMemberListEl.innerHTML = "<h2> Teammedlemmer: </h2>";

          for (const teamMember of teamMemberList) {
            const teamMemberEl = document.createElement("div");
            teamMemberEl.innerHTML = `<strong>Name: </strong>${teamMember.surname} ${teamMember.lastName}`;
            teamMemberListEl.appendChild(teamMemberEl);
 
          }
          listObjectsToAssignments();    
        }       
   
       //render av arbeidsoppgaver
        function renderTaskList() {

          const taskList = JSON.parse(localStorage.getItem("taskChecking")) || [];
       
          const taskListEl = document.getElementById("task-list");
          taskListEl.innerHTML = `<h2>Arbeidoppgaver: </h2>`;
        
      

        for (const task of taskList) {
            const taskEl = document.createElement("div");
            taskEl.innerHTML = `<strong>${task.workTask}</strong> 
            <br>${task.startDate} - ${task.deadline}`;
            taskListEl.appendChild(taskEl);
 
        } 
        listObjectsToAssignments();   
     }
