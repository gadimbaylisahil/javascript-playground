const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    // get input text
    const github = new Github();
    const ui = new UI();
    const userText = e.target.value;
    if(userText !== ''){
        // Make HTTP Call
        github.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found'){
                    ui.clearAlert();
                    ui.showAlert('User not found!', 'alert alert-danger');
                } else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            });
    } else {
        ui.clearProfile();
    }
});