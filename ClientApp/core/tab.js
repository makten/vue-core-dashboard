

export default {


	template: `
		<div v-show="isActive"><slot></slot></div>
	`,

	props: {
		name: { required: true },
		selected: { default: false }
	},


	data() {
		return {
			isActive: false
		};
	},


	computed: {

		href() {
			return '#' + this.name.toLowerCase().replace(/ /g, '-');
		}
	},

	mounted() {
		this.$nextTick(function () {

			this.isActive = this.selected;

		})
	}
}