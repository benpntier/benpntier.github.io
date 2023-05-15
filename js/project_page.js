function addProjectInfo(project) {
    document.querySelector(".project__logo").src = project.logo_url;
    let projectName = project.name;
    if (project.name_full !== undefined) {
        projectName = project.name_full;
    }
    if (project.company !== undefined) {
        projectName = "<b>" + projectName + "</b>, " + project.company;
    }
    document.querySelector(".project__title h2").innerHTML = projectName;
    
    document.querySelector(".project__dates").innerText = project.dates;

    if (project.context !== undefined) {
        document.querySelector(".project__context").innerHTML = "<i class='fa-solid fa-building-columns' title='Contexte'></i> " + project.context;
    }
    if (project.grade !== undefined) {
        document.querySelector(".project__grade").innerHTML = "<i class='fa-solid fa-medal' title='Note finale'></i> " + project.grade;
    }

    document.querySelector(".project__mission").innerHTML = project.mission;

    let projectTags;
    let projectTagsColors;
    if (project.tags_full === undefined) {
        projectTags = project.tags_short;
        projectTagsColors = project.tags_colors_short;
    } else {
        projectTags = project.tags_full;
        projectTagsColors = project.tags_colors_full;
    }
    const proTags = document.querySelector(".tags");
    for (var t=0; t < projectTags.length; t++) {
        var tag = document.createElement("span");
        tag.className = projectTagsColors[t];
        tag.innerText = projectTags[t];
        proTags.appendChild(tag);
    }

    document.querySelector(".project__image").src = project.img_url;
    

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

    fetchData(projectID);
};