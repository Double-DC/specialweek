Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`  
    <div class="product">

        <div class="product-image">
            <img v-bind:src="image" alt="">
        </div>

        <div class="product-info">
            <h1> {{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }} </p>

            
                <p v-for="detail in details">{{ detail }}</p>
            
            <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }">
                <p @mouseover="updateProduct(index)">
                    {{ variant.variantVersion }}
                </p>
            </div>

            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                    >Add to Cart</button>



        </div>

        <div class="reviewbox">
        <product-review @review-submitted="addReview"></product-review>

        <div style="margin-left: 15%; float:left">
            <h2>
                Reviews
            </h2>
            <p v-if="!reviews.length"> 
                There are no reviews yet.
            </p>
            
                <p v-for="review in reviews">
                    {{ review.name }}<br>
                    Rating: {{ review.rating }} <br>
                    {{ review.review }}<br>           
                </p>    
       </div>
       </div>


    </div>

    `,
    data(){
        return {
            product: 'Dark Souls III',
            developer: 'From Software',
            selectedVariant: 0, 
            details: ["80% rage", "20% death", "100% difficult"],
            variants: [
                {
                    variantId: 2234,
                    variantVersion: "normal",
                    variantImage: 'darksouls.jpg',
                    variantColor: "grey",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantVersion: "goty",
                    variantImage: 'darksoulsgoty.jpg',
                    variantColor: "darkgrey",
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview(productReview){
            this.reviews.push(productReview )
        }
    },
    computed: {
        title() {
            return this.developer + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
    
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
            <p v-for="error in errors">{{ error }}</p>
    </p>



    <p>
        <label for ="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
        </select>
    </p>
        
    <p>
        <input type="submit" value="Submit">  
    </p>    

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }

        }
    }
})



var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})