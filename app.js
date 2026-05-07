async function loadProjects(){

    const res = await fetch("/api/projects");

    const data = await res.json();

    const box = document.getElementById("projectsList");

    box.innerHTML = "";

    document.getElementById("projectsCount").innerText = data.length;

    let users = [];

    data.forEach(project => {

        if(!users.includes(project.username)){
            users.push(project.username);
        }

        box.innerHTML += `
        
        <div class="project">

            <h3>${project.name}</h3>

            <p>User: ${project.username}</p>

            <a href="${project.link}" target="_blank">
                Open Project
            </a>

            <br><br>

            <button onclick="deleteProject(${project.id})">
                Delete
            </button>

        </div>
        
        `;
    });

    document.getElementById("usersCount").innerText = users.length;
}

async function addProject(){

    const username = document.getElementById("username").value;
    const project = document.getElementById("project").value;
    const link = document.getElementById("link").value;

    await fetch("/api/projects",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            name:project,
            link
        })
    });

    loadProjects();
}

async function deleteProject(id){

    await fetch("/api/projects/" + id,{
        method:"DELETE"
    });

    loadProjects();
}

loadProjects();
