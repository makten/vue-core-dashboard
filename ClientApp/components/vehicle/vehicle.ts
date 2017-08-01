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

@Component
export default class VehicleComponent extends Vue {
    vehicles: Vehicle[] = [];

    mounted() {
        
        this.getVehicles();
                
    }
    

    getVehicles() {
        
        fetch('/api/vehicles')
            .then(response => response.json() as Promise<Vehicle[]>)
            .then(data => {
                this.vehicles = data;
            });
    }


}

