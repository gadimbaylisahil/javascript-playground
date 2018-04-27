class Github{
    constructor(){
        // this.client_id = 'd9308aacf8b204d361fd';
        // this.client_secret = '';
        this.repos_count = 5;
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}`);
        const repoData = await repoResponse.json();
        const profileData = await profileResponse.json();
        return {
            profile: profileData,
            repos: repoData
        }
    }
}