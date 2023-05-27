function addProjectInfo(project) {

    const projectNavigation = document.querySelector(".project__navigation");

    document.querySelector("a").href = "v2.html#"+project.category;

    if (project.prev !== undefined) {
        const navPrevious = document.createElement("a");
        navPrevious.href = "project.html?id="+project.prev;
        navPrevious.innerHTML = "<i class='fa-solid fa-arrow-left'></i>";
        projectNavigation.prepend(navPrevious)
    }

    if (project.next !== undefined) {
        const navNext = document.createElement("a");
        navNext.href = "project.html?id="+project.next;
        navNext.innerHTML = "<i class='fa-solid fa-arrow-right'></i>";
        projectNavigation.appendChild(navNext)
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
    if (projectTags !== undefined) {
        for (var t=0; t < projectTags.length; t++) {
            var tag = document.createElement("span");
            tag.className = projectTagsColors[t];
            tag.innerText = projectTags[t];
            proTags.appendChild(tag);
        }
    }

    const projectGallery = document.createElement("div");
    projectGallery.classList.add("gallery", "gallery--"+project.nb_columns);

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
    
            if (project.caption !== undefined) {
                figcaption = project.caption[i];
                projectImage.alt = figcaption;
            }
    
            projectFigure.appendChild(projectImage);
    
            if (project.caption !== undefined) {
                var projectCaption = document.createElement("figcaption");
                projectCaption.innerText = figcaption;
                projectFigure.appendChild(projectCaption);
            }
            projectFigure.classList.add("no-margin", "gallery__img--"+project.nb_columns);
            projectGallery.appendChild(projectFigure);
        }
    }

    if (project.video !== undefined) {
        projectGallery.insertAdjacentHTML('beforeend', project.video);
    }

    const projectPage = document.querySelector(".project__page");
    projectPage.appendChild(projectGallery);

    if (project.images_url_2 !== undefined) {

        if (project.inbetween_text !== undefined) {
            const projectInbetweenText = document.createElement("p");
            projectInbetweenText.className = "gallery__inbetween";
            projectInbetweenText.innerHTML = project.inbetween_text;
            projectPage.appendChild(projectInbetweenText);
        }

        for (var i=0; i < project.images_url_2.length; i++){
            img_url = project.images_url_2[i];
            var projectImage = document.createElement("img");
            projectImage.className = "project__image--inbetween";
            projectImage.src = img_url;
    
            var projectFigure = document.createElement("figure");
    
            projectFigure.appendChild(projectImage);
            projectFigure.classList.add("no-margin", "gallery", "gallery__img--"+project.images_url_2.length);
            projectPage.appendChild(projectFigure);
        }
    }

    if (project.external_url !== undefined) {
        const projectButton = document.createElement("div");
        projectButton.className = "project__button";
        
        const buttonLink = document.createElement("a");
        buttonLink.className = "project__link";
        buttonLink.href = project.external_url[0];
        buttonLink.text = project.external_url[1];

        projectButton.appendChild(buttonLink);
        projectPage.appendChild(projectButton);
    }
    
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