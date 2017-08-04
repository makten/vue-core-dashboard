import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import vSelect from 'vue-select';
import * as _ from 'lodash';


//Core components
import Form from '../../core/Form';


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
    thereAreErrors: boolean = false;

    vehicleForm: any = new Form({
        makeId: '',
        modelId: '',
        features: [],
        isRegistered: null,
        contact: { name: '', email: '', phone: '' }
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

        let selectedMake = _.find(this.makes, (m) => { return m.id == this.vehicleForm.makeId });
        this.vehicleForm.modelId = "";
        this.models = selectedMake ? selectedMake.models : [];

    }

    validateBeforeSubmit() {


        this.$validator.validateAll().then(result => {
            if (result) {

                this.vehicleForm.post('/api/vehicles')
                    .then(data => {

                        console.log(data)
                        this.$root.$router.push('/vehicles');
                    })
                    .catch(errors => {

                        console.log(errors)
                        
                    });
            }
            this.thereAreErrors = !this.thereAreErrors;

        });
    }


}
