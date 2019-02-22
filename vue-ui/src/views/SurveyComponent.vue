<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-card>
        <v-card-title>
          <v-layout justify-center>
            <div class="headline">{{model.question}}</div>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="warning lighten-1" v-if="model.ID!=0" @click="redirectPrev">Previous</v-btn>
          <v-btn
            flat
            v-for="answer in model.answers"
            :key="answer.text"
            @click="redirectNext(answer.redirectID, answer.text)"
          >{{answer.text}}</v-btn>
          <v-btn flat color="success" @click="viewResults" v-if="!model.answers.length">View Results</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Survey from '@/model/Survey';

@Component({})
export default class SurveyComponent extends Vue {
  @Prop() public model?: Survey;
  public redirectNext(redirectID: number, text: string) {
    this.$emit('next', { redirectID, text });
  }
  public redirectPrev() {
    this.$emit('prev');
  }

  public viewResults() {
    this.$emit('results');
  }
}
</script>
