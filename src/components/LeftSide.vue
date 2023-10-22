<template>
  <div class="left-side">
    <div class="lists">
      <div v-for="list in lists"
           :key="list.id"
           class="list">
        <List :list="list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import List from '@/components/List.vue';
import useListState from '@/modules/list';

const { lists } = useListState();

</script>

<style scoped>
.left-side {
  padding: 20px;
  border: 1px solid black;
  min-height: 600px;
  width: 500px;
}

.lists {
  display: flex;
  gap: 4px;
  flex-direction: column;
}
</style>