const PageState = function(){
    let currentState = new HomeState(this);
    this.init = function () {
        this.change(new HomeState);
    };
    this.change = function (state) {
        currentState = state;
    }
};

// Home State
const HomeState = function (page) {
    document.querySelector('#heading').textContent = null;
    document.querySelector('#content').innerHTML =`<div class="jumbotron">
                                                      <h1 class="display-4">Hello, world!</h1>
                                                      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                                                      <hr class="my-4">
                                                      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                                                      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                                                    </div>` ;
};

// About State
const AboutState = function (page) {
    document.querySelector('#heading').textContent = 'About Us';
    document.querySelector('#content').innerHTML =`<p>This is about page</p>` ;
};

// Contact State
const ContactState = function (page) {
    document.querySelector('#heading').textContent = 'Contact Us';
    document.querySelector('#content').innerHTML =`<p>This is contact page</p>` ;
};

// instantiate pageState
const page = new PageState();
page.init();

// UI Vars
const home = document.getElementById('home'),
      about = document.getElementById('about'),
      contact = document.getElementById('contact');

// Event Listeners
home.addEventListener('click', (e) => {
    page.change(new HomeState());
    e.preventDefault();
});

about.addEventListener('click', (e) => {
    page.change(new AboutState());
    e.preventDefault();
});

contact.addEventListener('click', (e) => {
    page.change(new ContactState());
    e.preventDefault();
});

