<template>
	<div v-if="!name">
		select a series or create a new one to create a chapter
	</div>
	<div v-else class="create-chapter">
		<h1>Create Chapter for {{ name }}</h1>

		<form v-on:submit.prevent="submitForm">
			<form-input label="Chapter Name" name="name" v-model="chapterName" />
			<label for="Pages">Pages</label>
			<div>
				<input
					type="file"
					id="Pages"
					accept="image/*"
					v-on:change="onFileChange"
					multiple
				/>
			</div>

			<input type="submit" v-bind:value="loading ? 'loading' : 'create'" />
		</form>
		<div class="thumbnail-container">
			<img
				v-for="(src, index) in thumbnailSrcs"
				v-bind:key="`page-thumbnails-${index}`"
				v-bind:src="src"
			/>
		</div>
	</div>
</template>
<script>
import { firebase, db, storage } from "../firebase.js";
import FormInput from "../components/FormInput.vue";

export default {
	name: "CreateChapter",
	props: ["name"],
	components: { FormInput },
	data: function() {
		return {
			chapterName: "",
			loading: false,
			files: [],
			fileSrcs: [],
			thumbnailSrcs: [],
		};
	},
	methods: {
		submitForm: async function() {
			//do something
			if (this.loading) return; //form already submitted
			if (!this.files.length) return;
			this.loading = true;

			const uploadImg = async (file, index) => {
				const imgRef = storage.child(
					"series/" + this.name + "/" + this.chapterName + "/" + index
				);
				await imgRef.put(file);
				this.fileSrcs[index] = await imgRef.getDownloadURL();
			};
			await Promise.all(this.files.map(uploadImg));
			await db
				.collection("series")
				.doc(this.name)
				.collection("chapters")
				.doc(this.chapterName)
				.set({
					pageCount: this.fileSrcs.length,
					pages: this.fileSrcs,
				});
			await db
				.collection("series")
				.doc(this.name)
				.update({
					chapters: firebase.firestore.FieldValue.arrayUnion(this.chapterName),
				});
			this.$router.push({
				path: "/chapter/" + this.name + "/" + this.chapterName,
			});
		},
		onFileChange(e) {
			this.files = Array.from(e.target.files);
			this.thumbnailSrcs = this.files.map((f) => URL.createObjectURL(f));
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
