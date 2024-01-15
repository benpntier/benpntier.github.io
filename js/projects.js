let projectsData = [];
let filters = [];
let startFilter = false;

function addProjectHTML(project) {

    if (project.category == "pro") {
        const proLogo = document.createElement("img");
        proLogo.src = project.logo_url;
        proLogo.alt = project.logo_alt;
        proLogo.className = "pro__img";

        const proName = document.createElement("h4");
        proName.className = "no-margin";
        proName.innerHTML = "<b>" + project.name + "</b>, " + project.company;

        const proDates = document.createElement("p");
        proDates.classList.add("projects__dates", "no-margin");
        proDates.innerText = project.dates

        const proInfo = document.createElement("div");
        proInfo.className = "projects__info";
        proInfo.appendChild(proName);
        proInfo.appendChild(proDates);

        const proHeader = document.createElement("div");
        proHeader.className = "pro__header";
        proHeader.appendChild(proLogo);
        proHeader.appendChild(proInfo);

        const proDesc = document.createElement("p");
        proDesc.classList.add("pro__desc", "no-margin");
        proDesc.innerHTML = project.desc;

        const proTags = document.createElement("div");
        proTags.className = "tags";
        for (var t=0; t < project.tags_short.length; t++) {
            var tag = document.createElement("span");
            tag.className = project.tags_colors_short[t];
            tag.innerText = project.tags_short[t];
            proTags.appendChild(tag);
        }

        const proArticle = document.createElement("article");
        proArticle.classList.add("projects__card", "pro__project");
        proArticle.appendChild(proHeader);
        proArticle.appendChild(proDesc);
        proArticle.appendChild(proTags);

        const proLink = document.createElement("a");
        proLink.href = "project.html?id=" + project.id;
        proLink.appendChild(proArticle);
        proLink.className = "projects__item";

        document.querySelector(".pro .projects__list").appendChild(proLink);

    } else if (project.category == "uni") {
        const uniLogo = document.createElement("img");
        uniLogo.className = "uni__img";
        uniLogo.alt = project.logo_alt;
        uniLogo.src = project.logo_url;

        const uniName = document.createElement("h4");
        uniName.className = "no-margin";
        uniName.innerHTML = project.name;

        const uniDates = document.createElement("p");
        uniDates.className = "projects__dates";
        uniDates.innerText = project.dates;

        const uniTags = document.createElement("div");
        uniTags.className = "tags";
        for (var t=0; t < project.tags_short.length; t++) {
            var tag = document.createElement("span");
            tag.className = project.tags_colors_short[t];
            tag.innerText = project.tags_short[t];
            uniTags.appendChild(tag);
        }

        const uniInfo = document.createElement("div");
        uniInfo.appendChild(uniName);
        uniInfo.appendChild(uniDates);
        uniInfo.appendChild(uniTags);


        const uniArticle = document.createElement("article");
        uniArticle.classList.add("projects__card", "uni__project");
        uniArticle.appendChild(uniLogo);
        uniArticle.appendChild(uniInfo);

        const uniLink = document.createElement("a");
        uniLink.href = "project.html?id=" + project.id;
        uniLink.appendChild(uniArticle);
        uniLink.className = "projects__item";
        if (!uniLink.classList.contains("no-delay") && startFilter) {
            uniLink.classList.add("no-delay")
        }

        document.querySelector(".uni .projects__list").appendChild(uniLink);

    } else if (project.category == "art") {

        const artLogo = document.createElement("img");
        artLogo.className = "art__img";
        artLogo.alt = project.logo_alt;
        artLogo.src = project.logo_url;

        const artName = document.createElement("h4");
        artName.className = "no-margin";
        artName.innerHTML = project.name;

        const artDates = document.createElement("p");
        artDates.className = "projects__dates";
        artDates.innerText = project.dates;

        const artDesc = document.createElement("p");
        artDesc.classList.add("art__desc", "no-margin");
        artDesc.innerHTML = project.desc;

        const artInfo = document.createElement("div");
        artInfo.className = "projects__info";
        artInfo.appendChild(artName);
        artInfo.appendChild(artDates);
        artInfo.appendChild(artDesc);

        const artArticle = document.createElement("article");
        artArticle.classList.add("projects__card", "art__project");
        artArticle.appendChild(artLogo);
        artArticle.appendChild(artInfo);

        const artLink = document.createElement("a");
        artLink.href = "project.html?id=" + project.id;
        artLink.appendChild(artArticle);
        artLink.className = "projects__item";

        document.querySelector(".art .projects__list").appendChild(artLink);
    }
}

