class UI{
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user){
        this.profile.innerHTML = `
            <div class="card card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
                    </div>
                    <div class="col-md-9">   
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-primary">Public Repos: ${user.public_gists}</span>
                        <span class="badge badge-primary">Public Repos: ${user.followers}</span>
                        <span class="badge badge-primary">Public Repos: ${user.following}</span>
                    </div>
                </div>
            </div>
        `;
    }

    showRepos(repos){
        let output = '';
        repos.forEach((repo) => {
           output += `
                <div class="card card-body mb-2">
                  <div class="row">
                    <div class="col-md-6">
                      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                    <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                    <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                    <span class="badge badge-success">Forks: ${repo.forms_count}</span>
                    </div>
                  </div>
                </div>
           `;
        });


        // append element
        document.getElementById('repos').innerHTML = output;
    }

    showAlert(msg, className){
        const alert = document.createElement('div');
        alert.className = className;
        alert.innerText = msg;

        document.querySelector('.searchContainer').appendChild(alert);
        setTimeout(this.clearAlert, 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if (currentAlert){
            currentAlert.remove();
        }
    }

    clearProfile(){
        this.profile.innerHTML = '';
    }
}