import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

import CreateSeries from "../views/CreateSeries.vue";
import EditSeries from "../views/EditSeries.vue";
import ViewSeries from "../views/ViewSeries.vue";
import ViewChapter from "../views/ViewChapter.vue";

import CreateChapter from "../views/CreateChapter.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/series/create",
		name: "Create Series",
		component: CreateSeries,
	},
	{
		path: "/series/edit",
		name: "Edit Series",
		component: EditSeries,
		props: true,
	},
	{
		path: "/series/:name",
		name: "View Series",
		component: ViewSeries,
	},
	{
		path: "/chapter/create",
		name: "Create Chapter",
		component: CreateChapter,
		props: true,
	},
	{
		path: "/chapter/:series/:chapter",
		name: "View Chapter",
		component: ViewChapter,
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
