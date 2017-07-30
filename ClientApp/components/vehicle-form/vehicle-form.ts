import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import vSelect from 'vue-select';
import * as _ from 'lodash';
//Core components
import Form from '../../core/Form';


Vue.component('v-select', vSelect)

interface Feature {
    name: string;
}

interface Make {
    name: string;
}

@Component
export default class VehicleFormComponent extends Vue {
    features: Feature[] = [];
    makes: any[] = [];
    models: any[] = [];
    name: string = '';
    vehicle: any = {};
    selectedMake: any[] = [];
    selectedModel: any[] = [];

    vehicleForm: any = new Form({
        vehicle: '',
        model: '',
        features: [],
        registered: null,
        contactName: '',
        contactEmail: '',
        contactPhone: ''
    });

    mounted() {
        this.getMakes();
        this.getFeatures();
    }


    getFeatures() {

        fetch('/api/features')
            .then(response => response.json() as Promise<Feature[]>)
            .then(data => {
                this.features = data;
            });
    }

    getMakes() {

        fetch('/api/makes')
            .then(response => response.json() as Promise<Make[]>)
            .then(data => {
                this.makes = data;
            });
    }

    changeVehicle() {

        let selectedMake = _.find(this.makes, (m) => { return m.id == this.vehicleForm.vehicle });
        this.models = selectedMake ? selectedMake.models : [];

    }

    submitForm() {
        this.vehicleForm.post('/api/vehicles');
    }


}
