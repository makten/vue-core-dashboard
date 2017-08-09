import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
//Core components
import Utils from '../../core/Utils';


// @Component({
//     props: {
//         // Current Page
//         currentPage: {
//             type: Number,
//             required: true
//         },

//         // Total number of pages
//         totalPages: Number,

//         // Items per page
//         itemsPerPage: Number,

//         // Total items
//         totalItems: Number,

//         // Visible Pages
//         visiblePages: {
//             type: Number,
//             default: 5,
//             coerce: (val) => parseInt(val)
//         }

//     }

// })
@Component
export default class PaginatorComponent extends Vue {

    @Prop({ type: Number, required: true, default: 1 })
    currentPage: any;

    @Prop({ type: Number, required: true })
    totalPages: any;

    @Prop({ type: Number, required: false })
    itemsPerPage: any;

    @Prop({ type: Number, required: false })
    totalItems: any;

    @Prop({ type: Number, default: 5 })
    visiblePages: 5;



    // get computedVisiblePages() {
    //     return this.visiblePages        
    // }

    get lastPage() {
        if (this.totalPages) {
            return this.totalPages;
        } else {
            return this.totalItems % this.itemsPerPage === 0
                ? this.totalItems / this.itemsPerPage
                : Math.floor(this.totalItems / this.itemsPerPage)
        }
    }

    get paginationRange() {
        
        let start = this.currentPage - this.visiblePages / 2 <= 0
            ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
                ? Utils.lowerBound(this.lastPage - this.visiblePages + 1, 1)
                : Math.ceil(this.currentPage - this.visiblePages / 2);

        let range = [];

        for (let i = 0; i < this.visiblePages && i < this.lastPage; i++){
            range.push(start + i)
        }

        return range;
    }


    activePage (pageNum) {
        
        return this.currentPage === pageNum ? 'active' : '';
    }

    pageChanged (pageNum) {
        this.currentPage = pageNum;        
        this.$emit("page-changed", pageNum);
        
    }

    
}

