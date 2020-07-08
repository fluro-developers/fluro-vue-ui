<template>
  <div class="modifier-accordion" :class="{expanded:expanded}">
    <div class="modifier-accordion-title" @click="toggle()">
      <v-container fluid py-1 px-2>
        <v-layout align-center>
          <v-flex>{{title}}</v-flex>
          <v-flex shrink>
            <fluro-icon class="icon" icon="angle-right" />
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="modifier-accordion-body" v-if="expanded">
      <v-container fluid pa-2>
        <slot />
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }
  }
};
</script>
<style lang="scss">
.modifier-accordion {
  font-size: 0.8em;
  border-top: 1px solid rgba(#000, 0.1);

  .icon {
    transition: all 0.3s;
  }

  .modifier-accordion-title {
    display: block;
    background: #eee;
    cursor: pointer;
  }

  .modifier-accordion-body {
    display: block;
    background: #fff;
  }

  &.expanded {
    .modifier-accordion-title {
      font-weight: bold;
    }
    .icon {
      transform: rotate(90deg);
    }
  }
}
</style>
