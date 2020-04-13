<template>
<div class="upnext-container">
  <h4>{{title}}</h4>
  <div class="next-projects-container">
    <div class="slides-container">
      <ProjectCard class="project-card proj1" project="MS Procurement" module="SSBO" dept="Advisory" color="#7EB0AF" />
      <ProjectCard class="project-card proj2" project="Sales & Marketing" module="MS" dept="ManagedServices" color="#386C81" />
      <ProjectCard class="project-card proj3" project="Finance" module="OPS" dept="Operations" color="#58A16D" />
    </div>
  </div>
</div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard';

export default {
  name: 'UpNext',
  props: {
    user: Object,
    title: String
  },
  components: {
    ProjectCard
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

h4 {
  margin-bottom: $gap;
}

.upnext-container {
    text-align: center;
    padding: 0px;
}

.slides-container {
  display: flex;
  align-items: center;
}

p {
    margin: 24px 0px;
}

.project-card {
  opacity: 0;

  &:hover {
    transform: scale(1.02);
  }
}

.proj1 {
  animation: flyin 1s ease forwards;
  animation-delay: 0.8s;
}

.proj2 {
  animation: flyin 1s ease forwards;
  animation-delay: 1.0s;
}

.proj3 {
  animation: flyin 1s ease forwards;
  animation-delay: 1.2s;
}
</style>