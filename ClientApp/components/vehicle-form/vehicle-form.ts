import { SaveVehicle, Vehicle, Contact, KeyValuePer } from './../../models/vehicle';
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
    id: number;
    name: string;
}


@Component
export default class VehicleFormComponent extends Vue {
    vehicles: any[] = [];
    features: Feature[] = [];
    makes: any[] = [];
    models: any[] = [];
    name: string = '';
    vehicle: any = {};

    selectedMake: any[] = [];
    selectedModel: any[] = [];
    thereAreErrors: boolean = false;

    vehicleForm: any = new Form({
        id: null,
        model: {id: '', name: ''},
        make: {id: '', name: ''},
        isRegistered: null,
        features: [],             
        contact: { name: '', email: '', phone: '' },
        formMode: {button: 'Create', method: 'post'}
    });
    

    mounted() {

        this.getVehicles();
        this.getMakes();
        this.getFeatures();
    }

    getVehicles() {

        fetch('/api/vehicles')
            .then(response => response.json() as Promise<Vehicle[]>)
            .then(data => {
                this.vehicles = data;
            });
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

        let selectedMake = _.find(this.makes, (m) => { return m.id == this.vehicleForm.make.id });
        if(!this.vehicleForm.id)
            this.vehicleForm.model.id = "";
        this.models = selectedMake ? selectedMake.models : [];

    }

    validateBeforeSubmit() {

        this.$validator.validateAll().then(result => {
            if (result) {
                
                this.vehicleForm.makeId = this.vehicleForm.make.id
                this.vehicleForm.modelId = this.vehicleForm.model.id
                let url = this.vehicleForm.formMode.method === 'put' ? `/api/vehicles/${this.vehicleForm.id}` :`/api/vehicles`

                this.vehicleForm[this.vehicleForm.formMode.method](url)
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


    setEdit(v) {
        console.log(v)
        this.vehicleForm.id = v.id;
        this.vehicle.make = v.make;
        this.vehicle.model = v.model;
        this.vehicle.features = _.map(v.features, 'id')
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.contact = v.contact;
        this.vehicle = this.vehicleForm;
        this.vehicleForm.formMode.method = 'put';
        this.vehicleForm.formMode.button = 'Update';
        this.changeVehicle();
    }

    deleteVehicle(vehicle) {
        this.vehicleForm.delete(`/api/vehicles/${vehicle.id}`).then(s => {
            alert(`vehicle with ID ${vehicle.id} has been deleted`);
            this.vehicles = _.reject(this.vehicles, (v) => { return v.id == vehicle.id})
        }).
        catch( e => {
            console.log(e)
        });
        
    }


}
