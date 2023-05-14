let projectsData = [];

function addProjectHTML(project) {
    if (project.category == "pro") {
        const projectName = document.createElement("h4");
    }
}

function fetchData() {
	fetch("projects.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            projectsData = data;
            for (project of projectsData) {
                //addProjectHTML(project);
            }
            
        })
}

window.onload = function() {
    fetchData();
};