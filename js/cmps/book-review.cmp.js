export default {
  props: ["review","idx"],
  template: `
    <section class="book-review">
        <span>
          <span class="date">{{review.date}}</span>  
          <span class="name">{{review.userName}}</span>
          gave the book 
          <span v-if="!(review.stars === 1)" :class="{'green-text': isGoodReview, 'red-text': isBadReview}">
          {{review.stars}} stars
          </span>
          <span v-else :class="{'green-text': isGoodReview, 'red-text': isBadReview}">
          {{review.stars}} star
          </span>
          and added: "{{review.text}}".
        </span>
        <button class="btn btn-sm btn-danger" @click="deleteReview">X</button>
    </section>`,
  methods: {
    deleteReview() {
      this.$emit("delete-review");
    },
    
  },
  computed: {
    isGoodReview() {
      return this.review.stars > 3;
    },
    isBadReview() {
      return this.review.stars < 3;
    }
  }
};
