{
  addYear()
  loopProjects()
}

let index = 1

function addYear() {
  const footer = document.getElementById("footer")
  footer.innerText = `${footer.innerText} ${new Date().getFullYear()}`
}

function loopProjects() {
  const PROJECTS = [
    {
      name: "Nextfile",
      description: "Modern HTTP file directory made with Next.js and MUI",
      link: "https://github.com/Maxtremee/Nextfile",
      image: "assets/nextfile.jpeg",
    },
    {
      name: "oods",
      description: "Object Oriented Database System",
      link: "https://github.com/Maxtremee/oods",
      image: "assets/oods.jpeg",
    },
  ]

  if (document.getElementById("project-wrapper")) {
    setProject(PROJECTS[0])
    setInterval(() => {
      if (index === PROJECTS.length) {
        index = 0
      }
      setProject(PROJECTS[index])
      index += 1
    }, 10_000)
  }
}

function setProject({ name, description, link, image }) {
  const background = document.getElementById("project-image")
  const desc = document.getElementById("project-desc")
  background.style.backgroundImage = `url('${image}')`
  // background.classList.add("image-animation")
  desc.innerHTML = `<a id="project-link" class="hover" href="${link}" target="_blank">${name}</a><div style="font-size: small;">${description}</div>`
}
