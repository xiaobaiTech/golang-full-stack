<template>
  <div class="notice">
    <div class="notice-title">{{ title }}</div>
    <div class="notice-content">
      <div class="notice-text">{{ content }}</div>
      <img v-if="imageUrl" :src="imageUrl" :alt="altText" class="notice-image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
    imageUrl: String,
    altText: String
  }
}
</script>

<style scoped>
.notice {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}
.notice-title {
  font-weight: bold;
}
.notice-content {
  margin-top: 10px;
}
.notice-image {
  max-width: 100%;
  height: auto;
}
</style>