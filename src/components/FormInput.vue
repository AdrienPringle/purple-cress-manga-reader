<template>
	<div style="display: contents">
		<label v-bind:for="this._uid">{{ label }}</label>
		<component
			v-bind:is="type == 'textarea' ? 'textarea' : 'input'"
			v-bind:type="type || 'text'"
			v-bind:id="this._uid"
			v-bind:name="name"
			v-bind:value="value"
			v-bind="props"
			v-on:input="$emit('input', $event.target.value)"
		/>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "FormInput",
	props: ["label", "name", "value", "type", "props"],
	model: {
		prop: "value",
		event: "input",
	},
};
</script>
