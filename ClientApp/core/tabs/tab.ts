import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';


@Component
export default class TabComponent extends Vue {



	@Prop({ required: true })
	name: any;

	@Prop({ default: false })
	selected: any;

	isActive: boolean = false;

	mounted() {
		this.isActive = this.selected;

	}


	get href() {
		return '#' + this.name.toLowerCase().replace(/ /g, '-');
	}


}