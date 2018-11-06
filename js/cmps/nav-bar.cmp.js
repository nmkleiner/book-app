export default {
  template: `
    <nav class="nav-bar d-flex">
        <div class="link">
            <router-link exact to="/"><i class="fas fa-home"></i></router-link>
        </div>
        <div class="link">
            <router-link exact to="/books">Book Shop</router-link>
        </div>
        <div class="link">        
            <router-link exact to="/about">About</router-link>
        </div>
    </nav>
    `
};
