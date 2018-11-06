import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template: `
    <section class="book-list">
        <book-preview v-for="currBook in books" :key="currBook.id" v-bind:book="currBook"></book-preview>
    </section>
    `,
    components: {
        bookPreview,
    },
}