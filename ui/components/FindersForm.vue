<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { ref } from 'vue';

const now = new Date();
const formattedDate = now.toLocaleString();
const formSubmitted = ref(false);
const submitResult = ref(null);

const form = useForm({
  defaultValues: {
    duckId: '',
    finderName: '',
    dateTime: formattedDate,
    deck: '',
    section: '',
    story: '',
    photo: null as File | null,
  },
  onSubmit: async ({ value }) => {
    const formData = new FormData();
    Object.entries(value).forEach(([key, val]) => {
      if (key === 'photo' && val) {
        formData.append('photo', val as File);
      } else if (key !== 'photo') {
        formData.append(key, val ?? '');
      }
    });

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    formSubmitted.value = true;
    submitResult.value = await response.json();
  },
});
</script>

<template>
  <form
    v-if="!formSubmitted"
    @submit.prevent.stop="form.handleSubmit"
    class="duck-form"
    autocomplete="off"
  >
    <h2 class="form-title">Duck Hunt Log</h2>
    <form.Field name="duckId">
      <template v-slot="{ field }">
        <label class="form-label">Duck ID/Name</label>
        <select
          class="form-input"
          :value="field.state.value"
          @change="(e) => field.handleChange((e.target as HTMLSelectElement).value)"
        >
          <option value="" disabled>Select a duck</option>
          <option value="Donald">Donald</option>
          <option value="Bert">Bert</option>
          <option value="Trotter">Trotter</option>
          <option value="Benny">Benny</option>
        </select>
      </template>
    </form.Field>

    <form.Field name="finderName">
      <template v-slot="{ field }">
        <label class="form-label">Finder Name(s)</label>
        <input
          class="form-input"
          type="text"
          :value="field.state.value"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
          placeholder="Your name, nickname, or team"
        />
      </template>
    </form.Field>

    <div class="form-row">
      <form.Field name="deck">
        <template v-slot="{ field }">
          <label class="form-label">Deck #</label>
          <input
            class="form-input"
            type="number"
            min="1"
            max="20"
            :value="field.state.value"
            @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
            placeholder="Deck number"
          />
        </template>
      </form.Field>
      <form.Field name="section">
        <template v-slot="{ field }">
          <label class="form-label">Ship Section</label>
          <select
            class="form-input"
            :value="field.state.value"
            @change="(e) => field.handleChange((e.target as HTMLSelectElement).value)"
          >
            <option value="" disabled>Select</option>
            <option value="Bow">Bow</option>
            <option value="Stern">Stern</option>
          </select>
        </template>
      </form.Field>
    </div>

    <form.Field name="story">
      <template v-slot="{ field }">
        <label class="form-label">Tell us your story</label>
        <textarea
          class="form-input"
          rows="4"
          :value="field.state.value"
          @input="(e) => field.handleChange((e.target as HTMLTextAreaElement).value)"
          placeholder="What led you there? Fun moments, scenic views, milestones..."
        ></textarea>
      </template>
    </form.Field>

    <form.Field name="photo">
      <template v-slot="{ field }">
        <label class="form-label">Upload a photo</label>
        <input
          class="form-input"
          type="file"
          accept="image/*"
          @change="(e) => field.handleChange((e.target as HTMLInputElement).files?.[0] || null)"
        />
      </template>
    </form.Field>

    <form.Field name="dateTime">
      <template v-slot="{ field }">
        <label class="form-label">Date & Time</label>
        <input class="form-input" type="text" :value="field.state.value" readonly />
      </template>
    </form.Field>

    <form.Subscribe>
      <template v-slot="{ canSubmit, isSubmitting }">
        <button class="form-submit" type="submit" :disabled="!canSubmit">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </template>
    </form.Subscribe>
  </form>
  <div v-else class="duck-form">
    <h2 class="form-title">Submission Result</h2>
    <pre>
      {{ JSON.stringify(submitResult, null, 2) }}
    </pre>
  </div>
</template>

<style scoped>
.duck-form {
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.form-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}
.form-label {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  display: block;
}
.form-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #cfd8dc;
  border-radius: 0.7rem;
  font-size: 1rem;
  margin-bottom: 0.2rem;
  transition: border 0.2s;
}
.form-input:focus {
  border-color: #1976d2;
  outline: none;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row > * {
  flex: 1;
}
.form-submit {
  width: 100%;
  padding: 0.9rem 0;
  background: linear-gradient(90deg, #1976d2 60%, #64b5f6 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;
}
.form-submit:disabled {
  background: #b0bec5;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .duck-form {
    padding: 1rem 0.3rem;
    border-radius: 0.7rem;
  }
  .form-title {
    font-size: 1.2rem;
  }
  .form-input,
  .form-submit {
    font-size: 1rem;
    padding: 0.7rem 0.7rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
