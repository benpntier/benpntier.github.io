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

        if (project.comment != undefined) {
            const proRef = document.createElement("i");
            proRef.classList.add("fa-solid", "fa-quote-left", "pro__reficon");
    
            const proFooter = document.createElement("div");
            proFooter.className = "pro__footer";
            proFooter.appendChild(proTags);
            proFooter.appendChild(proRef);

            proArticle.appendChild(proFooter);
        } else {
            proArticle.appendChild(proTags);
        }
        proArticle.classList.add("projects__accent--"+project.tag_accent);

        const proLink = document.createElement("a");
        proLink.href = "project.html?id=" + project.id;
        proLink.appendChild(proArticle);
        proLink.className = "projects__item";

        document.querySelector(".pro .projects__list").appendChild(proLink);

    } else if (project.category == "uni") {
        const uniLogo = document.createElement("img");
        uniLogo.className = "uni__img";
        uniLogo.alt = project.logo_alt;
        if (project.icon_url != undefined) {
            uniLogo.src = project.icon_url;
        } else {
            uniLogo.src = project.logo_url;
        }

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
        uniArticle.classList.add("projects__accent--"+project.tag_accent);

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

    } else if (project.category == "perso") {
        const persoLogo = document.createElement("img");
        persoLogo.className = "perso__img";
        persoLogo.alt = project.logo_alt;
        persoLogo.src = project.logo_url;

        const persoName = document.createElement("h4");
        persoName.className = "no-margin";
        persoName.innerHTML = project.name;

        const persoDates = document.createElement("p");
        persoDates.className = "projects__dates";
        persoDates.innerText = project.dates;

        const persoTags = document.createElement("div");
        persoTags.className = "tags";
        for (var t=0; t < project.tags_short.length; t++) {
            var tag = document.createElement("span");
            tag.className = project.tags_colors_short[t];
            tag.innerText = project.tags_short[t];
            persoTags.appendChild(tag);
        }

        const persoInfo = document.createElement("div");
        persoInfo.appendChild(persoName);
        persoInfo.appendChild(persoDates);
        persoInfo.appendChild(persoTags);

        const persoArticle = document.createElement("article");
        persoArticle.classList.add("projects__card", "perso__project");
        persoArticle.appendChild(persoLogo);
        persoArticle.appendChild(persoInfo);
        persoArticle.classList.add("projects__item"); // remove when link implemented
        persoArticle.classList.add("projects__accent--"+project.tag_accent);

        if (project.page) {
            const persoLink = document.createElement("a");
            persoLink.href = "project.html?id=" + project.id;;
            persoLink.appendChild(persoArticle);
            persoLink.className = "projects__item";
            document.querySelector(".perso .projects__list").appendChild(persoLink);
        } else {
            document.querySelector(".perso .projects__list").appendChild(persoArticle);
        }
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

let webTags = ["JavaScript", "PHP", "Sass", "Node.js", "React", "WordPress"];
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
            }
        } else {
            if (!parentProject.classList.contains("hover"))
                parentProject.classList.add("hover");
            if (parentProject.classList.contains("uni__project--nonhover")) {
                parentProject.classList.remove("uni__project--nonhover");
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
            }

        } else {
            parentProject.classList.remove("hover");
        }
    }
}

window.onload = function() {

    var encodedEmail = "YmVub2l0LnBudGllckBnbWFpbC5jb20=";
    const emailButton = document.getElementById("contact");
    emailButton.setAttribute("href", "mailto:".concat(atob(encodedEmail)));

    fetchData();

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            //entry.target.style.opacity = entry.intersectionRatio;
            if (screen.width > 1450) {
                if (entry.target.classList.contains("pro") && entry.intersectionRatio >= 0.4) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("edu") && entry.intersectionRatio >= 0.3) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("perso") && entry.intersectionRatio >= 0.6) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("uni") && entry.intersectionRatio >= 0.2) {
                    entry.target.classList.add('onview-animation');
                }
                if (entry.target.classList.contains("art") && entry.intersectionRatio >= 0.3) {
                    entry.target.classList.add('onview-animation');
                }
            } else if (screen.width < 1450 && screen.width > 650 && entry.isIntersecting) {
                entry.target.classList.add('onview-animation', 'onview-animation--next');
            } else if (entry.isIntersecting) {
                entry.target.classList.add('onview-animation');
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