<template>
	<div v-if="loading">loading data</div>
	<div v-else class="content">
		<div>
			<router-link v-bind:to="`/series/${name}`"> {{ name }} </router-link> >
			<b>{{ chapter }}</b>
		</div>
		<div class="pages-container">
			<div
				class="page"
				v-for="(src, index) in data.pages"
				v-bind:key="`page-${index}`"
			>
				<img v-bind:src="src" />
				<br />
				<small> {{ index || "cover" }}</small>
			</div>
		</div>
	</div>
</template>
<script>
import { db } from "../firebase.js";

export default {
	name: "ViewChapter",
	data: function() {
		return {
			name: "",
			chapter: "",
			data: {
				pageCount: 0,
				pages: [],
			},
			loading: true,
		};
	},
	created: async function() {
		[, , this.name, this.chapter] = this.$router.currentRoute.path
			.replaceAll("%20", " ")
			.split("/");

		const doc = await db
			.collection("series")
			.doc(this.name)
			.collection("chapters")
			.doc(this.chapter)
			.get();

		this.data = doc.data();
		console.log(this.data);
		console.log(this.name, this.chapter);

		this.loading = false;
	},
};
</script>
<style scoped>
img {
	max-width: 100vw;
	max-height: 100vh;
}
.pages-container {
	display: inline-grid;
	grid-template-columns: 1fr;
	grid-gap: 2rem;
}
</style>
