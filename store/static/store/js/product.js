function productFilter() {
    return {
        selected: 'all',
        search: '',
        products: window.products || [],
        cart: [],

        // 🧠 Load saved cart when Alpine initializes
        init() {
            const saved = localStorage.getItem('cart');
            if (saved) {
                try {
                    this.cart = JSON.parse(saved);
                } catch (e) {
                    this.cart = [];
                }
            }
        },

        // ✅ Save cart to localStorage every time it changes
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        get filtered() {
            return this.products.filter(p => {
                const matchCategory = this.selected === 'all' || p.category__slug === this.selected;
                const matchSearch = p.name.toLowerCase().includes(this.search.toLowerCase());
                return matchCategory && matchSearch;
            });
        },

        addToCart(product) {
            const existing = this.cart.find(p => p.id === product.id);
            if (existing) {
                existing.qty += 1;
            } else {
                this.cart.push({ ...product, qty: 1 });
            }
            this.saveCart();  // 💾
        },

        increaseQty(productId) {
            const item = this.cart.find(p => p.id === productId);
            if (item) {
                item.qty += 1;
                this.saveCart();  // 💾
            }
        },

        decreaseQty(productId) {
            const index = this.cart.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.cart[index].qty -= 1;
                if (this.cart[index].qty <= 0) {
                    this.cart.splice(index, 1);
                }
                this.saveCart();  // 💾
            }
        },

        total() {
            return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
        }
    };
}
