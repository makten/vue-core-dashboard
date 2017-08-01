
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import vSelect from 'vue-select';
import * as _ from 'lodash';


@Component
export default class DashboardComponent extends Vue {

  linkList: any[] = [
    { icon: '<i class="material-icons md-24" aria-hidden="true">dashboard</i>', title: 'Dashboard', link: '/', active: true },
    { icon: '<i class="material-icons md-24" aria-hidden="true">list</i>', title: 'Vehicles', link: '/vehicles', active: false },
    { icon: '<i class="material-icons md-24" aria-hidden="true">list</i>', title: 'Test Data', link: '/fetchdata', active: false },
    { icon: '<i class="material-icons md-24" aria-hidden="true">note_add</i>', title: 'Create Vehicle', link: '/vehicle/new', active: false },
  ];

  forAdmin: any[] = [
    { icon: '<i class="material-icons" aria-hidden="true">dashboard</i>', title: 'Departments', link: '/#', active: false },
    { icon: '<i class="material-icons" aria-hidden="true">people</i>', title: 'Employees', link: '/buildModel', active: false },
    { icon: '<i class="material-icons" aria-hidden="true">note_add</i>', title: 'Roles ', link: '/#', active: false }

  ];

  logo: string = 'VueJS .NET Core App';
  

  mounted() { }


  changeActive(title) {    

    this.linkList = _.map(this.linkList, link => {

      if (link.title == title) {

        link.active = true;
      }
      else {
        link.active = false;
      }

      return link;

    });
  }

}

