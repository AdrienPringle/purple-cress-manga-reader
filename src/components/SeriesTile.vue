<template>
	<router-link v-bind:to="`/series/${name}`">
		<div class="tile">
			<img v-bind:src="thumbnailurl" />
			<h3>{{ name }}</h3>
		</div>
	</router-link>
</template>
<script>
export default {
	name: "SeriesTile",
	props: ["thumbnailurl", "name"],
};
</script>
<style scoped>
.tile {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 10rem;
	height: 15rem;
	background-color: lightgrey;
}
.tile:hover {
	background-color: grey;
}
img {
	max-height: 9rem;
	max-width: 9rem;
}
</style>
