import Errors from './Errors';
import axios from 'axios';
import * as _ from 'lodash';

export default class Form {
    originalData: any;
    errors: any = {};

    constructor(data) {

        this.originalData = data;


        for (let field in data) {

            this[field] = data[field];
        }

        this.errors = new Errors();

    }


    data() {

        let data = {};

        for (let property in this.originalData) {

            data[property] = this[property];
        }

        return data;
    }


    reset() {


        for (let field in this.originalData) {
            this[field] = '';
        }

    }


    post(url) {

        axios.post(url, this.data())
            .then(response => {

                let tempdata = this.onSuccess(response.data);

                // resolve(response.data);
            })
            .catch(response => {

                // this.onFail(error.response)

                // reject(error.response.data)
            });

    }


    // put(url) {

    // 	return this.submit('put', url);
    // }


    // patch(url) {

    // 	return this.submit('patch', url);
    // }


    // delete(url) {

    // 	return this.submit('DELETE', url);
    // }




    submit(requestType, url) {

        // return new Promise((resolve, reject) => {			

        axios[requestType](url, this.data())
            .then(response => {

                this.onSuccess(response.data);

                // resolve(response.data);
            })
            .catch(response => {

                // this.onFail(error.response)

                // reject(error.response.data)
            });

        // });



    }


    onSuccess(response) {

        if (!_.isEmpty(response.error)) {

            this.errors.record(response.error)

        } else {

            this.reset()
            this.errors.clear()

            return response
        }

    }


    onFail(response) {
        this.errors.record(response.error)
    }



}