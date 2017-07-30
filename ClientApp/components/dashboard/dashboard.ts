import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import vSelect from 'vue-select';
import * as _ from 'lodash';


@Component({
    components: {
        DashboardComponent: require('../dashboard/dashboard.vue.html'),
        HeaderComponent: require('../header/header.vue.html'),
        SidebarComponent: require('../sidebar/sidebar.vue.html'),
        FooterComponent: require('../footer/footer.vue.html'),
        MenuComponent: require('../navmenu/navmenu.vue.html'),
    }
})

export default class DashboardComponent extends Vue {

}
