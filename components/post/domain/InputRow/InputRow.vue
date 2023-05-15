<script setup lang="ts">
import { isNotEmpty } from '@/helpers/string'

const props = defineProps({
	isNew: {
		type: Boolean,
		default: false,
		required: false,
	},
	domain: {
		type: Object,
		default: null,
		required: false,
	},
})
const defaultWordpressPath = {
	endpoint: 'wp-json/wp/v2/',
	healthEndpoint: 'wp-json/wp-site-health/v1/',
}
const domainRef = reactive(
	props.domain ?? {
		id: 0,
		endpoint: '',
		healthEndpoint: '',
		isHealth: true,
		active: true,
	}
)
const emit = defineEmits(['save', 'delete'])
function onSaveClick(result: {
	input: { id: string | number; type: string; value: string }[]
	checked: boolean
}) {
	const firstInput = result.input[0]
	const newDomain = {
		...domainRef,
		endpoint: firstInput.value,
		healthEndpoint: firstInput.value,
		active: result.checked,
	}
	if (!isNotEmpty(newDomain.endpoint)) {
		return
	}
	if (!newDomain.endpoint.startsWith('http')) {
		newDomain.endpoint = `https://${newDomain.endpoint}`
	}

	newDomain.endpoint += !newDomain.endpoint.endsWith('/') ? '/' : ''
	newDomain.healthEndpoint = newDomain.endpoint

	newDomain.endpoint =
		newDomain.endpoint.split('/').length > 4
			? newDomain.endpoint
			: `${newDomain.endpoint}${defaultWordpressPath.endpoint}`
	newDomain.healthEndpoint = `${newDomain.healthEndpoint}${defaultWordpressPath.healthEndpoint}`

	emit('save', { ...newDomain })

	if (props.isNew) {
		domainRef.endpoint = ''
		domainRef.healthEndpoint = ''
	}
}
function onDeleteClick() {
	emit('delete', { ...domainRef })
}
function toggleActive() {
	domainRef.active = !domainRef.active
	emit('save', { ...domainRef })
}
</script>

<template>
	<BaseEditableInput
		:checked="domainRef.active"
		:is-new="isNew ?? false"
		:is-invalid="!domainRef.isHealth"
		:inputs="[
			{
				id: domainRef.id,
				type: 'url',
				value: domainRef.endpoint,
			},
		]"
		@save="onSaveClick"
		@toggle="toggleActive"
		@delete="onDeleteClick"
	/>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstract/_variables.scss';
.editable-input {
	border-top: 1px solid variables.$grey;
	&:last-of-type {
		border-bottom: 1px solid variables.$grey;
	}
}
</style>
