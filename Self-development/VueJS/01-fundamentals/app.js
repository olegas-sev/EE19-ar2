Vue.createApp({
    data() {
        return {
            myHtml: '<h1>Vue 3 application</h1>',
            title: 'Im Olegas!',
            person: {
                firstName: 'Olegas',
                lastName: 'Sevcenko',
                age: 18
            },
            items: [1, 2]
        }
        },
    methods:{
        addItem() {
            if (this.$refs.myInput.value !== '') {
                this.items.unshift(this.$refs.myInput.value)
                this.$refs.myInput.value = ''
            } else {
                console.warn('Input is empty')
            }
        }
    },
    computed: {
        evenItems() {
            return this.items.filter(i => i % 2 === 0)
        }
    }
}).mount('#app')

