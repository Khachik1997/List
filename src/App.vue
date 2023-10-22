<template>
  <main>
    <div class="wrapper">
      <LeftSide />
      <RightSide />
    </div>
  </main>
</template>

<script setup>
import LeftSide from '@/components/LeftSide.vue';
import RightSide from '@/components/RightSide.vue';
import {onMounted} from 'vue';
import {getListsData} from '@/modules/list';

onMounted(() => {
  getListsData();
});

</script>

<style scoped>
.wrapper {
  display: flex;
  margin-top: 50px;
  gap: 50px;
  justify-content: center;
}
</style>
