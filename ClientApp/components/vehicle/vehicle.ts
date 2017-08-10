import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as _ from 'lodash';
import axios from 'axios';

interface Vehicle {
    id: number;
    make: any;
    feature: any;   
    isRegistered: boolean;
    contact: any;
    lastUpdate: string;

}

Vue.component('tabs', require('../../core/tabs/tabs.vue.html'))
Vue.component('tab', require('../../core/tabs/tab.vue.html'))

@Component
export default class VehicleComponent extends Vue {
    vehicle: Vehicle[] = [];

    mounted() {
        
        this.getVehicle(this.$route.params.vehicleId);
        
                
    }
    

    getVehicle(vehicleId) {
        
        fetch(`/api/vehicles/${vehicleId}`)
            .then(response => response.json() as Promise<Vehicle[]>)
            .then(data => {
                this.vehicle = data;
                console.log(this.vehicle)
            });
    }


}

