import { auth0 } from 'auth0-js';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import vSelect from 'vue-select';
import * as _ from 'lodash';
import * as $ from 'jquery';




@Component
export default class HeaderComponent extends Vue {

  @Prop({})
  auth: any;

  @Prop({})
  authenticated: any; 

  mounted() { 

  }

  

}

