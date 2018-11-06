import eventBus, { SHOW_USER_MSG } from "../event-bus.js";

export default {
  template: `
    <section class="book-filter d-flex flex-column">
      <button class="btn btn-danger align-self-end" @click="closeFilter">X</button>
        <h3>Filter by:</h3>
        <form v-on:submit.prevent="setFilter" class="d-flex flex-column align-items-center">
        <div class="inputs-container d-flex  flex-column align-items-center flex-md-row justify-content-md-between">
          <label class="d-flex flex-column">Title: <input type="text" v-model.trim="filter.byTitle" placeholder="Filter by title"></label class="d-flex flex-column">
          <label class="d-flex flex-column">Minimum Price: <input type="text" v-model.number="filter.minPrice" title="Show only books priced above.."></label class="d-flex flex-column">
          <label class="d-flex flex-column">Maximum Price: <input type="text" v-model.number="filter.maxPrice" title="Show only books priced under.."></label class="d-flex flex-column">
        </div>    
          <button class="btn btn-sm btn-success">Filter</button>
        </form>
    </section>
    `,
  data() {
    return {
      filter: {
        byTitle: "",
        minPrice: 0,
        maxPrice: Infinity
      }
    };
  },
  methods: {
    setFilter() {
      this.$emit("filtered", this.filter);
      eventBus.$emit(SHOW_USER_MSG, { txt: "List filtered.", type: "success" });
    },
    closeFilter() {
      this.$emit('close-filter')
    }
  },
  computed: {}
};
