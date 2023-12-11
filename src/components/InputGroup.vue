<script setup>
import { defineProps } from 'vue'

defineProps({
  id: String,
  placeholder: String,
  type: { type: String, default: 'number' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  max: Number,
  min: Number,
  value: Number,
  step: Number,
  help: String,
  readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['change', 'input'])

function handleChange(e) {
  emit('change', e.target)
}

function handleInput(e) {
  emit('input', e.target)
}
</script>
<template>
  <div class="form-group mb-3">
    <label :for="id">{{ placeholder }}</label>
    <div class="input-group">
      <span v-if="prefix" class="input-group-text" v-html="prefix" :id="'prefix-' + id"></span>
      <input
        class="form-control"
        :type="type"
        :min="min"
        :max="max"
        :step="step"
        :name="id"
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :aria-describedby="'helpId-' + id"
        :readonly="readonly"
        @change="handleChange"
        @input="handleInput"
      />
      <span v-if="suffix" class="input-group-text" v-html="suffix" :id="'suffix-' + id"></span>
    </div>
    <small v-if="help" :id="'helpId-' + id" v-html="help"></small>
  </div>
</template>
