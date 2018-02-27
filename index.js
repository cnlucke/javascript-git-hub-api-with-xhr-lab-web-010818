document.addEventListener("DOMContentLoaded", function(event) {
  // const main = document.getElementById('main')
  // main.addEventListener('click', )
  const form = document.getElementById('username');
  form.onsubmit = function(event) {
    event.preventDefault();
    getRepositories(event);
  }
})

function getRepositories(event) {
  const input = event.target.getElementsByTagName('input')[0]
  const owner = input.value;
  input.value = "";
  // GET /users/:username/repos
  const url = `https://api.github.com/users/${owner}/repos`

  fetch(url, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json())
    .then(json => showRepositories(json));
}

function showRepositories(json) {
  const results = document.getElementById('repositories');
  const resultsTag = document.createElement('ul');
  for (let i = 0; i < json.length; i++) {
    const li = document.createElement('li');
    let repoLink = `<a href="${json[i]["html_url"]}" target="_blank">${json[i]["name"]}</a>`;
    const getCommitsLink = ` - <a href="#" data-commits-url="${json[i]["commits_url"]}" id="getCommits" onclick="getCommits(this)">Get Commits</a>`;
    repoLink += getCommitsLink;
    li.innerHTML = repoLink;
    resultsTag.appendChild(li);
  }
  results.appendChild(resultsTag);
}

function getCommits(getCommit) {
  const url = (getCommit.dataset.commitsUrl).split('{')[0];
  // GET /repos/:owner/:repo/commits
  fetch(url, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json())
    .then(json => displayCommits(json));
}

function displayCommits(json) {
  console.log(json);
}

function getToken() {
  return 'b68e1ee9004f90e1e36448d70626682d9412a0fb'
  // return ''
}
