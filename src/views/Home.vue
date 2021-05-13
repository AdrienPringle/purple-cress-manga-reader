<template>
	<div class="home">
		<h1>Purple Cress Manga Reader Prototype</h1>
		<router-link to="/series/create"><h3>New Series</h3></router-link>
		<div class="tile-container">
			<series-tile
				v-for="(props, index) in series"
				v-bind:key="`series-card-${index}`"
				v-bind="props"
			/>
		</div>
	</div>
</template>

<script>
import { db } from "../firebase.js";
import SeriesTile from "../components/SeriesTile.vue";

export default {
	name: "Home",
	components: { SeriesTile },
	data: function() {
		return {
			series: [],
			loading: true,
		};
	},
	created: async function() {
		const snap = await db.collection("series").get();
		this.series = snap.docs.map((doc) => ({ name: doc.id, ...doc.data() }));
	},
};
</script>
<style scoped>
.tile-container {
	display: inline-grid;
	grid-auto-flow: column;
	max-width: 50rem;
	grid-gap: 2rem;
}
</style>
