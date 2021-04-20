/**
 * Add given links to the repo content
 * @param repoContent Content object (HTMLSpanElement) from decorateRepo
 * @param links Links to add
 */
function addRepoLinks(repoContent, links) {
    // Links
    if (links) {
        links.forEach(link => {
            const linkElem = document.createElement('a');

            if (Object.values(link).length > 0 && Object.keys(links).length > 0) {
                linkElem.setAttribute('target', '_blank');
                linkElem.setAttribute('href', Object.values(link)[0]);
                linkElem.innerText = `(${Object.keys(link)[0]})`;

                linkElem.style.textDecoration = 'none';
                linkElem.style.color = 'grey';
                linkElem.style.fontStyle = 'italic';
                linkElem.style.marginLeft = '5px';
                linkElem.style.marginRight = '5px';

                // On mouse up turn light grey
                linkElem.addEventListener('mouseover', () => {
                    linkElem.style.color = 'lightgrey';
                })

                // On mouse out turn back grey
                linkElem.addEventListener('mouseleave', () => {
                    linkElem.style.color = 'grey';
                })

                repoContent.appendChild(linkElem);
            }
        })
    }
}

/**
 * Create the repo main link and decorate it
 * @param repo Github repo
 * @param links Links to add (facultative)
 * @param description If set on true, will show project descriptions
 * @returns {HTMLSpanElement}
 */
function decorateRepo(repo, links, description) {
    const content = document.createElement('span');
    const link = document.createElement('a');

    // Archived repo
    if (repo.archived) {
        const archivedText = document.createElement('span');

        archivedText.style.fontStyle = 'italic';
        archivedText.style.marginRight = '5px';
        archivedText.innerText = '(archived)';

        content.appendChild(archivedText);
    }

    link.setAttribute('href', repo.html_url);
    link.innerText = repo.name;

    // Add main link
    content.appendChild(link);

    // Add links
    addRepoLinks(content, links);

    // Show description
    if(description && repo.description != null) {
        const descText = document.createElement('span');

        descText.style.marginLeft = '5px';
        descText.innerText = repo.description;

        content.appendChild(descText);
    }


    return content;
}

/**
 * Create the repo list element (li)
 * @param repo Github repo
 * @param links Links to add (facultative)
 * @param description If set on true, will show project descriptions
 * @returns {HTMLLIElement}
 */
function repoListElement(repo, links, description) {
    const content = decorateRepo(repo, links, description);
    const element = document.createElement('li');

    element.appendChild(content);

    return element;
}

/**
 * List github repos to the provided list
 * @param list Ul element to list repos
 * @param links Links to add for each repos (facultative)
 * @param description If set on true, will show project descriptions
 */
function listRepos(list, repos, links, description) {
    if (!list && !list.append) return false;

    repos.forEach(repo => {
        const { name } = repo;
        const listElement = repoListElement(repo, links[name] ? links[name] : null, description);

        list.append(listElement);
    });
}

const links = {
    "AtilaCalculatorSoftware": [{
        "doc": "https://xisabla.github.io/AtilaCalculatorSoftware/doc/"
    }],

    "copy-assets": [{
        "npm": "https://www.npmjs.com/package/copy-assets"
    }],
    
    "DAUville": [{
        "doc": "https://xisabla.github.io/DAUville/#detailed-documentation"
    }, {
        "website": "https://xisabla.github.io/DAUville"
    }],

    "Dekad": [{
        "releases": "https://github.com/Xisabla/Dekad/releases"
    },
        {
            "wiki": "https://github.com/Xisabla/Dekad/wiki"
        }
    ],

    "GalenaCpp": [{
        "doc": "https://github.com/Xisabla/GalenaCpp/blob/v2/doc/doc-fr.md"
    }],

    "Korbots": [{
        "doc": "https://github.com/Xisabla/Korbots/tree/master/doc"
    }],

    "Turtle-Drawer": [{
        "doc": "https://github.com/Xisabla/Turtle-Drawer/blob/master/doc/markdown/TurtleDrawing.md"
    }],

    "xisabla.github.io": [{
        "website": "https://xisabla.github.io/"
    }]

}

const showcasing = [
    'AtilaCalculatorSoftware',
    'CombaTiment',
    'copy-assets',
    'DAUville',
    'Dekad',
    'Korbots',
    'xisabla.github.io'
];

fetch('https://api.github.com/users/Xisabla/repos')
    .then((res) => res.json())
    .then((repos) => {
        const listShowcase = document.querySelector('#showcase ul');
        const listAll = document.querySelector('#repos ul');
        const showcase = repos.filter(repo => showcasing.includes(repo.name))

        listRepos(listShowcase, showcase, links, true);
        listRepos(listAll, repos, links);
    })
