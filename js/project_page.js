function addProjectInfo(project) {
    document.querySelector(".project__logo").src = project.logo_url;
    document.querySelector(".project__title h2").innerHTML = project.name;
    document.querySelector(".project__dates").innerText = project.dates;

}


function fetchData(id) {
	fetch("projects.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			projectsData = data;

            var project = projectsData.filter(p => p.id == id)[0];
            addProjectInfo(project)
		});
}

window.onload = function() {
    const projectURL = new URL(window.location.toLocaleString());
    const projectID = projectURL.searchParams.get('id');

    console.log(projectID);

    fetchData(projectID);
};