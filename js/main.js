import bookApp from './pages/book-app.cmp.js'
import about from './pages/about-page.cmp.js'
import navBar from './cmps/nav-bar.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import routes from './routes.js'
import eventBus from './event-bus.js'

Vue.use(VueRouter);
const router = new VueRouter({routes})


new Vue ({
    el: '#app',
    router,
    data: {
        userMsg: null,
    },
    methods: {

    },
    components: {
        bookApp,
        navBar,
        about,
        userMsg
    }
})