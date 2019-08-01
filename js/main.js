function setExpandableHover() {
  document.querySelectorAll(".expandable").forEach(div => {
    div.addEventListener('mouseover', () => {
      div.classList.add('is-hovered');
    });
    div.addEventListener('mouseout', () => {
      div.classList.remove('is-hovered');
    })
  })
}

function toggleNoHeight() {
  document.querySelector("#main-panels").classList.toggle('no-height');
  document.querySelector(".pop-up").classList.toggle('no-height');
}

function meOpenClose() {


  document.querySelector("a.me").addEventListener('click', toggleNoHeight);
  document.querySelector(".pop-up>h2").addEventListener('click', toggleNoHeight);
}

function createRepoEl(repo) {
  let div = document.createElement("div");
  div.innerHTML = `<h3><a href="${repo.html_url}">${repo.name}</a></h3>
  <span><a href="${repo.html_url}">${repo.description}</a></span>`;
  return div;
}

async function recentRepos() {
  const githubPanel = document.querySelector(".github")
  const response = await fetch('https://api.github.com/users/cole-maguire/repos');
  const repos = await response.json();

  //We only want the first four most recently updateds, for space reasons
  let reposByDate = Array.from(repos).sort((a, b) => {
    let dateA = new Date(a.pushed_at);
    let dateB = new Date(b.pushed_at);
    return dateB - dateA;
  });
  reposByDate.slice(0, 3).forEach(repo => githubPanel.append(createRepoEl(repo)));

}

window.onload = () => {
  console.info("This was all written by hand - no need for heavyweight frameworks here.")
  recentRepos();
  setExpandableHover();
  meOpenClose();
}