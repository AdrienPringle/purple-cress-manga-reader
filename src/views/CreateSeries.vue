<template>
	<div class="create-series">
		<h1>Create Series</h1>
		<form v-on:submit.prevent="submitForm">
			<form-input label="Series Name" name="name" v-model="name" />
			<form-input label="Author" name="author" v-model="series.author" />
			<form-input
				label="Description"
				name="description"
				v-model="series.description"
				type="textarea"
			/>
			<label for="Thumbnail">Thumbnail</label>
			<div>
				<input
					type="file"
					id="Thumbnail"
					accept="image/*"
					v-on:change="onFileChange"
				/>
				<img v-bind:src="thumbnailSrc" />
			</div>

			<input type="submit" v-bind:value="loading ? 'loading' : 'create'" />
		</form>
	</div>
</template>
<script>
import { db, storage } from "../firebase.js";
import FormInput from "../components/FormInput.vue";

export default {
	name: "CreateSeries",
	components: { FormInput },
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
			thumbnailSrc: "",
			file: "",
			imgFile: "",
			loading: false,
		};
	},
	methods: {
		submitForm: async function() {
			if (this.loading) return; //form already submitted
			if (!this.file) return;
			this.loading = true;

			this.series.thumbnail = "series/" + this.name + "/thumbnail";
			const imgRef = storage.child(this.series.thumbnail);

			await imgRef.put(this.file);
			this.series.thumbnailurl = await imgRef.getDownloadURL();
			await db
				.collection("series")
				.doc(this.name)
				.set(this.series);

			this.$router.push({
				path: this.name,
			});
		},
		onFileChange(e) {
			this.file = e.target.files[0];
			this.thumbnailSrc = URL.createObjectURL(this.file);
		},
	},
};
</script>
<style scoped>
form {
	max-width: 25rem;
	display: inline-grid;
	grid-template-columns: 1fr 2fr;
}
img {
	max-width: 100%;
	min-height: 5rem;
	max-height: 5rem;
}
</style>
