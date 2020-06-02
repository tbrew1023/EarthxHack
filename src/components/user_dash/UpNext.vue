<template>
<div class="upnext-container">
  <div class="next-projects-container">
      <h4>{{title}}</h4>
    <div class="slides-container">
      <ProjectCard 
        class="project-card proj1 inactive" 
        project="MS Procurement" 
        module="SSBO" 
        dept="Advisory" 
        color="#7EB0AF" 
      />
      <ProjectCard 
        class="project-card proj2 mod-active" 
        project="Sales & Marketing" 
        module="MS" dept="ManagedServices" 
        color="#386C81" 
      />
      <ProjectCard 
        class="project-card proj3 inactive" 
        project="Finance" 
        module="OPS" 
        dept="Operations" 
        color="#58A16D" 
      />
      <ProjectCard 
        class="project-card proj4 inactive" 
        project="Strategic Sourcing" 
        module="SSBO" 
        dept="Advisory" 
        color="#7EB0AF" 
      />
      <!--ProjectCard 
        class="project-card proj2 mod-active" 
        project="Sales & Marketing" 
        module="MS" 
        dept="ManagedServices" 
        color="#386C81" 
      /-->
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

.mod-active {
  
}

.inactive {
  //background: white;
  //color: black;
  //background:white;
  //color: black;
}

h4 {
  margin-bottom: $gap;
}

.upnext-container {
    text-align: center;
    padding: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .next-projects-container {
      width: 100%;
    }
}

.slides-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: $gap;
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

.proj4 {
  animation: flyin 1s ease forwards;
  animation-delay: 1.4s;
}
</style>