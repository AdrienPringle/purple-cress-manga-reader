<template>
	<div v-if="loading">loading data</div>
	<div v-else class="content">
		<div class="meta-panel">
			<h1>{{ name }}</h1>
			<p>author: {{ series.author }}</p>
			<img v-bind:src="series.thumbnailurl" />
			<router-link
				v-bind:to="{ name: 'Create Chapter', params: { name: name } }"
			>
				<h3 class="new-chapter">new chapter</h3>
			</router-link>
			<div class="description">
				<p
					v-for="(p, index) in series.description.split('\n')"
					v-bind:key="`about-${index}`"
				>
					{{ p }}
				</p>
			</div>
		</div>
		<div class="chapters-panel">
			<div v-if="!series.chapters.length">
				no chapters yet, better make some
			</div>
			<div v-else class="chapters-container">
				<router-link
					v-bind:to="`/chapter/${name}/${chapter}`"
					class="chapter-box"
					v-for="(chapter, index) in series.chapters"
					v-bind:key="`chapter-${index}`"
				>
					{{ chapter }}
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
import { db } from "../firebase.js";

export default {
	name: "ViewSeries",
	data: function() {
		return {
			name: "",
			series: {
				author: "",
				description: "",
				thumbnail: "",
				thumbnailurl: "",
				chapters: [],
			},
			loading: true,
		};
	},
	created: async function() {
		this.name = this.$router.currentRoute.path
			.split("/")
			.pop()
			.replaceAll("%20", " ");

		const doc = await db
			.collection("series")
			.doc(this.name)
			.get();

		this.series = doc.data();
		this.loading = false;
	},
};
</script>
<style scoped>
.content {
	display: inline-grid;
	grid-template-columns: 1fr 3fr;
	grid-gap: 5rem;
}
.description {
	border: 1px solid grey;
}
.chapter-box {
	background-color: lightgray;
	border: 1px solid grey;
	padding: 0.5rem;
}
.chapter-box:hover {
	background-color: grey;
}
.chapters-container {
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr;
}
.chapters-panel {
	padding-top: 5rem;
}
.new-chapter {
	background-color: #42b983;
	padding: 1rem;
}
.new-chapter:hover {
	background-color: #42b98390;
}
img {
	max-width: 10rem;
	max-height: 10rem;
}
</style>
