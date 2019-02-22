<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline">SURVEY GENERATOR</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
        @click="chinese = !chinese"
        :color="chinese ? 'orange' : ''"
      >{{chinese ? 'English' : '中文'}}</v-btn>-->
      <v-btn outline :disabled="!surveyData.length" @click="startOver">start over</v-btn>
      <v-btn color="warning" outline @click="redirectUpload">choose file</v-btn>
      <input style="display: none;" type="file" ref="upload" @change="handleFileUpload()">
    </v-toolbar>

    <v-content>
      <v-tabs id="SurveyTabs" v-model="currentSurvey">
        <v-tab v-for="survey in surveyData" :key="survey.ID"></v-tab>
        <v-tab-item v-for="survey in surveyData" :key="survey.ID">
          <SurveyComponent
            :model="survey"
            @next="progressNext"
            @prev="progressPrev"
            @results="resultDialogModel = true;"
          ></SurveyComponent>
        </v-tab-item>
      </v-tabs>

      <v-dialog v-model="errorDialogModel" width="500">
        <v-card>
          <v-card-title class="headline error" primary-title>Error</v-card-title>
          <v-card-text>{{errorMessage}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="errorDialogModel = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog width="500" max-height="600" v-model="resultDialogModel">
        <v-card>
          <v-card-title class="headline success" primary-title>Results</v-card-title>
          <!-- <v-card-text>{{traceStack}}</v-card-text> -->
          <v-timeline dense>
            <v-timeline-item
              small
              color="success"
              v-for="unit in traceStack"
              :key="unit.QuestionID"
            >
              <v-card class="mr-5">
                <v-card-title class="title success">{{unit.QuestionText}}</v-card-title>
                <v-card-text>
                  <p>{{unit.AnswerText}}</p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="success" @click="resultDialogModel = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Survey from '@/model/Survey';
import AnswerTraceUnit from '@/model/AnswerTraceUnit';
import axios from 'axios';
import SurveyComponent from '@/views/SurveyComponent.vue';

@Component({ components: { SurveyComponent } })
export default class App extends Vue {
  public serverURL = 'http://127.0.0.1:3000';
  public surveyData: Survey[] = [];
  public traceStack: AnswerTraceUnit[] = [];
  public errorMessage: string = '';
  public errorDialogModel: boolean = false;
  public resultDialogModel: boolean = false;
  public currentSurvey: number = 0;
  public chinese: boolean = false;

  constructor() {
    super();
  }

  public resetSurvey() {
    this.surveyData = [];
    this.startOver();
  }

  public startOver() {
    this.currentSurvey = 0;
    this.traceStack = [];
  }

  public redirectUpload() {
    const uploadComponent = this.$refs.upload as any;
    uploadComponent.click();
  }

  public handleFileUpload() {
    const refFile = this.$refs.upload as any;
    const inputFile = refFile.files[0] as File;
    const formData = new FormData();
    formData.append('file', inputFile as Blob);
    axios
      .post(this.serverURL + '/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        try {
          const data = response.data;
          if (!data.length || data.length === 0) {
            throw new Error('Empty data');
          }
          this.resetSurvey();
          for (const unit of data) {
            this.surveyData.push(new Survey(unit));
          }
        } catch (e) {
          this.errorMessage = e;
          this.errorDialogModel = true;
        }
      });
  }

  public progressPrev() {
    const lastTrace = this.traceStack.pop() as AnswerTraceUnit;
    this.currentSurvey = this.IDtoTabModel(lastTrace.QuestionID);
  }

  public progressNext(params: { redirectID: number; text: string }) {
    this.traceStack.push(
      new AnswerTraceUnit(
        this.surveyData[this.currentSurvey].ID as number,
        this.surveyData[this.currentSurvey].question as string,
        params.redirectID,
        params.text,
      ),
    );

    this.currentSurvey = this.IDtoTabModel(params.redirectID);
  }

  public IDtoTabModel(ID: number): number {
    for (let i = 0; i < this.surveyData.length; i++) {
      if (this.surveyData[i].ID === ID) {
        return i;
      }
    }
    return -1;
  }
}
</script>

<style>
#SurveyTabs .v-tabs__container {
  display: none !important;
}
</style>
