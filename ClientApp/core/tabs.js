export default {

    template: `

	<div>

	<div class="container" id="exTab3" style="padding: 0px; margin: 0px;">
	<ul class="nav nav-pills" id="myTab">
	<li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
	<a :href="tab.href" @click="selectTab(tab.href)">{{ tab.name }}</a>
	</li>
	</ul>

	<div class="tab-content clearfix" data-toggle="tab">
	<slot></slot>
	</div>
	</div>



	</div>

	`,


    data() {

        return {

            tabs: []
        };
    },

    created() {
        this.tabs = this.$children;

        // Listen to currently selected tab from Dashboard.vue
        eventBroadcaster.$on('setTab', this.selectTab)
    },


    methods: {

        selectTab(selectTab) {
            // console.log(selectTab.tab, selectTab.ucs)

            this.tabs.forEach(tab => {
                tab.isActive = (tab.href == selectTab);

            });

            // window.location.hash = selectTab;

        }
    }
}