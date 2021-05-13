<template>
	<div class="edit-series">
		<h1>Edit Series: {{ name }}</h1>
		<form>
			<form-input label="Author" name="author" v-model="author" />
			<form-input
				label="Description"
				name="description"
				v-model="description"
				type="textarea"
			/>
			<form-input
				label="Thumbnail"
				name="thumbnail"
				v-model="thumbnail"
				type="file"
				v-bind:props="{ accept: 'image/*' }"
			/>
		</form>
	</div>
</template>
<script>
import FormInput from "../components/FormInput.vue";

export default {
	name: "EditSeries",
	components: { FormInput },
	props: ["name"],
	data: function() {
		return {
			author: "",
			description: "",
			thumbnail: "",
		};
	},
};
</script>
<style scoped>
form {
	max-width: 15rem;
	display: inline-grid;
	grid-template-columns: 1fr 2fr;
}
</style>
