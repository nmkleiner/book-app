import eventBus, { SHOW_USER_MSG } from "../event-bus.js";

export default {
  template: `
    <div class="user-msg" :class="msg.type" v-if="msg">
        <button class="btn btn-sm btn-bright" @click="closeMsg">X</button>
        <h2>{{msg.type}}</h2>
        <h3>{{msg.txt}}</h3>
        <a :href="msg.link">Go To Book: {{msg.link}}</a>
    </div>
    `,
  data() {
      return {
          msg: null
      }
  },
  created() {
    eventBus.$on(SHOW_USER_MSG, msg => {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    });
  },
  methods: {
    closeMsg() {
      this.msg = null;
    }
  }
};
