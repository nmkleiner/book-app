import { utilService } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";
// import { storageService } from "../services/storage.service.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import bookReview from "../cmps/book-review.cmp.js";

export default {
  template: `
    <section class="book-details d-flex flex-column" v-if="book">
      <div class="btn-container d-flex justify-content-between">
        <button class="btn btn-warning" @click="backToList"><i class="fas fa-arrow-left"></i></button>
        <div class="prev-next-container d-flex">
          <button class="btn btn-dark"><router-link :to="'/book/'+prevBookId">Previous Book</router-link></button>
          <button class="btn btn-dark"><router-link :to="'/book/'+nextBookId">Next Book</router-link></button>
        </div>
      </div>

        
      <div class="details-container d-flex justify-content-between">
        <div class="details-text-container d-flex flex-column">

          <h2>{{book.volumeInfo.title}}</h2>
          <h3>{{book.volumeInfo.subtitle}}</h3>
          <h3 class="on-sale" v-if="book.saleInfo.saleability === 'FOR_SALE'">Only today Only today Sale ends soon!</h3>
          
          <span>By: 
            <span v-for="author in book.volumeInfo.authors">{{author}} </span>
          </span>
          <h3 v-if="book.saleInfo.listPrice" :class="{'green-text': isCheap, 'red-text': isExpensive}">{{currencySymbol}}{{book.saleInfo.listPrice.amount}}</h3>
          <h3 v-if="!book.saleInfo.listPrice" class="red-text">This book is not for sale.</h3>
          
          <h3 v-if="!!book.volumeInfo.description && !isLongDescription || isShowMore">Description: {{book.volumeInfo.description}}</h3>
          <h3 v-if="!!book.volumeInfo.description && isLongDescription && !isShowMore">Description: {{shortDescription}}...</h3>
          <button class="btn btn-warning show-more" v-if="isLongDescription" @click="isShowMore = !isShowMore">{{showMoreOrLess}}</button>
          
          <span>Categories: 
            <span v-for="category in book.volumeInfo.categories">{{category}} </span>
          </span>
          
          <h3>Pages: {{book.volumeInfo.pageCount}} {{bookDiff}}</h3>
          <h3>Language: {{book.volumeInfo.language}}</h3>
          <h3>Published: {{book.volumeInfo.publishedDate}}{{bookAge}}</h3>
        </div>
        <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"/>
        </div>

      <div class="add-review-container">

          <review-add :book="book" @new-review="loadBookData"></review-add>
      </div>
      <div v-if="reviews" class="reviews-container">
          <book-review @delete-review="deleteReview(idx)" v-for="(currReview,idx) in reviews" :idx="idx" :review="currReview"></book-review>
      </div>
    </section>
    `,
  components: {
    reviewAdd,
    bookReview,
  },
  created() {
    this.loadBookData(); 

    bookService.getBookById(this.$route.params.bookId).then(book => {
      this.book = book;
      this.reviews = this.book.reviews;
    });
    
  },
  data() {
    return {
      isShowMore: false,
      book: null,
      reviews: null,
      prevBookId: null,
      nextBookId: null
    };
  },

  methods: {
    loadBookData() {
      const bookId = this.$route.params.bookId;
      bookService.getBookById(bookId)
      .then(book => {
        this.book = book;
        this.reviews = book.reviews;
      })

      bookService.nextBook(bookId)
      .then(nextBook => this.nextBookId = nextBook.id)

      bookService.prevBook(bookId)
      .then(prevBook => this.prevBookId = prevBook.id)
    },
    backToList() {
      this.$router.push("/books");
    },
    deleteReview(reviewIdx) {
      bookService.removeReview(reviewIdx, this.book.id);
    },
  },

  computed: {
    showMoreOrLess() {
      return this.isShowMore ? "Show less" : "Show more";
    },
    currencySymbol() {
      var currencyCode = this.book.saleInfo.listPrice.currencyCode;
      return utilService.getCurrencySymbol(currencyCode);
    },
    bookDiff() {
      var diff = "";
      if (this.book.volumeInfo.pageCount > 500) {
        diff = "- Long reading.";
      } else if (this.book.volumeInfo.pageCount > 200) {
        diff = "- Decent reading.";
      } else if (this.book.volumeInfo.pageCount < 100) {
        diff = "- Light reading.";
      }
      return diff;
    },
    bookAge() {
      var age;
      if (moment().format("YYYY") - this.book.volumeInfo.publishedDate > 10) {
        age = " - Veteran book";
      } else if (
        moment().format("YYYY") - this.book.volumeInfo.publishedDate <=
        1
      ) {
        age = " - New!";
      }
      return age;
    },
    isCheap() {
      return this.book.saleInfo.listPrice.amount < 20;
    },
    isExpensive() {
      return this.book.saleInfo.listPrice.amount > 150;
    },
    isLongDescription() {
      if (!this.book.volumeInfo.description) return;
      return this.book.volumeInfo.description.length > 100;
    },
    shortDescription() {
      if (!this.book.volumeInfo.description) return;
      return this.book.volumeInfo.description.slice(0, 100);
    }
  },
  watch: {
      '$route.params.bookId': function (id, prevValue) {
          console.log('Watch - ROUTE PARAM WAS CHANGED', id, 'PREV:', prevValue);
          this.loadBookData();
      }
  }
};
