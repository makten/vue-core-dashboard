import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as _ from 'lodash';

interface Vehicle {
    id: number;
    makeId: number;
    feature: any;   
    isRegistered: boolean;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    lastUpdate: string;

}

export default class VehicleComponent extends Vue {
    vehicles: Vehicle[] = [];

    mounted() {
        fetch('/api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<Vehicle[]>)
            .then(data => {
                this.vehicles = data;
            });
    }


}

