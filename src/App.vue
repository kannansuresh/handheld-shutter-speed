<script setup>
import InputGroup from './components/InputGroup.vue'

import { ref } from 'vue'

const focalLength = ref(50)
const cropFactor = ref(1.5)
const stabilization = ref(0)
const effectiveFocalLength = ref(focalLength.value * cropFactor.value)
let shutterSpeed = ref(0)
calculateShutterSpeed()

function calculateShutterSpeed(e = null) {
  if (e !== null) {
    focalLength.value = e.id === 'focalLength' ? e.value : focalLength.value
    cropFactor.value = e.id === 'cropFactor' ? e.value : cropFactor.value
    stabilization.value = e.id === 'stabilization' ? e.value : stabilization.value
  }
  effectiveFocalLength.value = Math.round(focalLength.value * cropFactor.value)
  const fStopStabilization = Math.pow(2, stabilization.value)
  const denominator = effectiveFocalLength.value / fStopStabilization
  const inSeconds = fStopStabilization / effectiveFocalLength.value
  if (denominator >= 2) {
    shutterSpeed.value = '1/' + Math.round(denominator)
  } else {
    shutterSpeed.value = Math.round(inSeconds)
  }
}

const formData = ref([
  {
    id: 'focalLength',
    placeholder: 'Focal Length',
    type: 'number',
    min: 1,
    max: 400,
    value: 50,
    step: 1,
    prefix: '<i class="material-icons">camera</i>',
    suffix: 'mm',
    help: 'Enter focal length of your lens in mm.'
  },
  {
    id: 'cropFactor',
    placeholder: 'Crop Factor',
    type: 'number',
    min: 1,
    max: 400,
    value: 1.5,
    step: 0.1,
    prefix: '<i class="material-icons">crop</i>',
    suffix: '',
    help: 'Enter crop factor of your camera.'
  },
  {
    id: 'effectiveFocalLength',
    value: effectiveFocalLength,
    placeholder: 'Effective Focal Length',
    type: 'number',
    step: 0.1,
    prefix: '<i class="material-icons">lens</i>',
    suffix: '',
    help: '<var>Effective Focal Length</var> = <var>Crop Factor</var> * <var>Focal Length</var>',
    readonly: true
  },
  {
    id: 'stabilization',
    placeholder: 'Stabilization',
    type: 'number',
    min: 0,
    max: 6.5,
    value: 0,
    step: 0.5,
    prefix: '<i class="material-icons">waving_hand</i>',
    suffix: '',
    help: 'Enter stabilization of your camera.'
  }
])
</script>

<template>
  <main>
    <h1>Handheld Shutter Speed Calculator</h1>
    <p>
      Handheld Shutter Speed Calculator calculates the recommended shutter speed to take photos
      without blur while taking shots by holding camera in hand.
    </p>

    <div class="row">
      <div class="col-md-7">
        <InputGroup
          v-for="item in formData"
          :key="item.id"
          :id="item.id"
          :placeholder="item.placeholder"
          :prefix="item.prefix"
          :suffix="item.suffix"
          :min="item.min"
          :max="item.max"
          :step="item.step"
          :help="item.help"
          :readonly="item.readonly"
          :value="item.value"
          @change="calculateShutterSpeed"
          @input="calculateShutterSpeed"
        />
      </div>
      <div class="col-md-5 align-self-center">
        <div class="form-group mb-3">
          <div class="card text-center rec">
            <div class="card-header">Recommended Shutter Speed</div>
            <div class="card-body">
              <div class="card-text">
                <p class="display-4" id="shutterSpeed">{{ shutterSpeed + ' sec' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
</style>
