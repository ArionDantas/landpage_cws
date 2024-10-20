const username = 'ArionDantas';
const token = 'ACCESS_KEY';

async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        const data = await response.json();

        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('username').innerHTML = `<a href="https://github.com/${data.login}" target="_blank">${data.login}</a>`;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
    }
}

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        const repos = await response.json();

        const reposList = document.getElementById('repos');
        reposList.innerHTML = ''; 

        repos.forEach(repo => {
            const li = document.createElement('li');

            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.textContent = repo.name;

            li.appendChild(link);
            reposList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

fetchGitHubProfile();
fetchGitHubRepos();
