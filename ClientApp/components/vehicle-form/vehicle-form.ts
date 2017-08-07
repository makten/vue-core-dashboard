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

interface Model {
    id: number;
    name: string;
}


@Component
export default class VehicleFormComponent extends Vue {
    vehicles: any[] = [];
    allVehicles: any[] = [];
    features: Feature[] = [];
    makes: any[] = [];
    models: any[] = [];
    modelsBag: any[] = [];
    name: string = '';
    vehicle: any = {};

    selectedMake: any[] = [];
    selectedModel: any[] = [];
    errorBag: any[] = [];

    vehicleForm: any = new Form({
        makeId: null,
        modelId: null,
        isRegistered: null,
        features: [],             
        contact: { name: '', email: '', phone: '' },
        formMode: {button: 'Create', method: 'post'}
    });
    
    filter: any  = {};   


    mounted() {

        this.getVehicles();
        this.getMakes();
        this.getModels();
        this.getFeatures();
    }

    getVehicles() {

        fetch('/api/vehicles')
            .then(response => response.json() as Promise<Vehicle[]>)
            .then(data => {
                this.vehicles = this.allVehicles = data;
            });
    }


    getFeatures() {

        fetch('/api/features')
            .then(response => response.json() as Promise<Feature[]>)
            .then(data => { this.features = data; });
    }

    getMakes() {

        fetch('/api/makes')
            .then(response => response.json() as Promise<Make[]>)
            .then(data => {
                this.makes = data;
            });
    }

    getModels() {

        fetch('/api/models')
            .then(response => response.json() as Promise<Model[]>)
            .then(data => {
                this.modelsBag = data;
            });
    }

    changeVehicle() {

        let selectedMake = _.find(this.makes, (m) => { return m.id == this.vehicleForm.makeId });
        if(!this.vehicleForm.id)
            this.vehicleForm.modelId = "";
        this.models = selectedMake ? selectedMake.models : [];

    }


    filterVehicles(){
        let vehicles = this.allVehicles;
        
        if(this.filter.makeId)
            vehicles = _.filter(vehicles, v =>{ return v.make.id == this.filter.makeId}) 

        if(this.filter.modelId)
            vehicles = _.filter(vehicles, v =>{ return v.model.id == this.filter.modelId}) 
        
        this.vehicles = vehicles
        
    }

    resetFilter(){
        this.filter = {}
        this.filterVehicles();
    }


    validateBeforeSubmit() {

        this.$validator.validateAll().then(result => {
            if (result) {                
                
                let url = this.vehicleForm.formMode.method === 'put' ? `/api/vehicles/${this.vehicleForm.id}` :`/api/vehicles`

                this.vehicleForm[this.vehicleForm.formMode.method](url)
                    .then(data => {

                        console.log(data)
                        this.$root.$router.push('/vehicles');
                    })
                    .catch(errors => {

                        this.errorBag = []
                        this.errorBag.push(errors)
                    });
            }

        });
    }


    setEdit(v) {
        console.log(v)
        this.vehicleForm.id = v.id;
        this.vehicle.makeId = v.make.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.features = _.map(v.features, 'id')
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.contact = v.contact;
        this.vehicle = this.vehicleForm;
        this.vehicleForm.formMode.method = 'put';
        this.vehicleForm.formMode.button = 'Update';
        this.changeVehicle();
    }

    deleteVehicle(vehicleId) {
        if(confirm("Are you sure you want to delete this item?"))
            this.vehicleForm.delete(`/api/vehicles/${vehicleId}`).then(s => {
                alert(`vehicle with ID ${vehicleId} has been deleted`);
                this.vehicles = _.reject(this.vehicles, (v) => { return v.id == vehicleId})
            }).
            catch( e => {
                console.log(e)
            });
        
    }


}
