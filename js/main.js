function setExpandableHover() {
  const selector = window.matchMedia('(hover:hover) and (pointer: fine)').matches ? ".expandable" : ".other";

  document.querySelectorAll(selector).forEach(div => {

    const toggle = () => { div.classList.toggle('is-hovered'); }

    div.addEventListener('mouseover', toggle);
    div.addEventListener('mouseout', toggle);
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
  /* Truncate descriptions to prevent silly looking, unbalanced divs. 
  This is technically open to all sorts of unicode truncation jank, 
  but given that I'm the one writing the descriptions, we'll call it an acceptable edgecase */
  let description = repo.description || ""
  if (description.length >= 75) {
    description = repo.description.substring(0, 75) + '...'
  }

  let row = document.createElement("tr");
  row.innerHTML = `<th><a href="${repo.html_url}">${repo.name}</a></th>
                  <td><a href="${repo.html_url}">${description}</a></td>`;
  return row;
}

async function recentRepos() {
  const githubPanel = document.querySelector(".github>table>tbody")
  const response = await fetch('https://api.github.com/users/cole-maguire/repos');
  const repos = await response.json();

  //We only want the first four most recently updated, for space reasons
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