function fetchData() {
	fetch("data/projects.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            projectsData = data;
            for (project of projectsData) {
                addProjectHTML(project);
            }
            
        })
}

let webTags = ["JavaScript", "PHP", "Sass", "Node.js", "React"];
let dlTags = ["CNN", "MLP", "Machine Learning"];

function getTag(tag) {

    if (webTags.includes(tag)) {
        return "Web";
    } else if (dlTags.includes(tag)) {
        return "Deep Learning";
    } else {
        return tag;
    }
}

function filterProjects(event) {

    startFilter = true;

    if (event.target.classList.contains("selected")) {
        event.target.classList.remove("selected");
        filters.splice(filters.indexOf(event.target.innerText), 1);
    } else {
        event.target.classList.add("selected");
        filters.push(event.target.innerText);
    }

    var projectsData_filter = projectsData.filter(p => p.category == "uni" && filters.some(filter => p.tags_short.includes(filter)));

    if (filters.length == 0) {
        projectsData_filter = projectsData.filter(p => p.category == "uni");
    }

    document.querySelector(".uni .projects__list").innerHTML = "";
    for (project of projectsData_filter) {
        addProjectHTML(project);
    }
}

function filterTagsHover(event) {
    let projectTags = document.querySelectorAll(".uni .projects__item .tags span");
    for (tag of projectTags) {
        let tagText = getTag(tag.innerText);
        let parentProject = tag.parentNode.parentNode.parentNode;
        let projectImage = parentProject.querySelector(".uni__img");

        if (tagText != event.target.innerText) {
            tag.classList.add("nonhoverfilter");
            if (!parentProject.classList.contains("hover")) {
                parentProject.classList.add("uni__project--nonhover");
                projectImage.style.filter = "grayscale(1) opacity(.7)";
                projectImage.style.transition = "all .3s"
            }
        } else {
            if (!parentProject.classList.contains("hover"))
                parentProject.classList.add("hover");
            if (parentProject.classList.contains("uni__project--nonhover")) {
                parentProject.classList.remove("uni__project--nonhover");
                projectImage.style.filter = "none";
                projectImage.style.transition = "all .3s"
            }
        }
    }
}

function filterTagsReset() {
    let projectTags = document.querySelectorAll(".uni .projects__item .tags span");
    for (tag of projectTags) {
        let parentProject = tag.parentNode.parentNode.parentNode;
        let projectImage = parentProject.querySelector(".uni__img");
        if (tag.classList.contains("nonhoverfilter")) {
            tag.classList.remove("nonhoverfilter");
            if (parentProject.classList.contains("uni__project--nonhover")) {
                parentProject.classList.remove("uni__project--nonhover");
                projectImage.style.filter = "none";
            }

        } else {
            parentProject.classList.remove("hover");
        }
    }
}

window.onload = function() {
    fetchData();

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            //entry.target.style.opacity = entry.intersectionRatio;
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("pro") && entry.intersectionRatio >= 0.4) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("uni") && entry.intersectionRatio >= 0.15) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("art") && entry.intersectionRatio >= 0.5) {
                    entry.target.classList.add('onview-animation');
                }
            }

        });
    }, {
        root: null,
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      });
    const sections = document.querySelectorAll('.show-on-scroll')
    sections.forEach(section => {
        observer.observe(section)
    })
    
    document.querySelectorAll(".filter .tags span").forEach(tag => {
        tag.addEventListener("click", filterProjects)
        tag.addEventListener("mouseover", filterTagsHover)
        tag.addEventListener("mouseout", filterTagsReset)
    });
};