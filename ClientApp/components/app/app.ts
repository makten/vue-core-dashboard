import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
           
        DashboardComponent: require('../dashboard/dashboard.vue.html'),
        MenuComponent: require('../navmenu/navmenu.vue.html'),
    }
})
export default class AppComponent extends Vue {
}
