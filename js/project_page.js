function addProjectInfo(project) {

    const titleHTML = document.querySelector("title");
    titleHTML.innerText = project.logo_alt + " | Benoît Pannetier";

    const navPrevious = document.querySelector(".nav-prev");
    if (project.prev !== undefined) {
        navPrevious.href = "project.html?id="+project.prev;
    } else {
        navPrevious.classList.add("project__navigation--hidden");
    }

    const navNext = document.querySelector(".nav-next");
    if (project.next !== undefined) {
        navNext.href = "project.html?id="+project.next;
    } else {
        navNext.classList.add("project__navigation--hidden");
    }

    let projectLogo = document.querySelector(".project__logo");
    if (project.category != "art") {
        projectLogo.src = project.logo_url;
        projectLogo.alt = project.logo_alt;
    } else {
        projectLogo.remove();
    }
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
        document.querySelector(".project__context").innerHTML = "<i class='project__icon fa-solid fa-graduation-cap' title='Contexte'></i> " + project.context;
    }
    if (project.city !== undefined) {
        document.querySelector(".project__city").innerHTML = "<i class='project__icon fa-solid fa-location-dot' title='Ville'></i> " + project.city;
    }
    if (project.solo !== undefined) {
        document.querySelector(".project__solo").innerHTML = "<i class='project__icon fa-solid fa-user' title='Autonomie'></i> " + project.solo;
    }
    if (project.team !== undefined) {
        document.querySelector(".project__team").innerHTML = "<i class='project__icon fa-solid fa-user-group' title='Equipe'></i> " + project.team;
    }
    if (project.dataset !== undefined) {
        document.querySelector(".project__dataset").innerHTML = "<i class='project__icon fa-solid fa-database' title='Dataset'></i> " + project.dataset;
    }
    if (project.grade !== undefined) {
        document.querySelector(".project__grade").innerHTML = "<i class='project__icon fa-solid fa-medal' title='Note finale'></i> " + project.grade;
    }
    if (project.comment !== undefined) {
        document.querySelector(".project__comment").innerHTML = "<i class='project__icon fa-solid fa-quote-left' title='Recommandation'></i> " + project.comment;
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
    if (projectTags !== undefined) {
        for (var t=0; t < projectTags.length; t++) {
            var tag = document.createElement("span");
            tag.className = projectTagsColors[t];
            tag.innerText = projectTags[t];
            proTags.appendChild(tag);
        }
    }

    const projectGallery = document.createElement("div");
    projectGallery.classList.add("project__gallery", "project__gallery--"+project.nb_columns);

    if (project.images_url !== undefined) {
    
        for (var i=0; i < project.images_url.length; i++){
            img_url = project.images_url[i];
            var projectImage = document.createElement("img");
            projectImage.className = "project__image";
            if (project.rounded) {
                projectImage.classList.add("rounded");
            }
            projectImage.src = img_url;
    
            var projectFigure = document.createElement("figure");
    
            if (project.images_caption !== undefined) {
                figcaption = project.images_caption[i];
                projectImage.alt = figcaption;
            } else if (project.images_alt !== undefined) {
                projectImage.alt = project.images_alt[i];
            }
    
            projectFigure.appendChild(projectImage);
    
            if (project.images_caption !== undefined) {
                var projectCaption = document.createElement("figcaption");
                projectCaption.innerText = figcaption;
                projectFigure.appendChild(projectCaption);
            }
            projectFigure.classList.add("no-margin", "project__gallery__img--"+project.nb_columns);
            projectGallery.appendChild(projectFigure);
        }
    }

    if (project.video !== undefined) {
        projectGallery.insertAdjacentHTML('beforeend', project.video);
    }

    const projectPage = document.querySelector(".project__page");
    projectPage.appendChild(projectGallery);

    if (project.additional_html !== undefined) {
        for (elementHTML of project.additional_html) {
            projectPage.innerHTML += elementHTML;
        }
    }

    if (project.external_url !== undefined) {
        const projectButton = document.createElement("div");
        projectButton.className = "project__button";
        
        const buttonLink = document.createElement("a");
        buttonLink.className = "project__link";
        buttonLink.href = project.external_url[0];
        buttonLink.target = "_blank";
        buttonLink.text = project.external_url[1];

        projectButton.appendChild(buttonLink);
        projectPage.appendChild(projectButton);
    }
}


function fetchData(id) {
	fetch("data/projects.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			projectsData = data;

            var project = projectsData.filter(p => p.id == id)[0];

            if (project == undefined) {
                document.querySelector(".project__title h2").innerHTML = "Oups ! Projet introuvable..."
            } else {
                addProjectInfo(project);
            }
		});
}

window.onload = function() {
    const projectURL = new URL(window.location.toLocaleString());
    const projectID = projectURL.searchParams.get('id');

    fetchData(projectID);
};