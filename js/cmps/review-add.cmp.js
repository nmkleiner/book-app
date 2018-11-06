import fiveStars from "../cmps/five-stars.cmp.js";
import { utilService } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";

export default {
  props:['book'],
  template: `
      <section :class="{'review-add': isAddReview}">
      <button class="btn btn-primary" v-if="!isAddReview" @click="isAddReview = !isAddReview">Add review</button>
      <template v-if="isAddReview">
        
        <h3>Please add a good review.</h3>
        <form action="" class="d-flex flex-column align-items-center" @submit.prevent="addReview">
          
          <five-stars @rank-given="getRank"></five-stars>
          <input type="text" ref="user" v-model.lazy="review.userName">
          <input type="date" v-model.lazy="review.date">
          <textarea v-model.trim.lazy="review.text"></textarea>
          <button class="btn btn-md btn-primary">Submit review</button>
        </form>
      </template>
    </section>
    `,
  components: {
    fiveStars
  },
  methods: {
    getRank(stars) {
      this.review.stars = stars;
    },
    
    addReview() {
      this.isAddReview = false;
      var review = Object.assign({}, this.review)
      bookService.addReview(this.book.id, review);
      this.$emit('new-review')
    },
  },
  data() {
    return {
      isAddReview: false,
      review: {
        text: "",
        date: null,
        userName: "Books Reader",
        stars: "",
        id: null
      }
    };
  },
  created() {
    this.review.date = new Date().toDateInputValue();
  },
  mounted() {
    
  },
  watch: {
    isAddReview: function() {
      if (this.isAddReview) {
        setTimeout(() => {
          var userInput = this.$refs.user;
          userInput.focus();
        },100)
      }
    }
  }
};

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
