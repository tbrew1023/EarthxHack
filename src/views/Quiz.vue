<template>
  <transition name="fade" mode="out-in">
    <div class="page" :class="(dark ? 'quiz-dark' : 'quiz-light')">
      <div v-if="showScore" class="modal-container">
        <div class="modal score-modal">  

          <CircleProgress
            :score="true"
            :percentage="finalPercent"
            :progressColor="'black'"
            :circleColor="'rgba(0,0,0,0.06)'"
            :strokeWidth="8"
            :showNumber="true"
            :separated="false"
            class="circle-boi"
            :pass="pass"
            :fail="fail"
          />

          <h2 class="score-message" :class="( pass ? 'pass-message' : 'fail-message' )">{{ ( pass ? 'You passed! :)' : 'You need a 90% or higher to pass :c' ) }}</h2>

          <div class="score-options-container">
            <router-link v-if="pass" class="btn btn1" :to="('/lesson/' + (parseInt($route.params.current) + 1))"><div><span>Next Lesson 🡒</span></div></router-link>
            <div v-if="fail" class="btn btn1"><div @click="$router.go()"><span>Retake Quiz</span></div></div>
            <router-link :to="'/lesson/' + $route.params.current"><div class="btn btn2"><span>Review Lesson</span></div></router-link>
            <router-link to="/dashboard"><div class="btn btn3"><span>Return to Dashboard</span></div></router-link>
          </div>

          <!--h1 class="final-percent" :class="(this.pass ? 'pass' : (this.fail ? 'fail' : ''))">{{animatedProgress}}%</h1-->
          <!--div class="score-bar">
            <div class="juice-container">
              <div class="juice">
                <div class="juice-progress" :style="'width:' + finalPercent + '%'"></div>
              </div>
              <div class="juice-backdrop-container">
                <div class="juice-empty"></div>
                <div class="pass-marker"></div>
              </div>
            </div>
          </div-->

        </div>
      </div>
      <div class="quiz-container">
        <full-page ref="fullpage" :options="options" id="fullpage">
          <div class="section">
            <div class="draw-intro" v-on:click="() => { (ani == 3 ? ani = 1 : ani++) }">
              <svg v-if="ani == 1" id="logo" width="204" height="66" viewBox="0 0 204 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="p1" d="M10.9 28.36C10.9 31.216 11.284 33.784 12.052 36.064C12.82 38.32 13.912 40.24 15.328 41.824C16.768 43.384 18.496 44.584 20.512 45.424C22.552 46.264 24.844 46.684 27.388 46.684C29.932 46.684 32.212 46.264 34.228 45.424C36.268 44.584 37.996 43.384 39.412 41.824C40.828 40.24 41.92 38.32 42.688 36.064C43.456 33.784 43.84 31.216 43.84 28.36C43.84 25.504 43.456 22.948 42.688 20.692C41.92 18.412 40.828 16.48 39.412 14.896C37.996 13.312 36.268 12.1 34.228 11.26C32.212 10.42 29.932 10 27.388 10C24.844 10 22.552 10.42 20.512 11.26C18.496 12.1 16.768 13.312 15.328 14.896C13.912 16.48 12.82 18.412 12.052 20.692C11.284 22.948 10.9 25.504 10.9 28.36ZM56.44 64.576H48.448C47.296 64.576 46.252 64.42 45.316 64.108C44.404 63.796 43.564 63.22 42.796 62.38L35.164 53.956C33.94 54.292 32.68 54.544 31.384 54.712C30.112 54.88 28.78 54.964 27.388 54.964C23.452 54.964 19.864 54.304 16.624 52.984C13.384 51.64 10.6 49.78 8.272 47.404C5.968 45.028 4.18 42.22 2.908 38.98C1.636 35.716 1 32.176 1 28.36C1 24.544 1.636 21.016 2.908 17.776C4.18 14.512 5.968 11.692 8.272 9.316C10.6 6.94 13.384 5.092 16.624 3.772C19.864 2.428 23.452 1.756 27.388 1.756C30.028 1.756 32.512 2.068 34.84 2.692C37.168 3.292 39.304 4.156 41.248 5.284C43.192 6.388 44.932 7.744 46.468 9.352C48.028 10.936 49.348 12.712 50.428 14.68C51.508 16.648 52.324 18.784 52.876 21.088C53.452 23.392 53.74 25.816 53.74 28.36C53.74 30.688 53.5 32.92 53.02 35.056C52.54 37.168 51.844 39.148 50.932 40.996C50.044 42.844 48.952 44.548 47.656 46.108C46.36 47.644 44.884 49 43.228 50.176L56.44 64.576Z" stroke="#000000" stroke-width="2" mask="url(#path-1-outside-1)"/>
                  <path id="p2" d="M92.1363 17.452V54.388H86.7002C85.5242 54.388 84.7803 53.848 84.4683 52.768L83.8563 49.816C82.3443 51.352 80.6762 52.6 78.8522 53.56C77.0282 54.496 74.8802 54.964 72.4082 54.964C70.3922 54.964 68.6043 54.628 67.0443 53.956C65.5083 53.26 64.2122 52.288 63.1562 51.04C62.1003 49.792 61.2963 48.316 60.7443 46.612C60.2163 44.884 59.9523 42.988 59.9523 40.924V17.452H68.8443V40.924C68.8443 43.18 69.3603 44.932 70.3923 46.18C71.4483 47.404 73.0203 48.016 75.1083 48.016C76.6443 48.016 78.0843 47.68 79.4283 47.008C80.7723 46.312 82.0443 45.364 83.2443 44.164V17.452H92.1363Z" stroke="#000000" stroke-width="2" mask="url(#path-1-outside-1)"/>
                  <path id="p3" d="M110.169 17.452V54.388H101.241V17.452H110.169ZM111.393 6.688C111.393 7.456 111.237 8.176 110.925 8.848C110.613 9.52 110.193 10.108 109.665 10.612C109.161 11.116 108.561 11.524 107.865 11.836C107.169 12.124 106.425 12.268 105.633 12.268C104.865 12.268 104.133 12.124 103.437 11.836C102.765 11.524 102.177 11.116 101.673 10.612C101.169 10.108 100.761 9.52 100.449 8.848C100.161 8.176 100.017 7.456 100.017 6.688C100.017 5.896 100.161 5.152 100.449 4.456C100.761 3.76 101.169 3.16 101.673 2.656C102.177 2.152 102.765 1.756 103.437 1.468C104.133 1.156 104.865 1 105.633 1C106.425 1 107.169 1.156 107.865 1.468C108.561 1.756 109.161 2.152 109.665 2.656C110.193 3.16 110.613 3.76 110.925 4.456C111.237 5.152 111.393 5.896 111.393 6.688Z" stroke="#000000" stroke-width="2" mask="url(#path-1-outside-1)"/>
                  <path id="p4" d="M145.766 21.124C145.766 21.748 145.658 22.36 145.442 22.96C145.226 23.56 144.938 24.052 144.578 24.436L127.046 47.548H145.226V54.388H116.714V50.68C116.714 50.272 116.81 49.792 117.002 49.24C117.194 48.664 117.482 48.124 117.866 47.62L135.578 24.256H117.758V17.452H145.766V21.124Z" stroke="#000000" stroke-width="2" mask="url(#path-1-outside-1)"/>
              </svg>
              <svg v-if="ani == 2" id="logo2" width="203" height="65" viewBox="0 0 203 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6363 27.9721C10.6363 30.8281 11.0203 33.3961 11.7883 35.6761C12.5563 37.9321 13.6483 39.8521 15.0643 41.4361C16.5043 42.9961 18.2323 44.1961 20.2483 45.0361C22.2883 45.8761 24.5803 46.2961 27.1243 46.2961C29.6683 46.2961 31.9483 45.8761 33.9643 45.0361C36.0043 44.1961 37.7323 42.9961 39.1483 41.4361C40.5643 39.8521 41.6563 37.9321 42.4243 35.6761C43.1923 33.3961 43.5763 30.8281 43.5763 27.9721C43.5763 25.1161 43.1923 22.5601 42.4243 20.3041C41.6563 18.0241 40.5643 16.0921 39.1483 14.5081C37.7323 12.9241 36.0043 11.7121 33.9643 10.8721C31.9483 10.0321 29.6683 9.61206 27.1243 9.61206C24.5803 9.61206 22.2883 10.0321 20.2483 10.8721C18.2323 11.7121 16.5043 12.9241 15.0643 14.5081C13.6483 16.0921 12.5563 18.0241 11.7883 20.3041C11.0203 22.5601 10.6363 25.1161 10.6363 27.9721ZM56.1763 64.1881H48.1843C47.0323 64.1881 45.9883 64.0321 45.0523 63.7201C44.1403 63.4081 43.3003 62.8321 42.5323 61.9921L34.9003 53.5681C33.6763 53.9041 32.4163 54.1561 31.1203 54.3241C29.8483 54.4921 28.5163 54.5761 27.1243 54.5761C23.1883 54.5761 19.6003 53.9161 16.3603 52.5961C13.1203 51.2521 10.3363 49.3921 8.00833 47.0161C5.70433 44.6401 3.91633 41.8321 2.64433 38.5921C1.37233 35.3281 0.736328 31.7881 0.736328 27.9721C0.736328 24.1561 1.37233 20.6281 2.64433 17.3881C3.91633 14.1241 5.70433 11.3041 8.00833 8.92806C10.3363 6.55206 13.1203 4.70406 16.3603 3.38406C19.6003 2.04006 23.1883 1.36806 27.1243 1.36806C29.7643 1.36806 32.2483 1.68006 34.5763 2.30406C36.9043 2.90406 39.0403 3.76806 40.9843 4.89606C42.9283 6.00006 44.6683 7.35606 46.2043 8.96406C47.7643 10.5481 49.0843 12.3241 50.1643 14.2921C51.2443 16.2601 52.0603 18.3961 52.6123 20.7001C53.1883 23.0041 53.4763 25.4281 53.4763 27.9721C53.4763 30.3001 53.2363 32.5321 52.7563 34.6681C52.2763 36.7801 51.5803 38.7601 50.6683 40.6081C49.7803 42.4561 48.6883 44.1601 47.3923 45.7201C46.0963 47.2561 44.6203 48.6121 42.9643 49.7881L56.1763 64.1881Z" fill="#000000"/>
                  <path d="M91.8726 17.0641V54.0001H86.4366C85.2606 54.0001 84.5166 53.4601 84.2046 52.3801L83.5926 49.4281C82.0806 50.9641 80.4126 52.2121 78.5886 53.1721C76.7646 54.1081 74.6166 54.5761 72.1446 54.5761C70.1286 54.5761 68.3406 54.2401 66.7806 53.5681C65.2446 52.8721 63.9486 51.9001 62.8926 50.6521C61.8366 49.4041 61.0326 47.9281 60.4806 46.2241C59.9526 44.4961 59.6886 42.6001 59.6886 40.5361V17.0641H68.5806V40.5361C68.5806 42.7921 69.0966 44.5441 70.1286 45.7921C71.1846 47.0161 72.7566 47.6281 74.8446 47.6281C76.3806 47.6281 77.8206 47.2921 79.1646 46.6201C80.5086 45.9241 81.7806 44.9761 82.9806 43.7761V17.0641H91.8726Z" fill="#000000"/>
                  <path d="M109.905 17.0641V54.0001H100.977V17.0641H109.905ZM111.129 6.30006C111.129 7.06806 110.973 7.78806 110.661 8.46006C110.349 9.13206 109.929 9.72006 109.401 10.2241C108.897 10.7281 108.297 11.1361 107.601 11.4481C106.905 11.7361 106.161 11.8801 105.369 11.8801C104.601 11.8801 103.869 11.7361 103.173 11.4481C102.501 11.1361 101.913 10.7281 101.409 10.2241C100.905 9.72006 100.497 9.13206 100.185 8.46006C99.8972 7.78806 99.7532 7.06806 99.7532 6.30006C99.7532 5.50806 99.8972 4.76406 100.185 4.06806C100.497 3.37206 100.905 2.77206 101.409 2.26806C101.913 1.76406 102.501 1.36806 103.173 1.08006C103.869 0.768059 104.601 0.612061 105.369 0.612061C106.161 0.612061 106.905 0.768059 107.601 1.08006C108.297 1.36806 108.897 1.76406 109.401 2.26806C109.929 2.77206 110.349 3.37206 110.661 4.06806C110.973 4.76406 111.129 5.50806 111.129 6.30006Z" fill="#000000"/>
                  <path d="M145.502 20.7361C145.502 21.3601 145.394 21.9721 145.178 22.5721C144.962 23.1721 144.674 23.6641 144.314 24.0481L126.782 47.1601H144.962V54.0001H116.45V50.2921C116.45 49.8841 116.546 49.4041 116.738 48.8521C116.93 48.2761 117.218 47.7361 117.602 47.2321L135.314 23.8681H117.494V17.0641H145.502V20.7361Z" fill="#000000"/>
              </svg>
              <svg v-if="ani == 3" id="logo3" width="203" height="65" viewBox="0 0 203 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6363 27.9721C10.6363 30.8281 11.0203 33.3961 11.7883 35.6761C12.5563 37.9321 13.6483 39.8521 15.0643 41.4361C16.5043 42.9961 18.2323 44.1961 20.2483 45.0361C22.2883 45.8761 24.5803 46.2961 27.1243 46.2961C29.6683 46.2961 31.9483 45.8761 33.9643 45.0361C36.0043 44.1961 37.7323 42.9961 39.1483 41.4361C40.5643 39.8521 41.6563 37.9321 42.4243 35.6761C43.1923 33.3961 43.5763 30.8281 43.5763 27.9721C43.5763 25.1161 43.1923 22.5601 42.4243 20.3041C41.6563 18.0241 40.5643 16.0921 39.1483 14.5081C37.7323 12.9241 36.0043 11.7121 33.9643 10.8721C31.9483 10.0321 29.6683 9.61206 27.1243 9.61206C24.5803 9.61206 22.2883 10.0321 20.2483 10.8721C18.2323 11.7121 16.5043 12.9241 15.0643 14.5081C13.6483 16.0921 12.5563 18.0241 11.7883 20.3041C11.0203 22.5601 10.6363 25.1161 10.6363 27.9721ZM56.1763 64.1881H48.1843C47.0323 64.1881 45.9883 64.0321 45.0523 63.7201C44.1403 63.4081 43.3003 62.8321 42.5323 61.9921L34.9003 53.5681C33.6763 53.9041 32.4163 54.1561 31.1203 54.3241C29.8483 54.4921 28.5163 54.5761 27.1243 54.5761C23.1883 54.5761 19.6003 53.9161 16.3603 52.5961C13.1203 51.2521 10.3363 49.3921 8.00833 47.0161C5.70433 44.6401 3.91633 41.8321 2.64433 38.5921C1.37233 35.3281 0.736328 31.7881 0.736328 27.9721C0.736328 24.1561 1.37233 20.6281 2.64433 17.3881C3.91633 14.1241 5.70433 11.3041 8.00833 8.92806C10.3363 6.55206 13.1203 4.70406 16.3603 3.38406C19.6003 2.04006 23.1883 1.36806 27.1243 1.36806C29.7643 1.36806 32.2483 1.68006 34.5763 2.30406C36.9043 2.90406 39.0403 3.76806 40.9843 4.89606C42.9283 6.00006 44.6683 7.35606 46.2043 8.96406C47.7643 10.5481 49.0843 12.3241 50.1643 14.2921C51.2443 16.2601 52.0603 18.3961 52.6123 20.7001C53.1883 23.0041 53.4763 25.4281 53.4763 27.9721C53.4763 30.3001 53.2363 32.5321 52.7563 34.6681C52.2763 36.7801 51.5803 38.7601 50.6683 40.6081C49.7803 42.4561 48.6883 44.1601 47.3923 45.7201C46.0963 47.2561 44.6203 48.6121 42.9643 49.7881L56.1763 64.1881Z" fill="#000000"/>
                  <path d="M91.8726 17.0641V54.0001H86.4366C85.2606 54.0001 84.5166 53.4601 84.2046 52.3801L83.5926 49.4281C82.0806 50.9641 80.4126 52.2121 78.5886 53.1721C76.7646 54.1081 74.6166 54.5761 72.1446 54.5761C70.1286 54.5761 68.3406 54.2401 66.7806 53.5681C65.2446 52.8721 63.9486 51.9001 62.8926 50.6521C61.8366 49.4041 61.0326 47.9281 60.4806 46.2241C59.9526 44.4961 59.6886 42.6001 59.6886 40.5361V17.0641H68.5806V40.5361C68.5806 42.7921 69.0966 44.5441 70.1286 45.7921C71.1846 47.0161 72.7566 47.6281 74.8446 47.6281C76.3806 47.6281 77.8206 47.2921 79.1646 46.6201C80.5086 45.9241 81.7806 44.9761 82.9806 43.7761V17.0641H91.8726Z" fill="#000000"/>
                  <path d="M109.905 17.0641V54.0001H100.977V17.0641H109.905ZM111.129 6.30006C111.129 7.06806 110.973 7.78806 110.661 8.46006C110.349 9.13206 109.929 9.72006 109.401 10.2241C108.897 10.7281 108.297 11.1361 107.601 11.4481C106.905 11.7361 106.161 11.8801 105.369 11.8801C104.601 11.8801 103.869 11.7361 103.173 11.4481C102.501 11.1361 101.913 10.7281 101.409 10.2241C100.905 9.72006 100.497 9.13206 100.185 8.46006C99.8972 7.78806 99.7532 7.06806 99.7532 6.30006C99.7532 5.50806 99.8972 4.76406 100.185 4.06806C100.497 3.37206 100.905 2.77206 101.409 2.26806C101.913 1.76406 102.501 1.36806 103.173 1.08006C103.869 0.768059 104.601 0.612061 105.369 0.612061C106.161 0.612061 106.905 0.768059 107.601 1.08006C108.297 1.36806 108.897 1.76406 109.401 2.26806C109.929 2.77206 110.349 3.37206 110.661 4.06806C110.973 4.76406 111.129 5.50806 111.129 6.30006Z" fill="#000000"/>
                  <path d="M145.502 20.7361C145.502 21.3601 145.394 21.9721 145.178 22.5721C144.962 23.1721 144.674 23.6641 144.314 24.0481L126.782 47.1601H144.962V54.0001H116.45V50.2921C116.45 49.8841 116.546 49.4041 116.738 48.8521C116.93 48.2761 117.218 47.7361 117.602 47.2321L135.314 23.8681H117.494V17.0641H145.502V20.7361Z" fill="#000000"/>
              </svg>
            </div>
            <div @click="$refs.fullpage.api.moveSectionDown()" class="begin-button score-button primary-btn">Begin</div>
            <div class="arrows"></div>
          </div>

          <div class="section fp-section fp-table" v-for="(item, index) in questions" :key="index">
            <div class="quiz-card" :id="'quiz-card' + index" :class="( !((activeSlide - 1) == index) ? 'card-inactive' : '' )">
              <h3 class="question-title"><span style="opacity:0.3; margin-right: 24px">{{ index + 1 + ' / ' + questions.length  }}</span>{{ item.question }}</h3>
                <div class="answers-container">

                  <div class="question-container">
                    <div v-on:click="handleAns(1, index)" :class="sheet[index].answered == 1 ? 'answer-selected' : ''" class="answer answer1"><div class="letter-container">A</div><span>{{questions[index].answer1}}</span></div>
                    <div v-on:click="handleAns(2, index)" :class="sheet[index].answered == 2 ? 'answer-selected' : ''" class="answer answer2"><div class="letter-container">B</div><span>{{questions[index].answer2}}</span></div>
                    <div v-on:click="handleAns(3, index)" :class="sheet[index].answered == 3 ? 'answer-selected' : ''" class="answer answer3"><div class="letter-container">C</div><span>{{questions[index].answer3}}</span></div>
                    <div v-on:click="handleAns(4, index)" :class="sheet[index].answered == 4 ? 'answer-selected' : ''" class="answer answer4"><div class="letter-container">D</div><span>{{questions[index].answer4}}</span></div>
                  </div>
                
                </div>
                <div @click="$refs.fullpage.api.moveSectionDown()" class="bottom-actions primary-btn" :class="(sheet[index].continuable ? '' : 'non-clickable')">Continue</div>
            </div>
          </div>

          <div class="section score-section">
            <h1>Quiz complete!</h1>
            <div @click="getScore()" class="score-button view-score primary-btn"><b style="transition: 0ms">View score</b></div>
          </div>

        </full-page>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
import store from '../store';

import CircleProgress from '../components/CircleProgress';

export default {
  name: 'Quiz',
  components: {
    CircleProgress
  },
  data() {
      return {
          ani: 1,
          ans: null,
          continue: false,
          options: {
              scrollingSpeed: 1000,
              fadingEffect: true,
              setAutoscrolling: false,
              onLeave: (origin, destination, direction) => {
                console.log(this);
                this.handleLeave(origin, destination, direction);
              }
          },
          questions: [],
          answerSheet: [],
          answerInputs: [],
          sheet: [],
          showScore: false,
          finalPercent: 0,
          animatedProgress: 0,
          pass: false,
          fail: false,
          activeSlide: 0,
          claims: {},
          userRef: {
            progress_advisory: NaN,
            progress_managed_services: NaN,
            progress_operations: NaN
          },
          quizzes: {
            advisory: [],
            managedServices: [],
            operations: []
          }
      }
  },
  created() {
    this.fetchQuestions();
    this.setup();
  },
  mounted() {
    if(this.ani == 1) {
      for(let i = 0; i < 5; i++) {
          //console.log(document.getElementById('p'+(i+1)).getTotalLength());
      }
    }
    console.log();
    console.log(this.answerSheet);
    console.log();
  },
  computed: {
    dark() {
      return store.state.dark;
    },
    context() {
      return this.$route.params.current;
    },
    isCorrect() {
      if(this.continue) {
        if(this.ans == this.questions[0].correct) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    },
  },
  methods: {
    getNewTotal(numCompleted) {
      //get total number of modules

      var self = this;
      var fireRef = firebase.firestore().collection("HBRC_quizzes");
      var currentHighest = 0;
      var numLessons;

      console.clear();
      console.log(numCompleted);

      fireRef.get().then((docs) => {
        docs.forEach((doc) => {
          //console.log(parseInt(doc.data().lessonID));
          if(parseInt(doc.data().lessonID) > currentHighest) {
            currentHighest = parseInt(doc.data().lessonID)
            console.log(currentHighest);
          }
        });
        console.log(numLessons);
        
        numLessons = currentHighest;

        console.log( (numCompleted / numLessons) * 100 );
        self.newTotal = ( (numCompleted / numLessons) * 100 );
      });

      /*fireRef.where('module','==','Advisory').get().then((docs) => {
        docs.forEach((doc) => {
          //console.log(parseInt(doc.data().lessonID));
          if(parseInt(doc.data().lessonID) > currentHighest) {
            currentHighest = parseInt(doc.data().lessonID)
            console.log(currentHighest);
          }
        });
        console.log(numLessons);
        
        numLessons = currentHighest;

        console.log( (numCompleted / numLessons) * 100 );
        self.newTotal = ( (numCompleted / numLessons) * 100 );
      });*/
    },
    async setup() {
        console.log('setup jazz');
        this.claims = await this.$auth.getUser(),
        console.log(this.claims);
        this.bindData();
    },
    async isAuthenticated() {
        this.authenticated = await this.$auth.isAuthenticated();
    },
    fetchQuizzes() {
        var self = this;
        console.log('fetching lessons');
        firebase.firestore().collection('HBRC_quizzes').get().then((docs) => {
            docs.forEach((doc) => {
                console.log();
                console.log(doc.data());
                console.log();
                if(doc.data().module == 'Advisory') {
                    self.quizzes.advisory.push(doc.data());
                }
                else if(doc.data().module == 'Managed Services') {
                    self.quizzes.managedServices.push(doc.data());
                }
                else if(doc.data().module == 'Operations') {
                    self.quizzes.operations.push(doc.data());
                }
                else {
                    console.error('Unkown module');
                }
            });
            console.log();
            console.log('quizzes fetched: ');
            console.log(self.quizzes.advisory);
            console.log(self.quizzes.managedServices);
            console.log(self.quizzes.operations);

            // ---------- filter quizzes ----------
            
            self.filterQuizzes(self.quizzes.advisory);
            self.filterQuizzes(self.quizzes.managedServices);
            self.filterQuizzes(self.quizzes.operations);
        });
    },
    filterQuizzes(context) {
        const na = [...new Set(context)]; // set

        var sorted = [];
        var trash = [];
    
        na.forEach((item) => {
            if(!trash.includes(item.serviceLine)) {
                sorted.push({practiceGroup: item.practiceGroup, serviceLine: item.serviceLine, lessonID: item.lessonID});
                trash.push(item.serviceLine);
                console.log(item.serviceLine);
            }
        });
        
        if(context == this.quizzes.advisory) { //advisory
            this.quizzes.advisory = sorted;
        }
        else if(context == this.quizzes.managedServices) { //managedServices
            this.quizzes.managedServices = sorted;
        }
        else { //operations
            this.quizzes.operations = sorted;
        }
    },
    fetchQuestions() {
      var self = this;
      firebase.firestore().collection('HBRC_quizzes').where('lessonID', '==', this.context).get().then((docs) => {
          docs.forEach((doc) => {
              self.questions.push(doc.data()); //fetching questions
              self.answerSheet.push(doc.data().correct); //fetching correct answers
              self.sheet.push(doc.data()); //fetching all quiz objects
          });
      });
    },
    handleAns(choice, index) {
      this.ans = choice;
      this.answerInputs[index] = choice; //record ansewr for current question
      this.sheet[index].continuable = true; //only allow continue if question answered
      this.sheet[index].answered = choice;
      this.$forceUpdate(); //thank god for this magic spell
    },
    getScore() {
      var numCorrect = 0;
      var total = this.answerSheet.length;
      var score;

      for(let i = 0; i < total; i++) {
        if(this.answerInputs[i] == this.answerSheet[i]) {
          numCorrect++;
        }
      }

      score = numCorrect / total;

      var finalPercent = (score * 100);

      this.finalPercent = finalPercent;

      console.log('Final score: ', finalPercent);

      this.showScore = true;

      console.log('show score?: ', this.showScore);
      
      setTimeout(() => {
          this.animatePercent();
      }, 1000);


    },
    animatePercent() {
      var self = this;
      var count = 0;
      var up = setInterval(() => {
        this.animatedProgress = count;
        count++;
      }, 2000 / this.finalPercent);

      setTimeout(() => {
        clearInterval(up);
        self.animatedProgress = this.finalPercent;
        self.passFail();
      }, 2000);
      
    },
    passFail() {
      if(this.finalPercent >= 90) {

        var self = this;

        this.pass = true;
        this.fail = false;

        //update remote score

        console.log(this.claims);
        console.log("UPDATING SCORE FOR ", this.claims.sub, "..........");
        console.log('PUSHING ' + this.context + " TO COMPLETED ARRAY..........");

        var fireRef = firebase.firestore().collection("users").doc(this.claims.sub);

        var completedArray = [];

        //grab current 'completed' array
        fireRef.get().then((doc) => {
          try {
            completedArray = [...doc.data().completed];
          }
          catch {
            console.log('congrats on completing your first module!');
          }
        });
        console.log(completedArray);

        //send back mutated array
        if(completedArray.includes(this.context)) {
          console.log('lesson already completed!');
        }
        else {
          //calculate new total
          //let newTotal = self.getNewTotal(completedArray.length);
          //mutate array
          completedArray.push(this.context);

          let a_t = ( self.quizzes.advisory.length == 0 ? 1 : self.quizzes.advisory.length );
          let m_t = ( self.quizzes.managedServices.length == 0 ? 1 : self.quizzes.managedServices.length );
          let o_t = ( self.quizzes.operations.length == 0 ? 1 : self.quizzes.operations.length );

          let a_c = 0;
          let m_c = 0;
          let o_c = 0;

          //loop through and count completion per module

          /*for(let i = 0; i < completedArray; i++) {
            if(completedArray[i] == this.quizzes.advisory[i].lessonID) {

            }
          }*/

          let a_p = (a_c / a_t) * 100;
          let m_p = (m_c / m_t) * 100;
          let o_p = (o_c / o_t) * 100;

          fireRef.update({
            complete: completedArray,
            progress_advisory: a_p,
            progress_managed_services: m_p,
            progress_operations: o_p,
            total_progress: ( ( o_p + m_p + o_p) / 3 )
          });
        }
      }
      else {
        this.pass = false;
        this.fail = true;
      }

      console.log('pass?: ', this.pass);
    },
    handleLeave(origin, destination, direction) {
      console.log('origin', origin);
      console.log('destination', destination);
      console.log('direction', direction);
      console.clear();
      this.activeSlide = destination.index;
    },
    bindData() {
        console.log('binding data..........');
        var self = this;
        var fireRef = firebase.firestore().collection('users');
        fireRef.doc(self.claims.sub).get().then((doc) => {
            console.log('exists?: ', doc.exists);
            if(doc.exists) { //pull ref data
                console.log('doc exists');
                console.log(doc.data());
                self.userRef.progress_advisory = doc.data().progress_advisory;
                self.userRef.progress_managed_services = doc.data().progress_managed_services;
                self.userRef.progress_operations = doc.data().progress_operations;
            }
            else { //create ref data
                console.log("doc doesn't exist... creating doc");
                fireRef.doc(self.claims.sub).set({
                    progress_advisory: 0,
                    progress_managed_services: 0,
                    progress_operations: 0
                });
            }
        });

        //console.log('data successfully binded.');
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

.card-inactive {
  //background: red !important;
  transform: scale(0.9);
  opacity: 0;
}

.score-options-container {
  display: flex;
  //opacity: 0;
  //animation: flyin 1s ease forwards 2s;
  margin-top: 64px;

  .btn, .primary-btn {
    width: 220px;
    height: 60px;
    color: white;
    background: black;
    margin-left: 3px;
    margin-right: 3px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;

    &:hover {
      //box-shadow: $softShadow;
      transform: scale(1.1);
      filter: brightness(0.86);
    }
  }

  .btn1 {
    animation: flyin 600ms ease forwards 2s;
    background: $colorGreen;
    color: white;
    border-radius: 90px 4px 4px 90px;
    //font-weight: bold;
    //border: 2px solid black;

    a {
      color: white;
    }
  }

  .btn2 {
    animation: flyin 600ms ease forwards 5s;
    background: $colorGray1;
    color: black;
    border-radius: 4px 4px 4px 4px;
    //border: 2px solid black;
    //font-weight: bold;
  }

  .btn3 {
    animation: flyin 600ms ease forwards 5s;
    background: $colorGray1;
    color: black;
    border-radius: 4px 90px 90px 4px;
    //border: 2px solid black;
    //font-weight: bold;
  }
}

.score-message {
  opacity: 0;
  font-weight: normal;
  animation: flyup 1s ease forwards 4.5s;
}

.pass-message {
  //color: $colorGreen;
  //font-weight: normal;
  color: black;
}

.fail-message {
  //color: $colorRed;
  //font-weight: normal;
  color: black;
}

.quiz-card {
  background: white;
  padding: $gap;
  position: absolute;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  height: max-content;
  box-shadow: $softerShadow;
  width: 70%;
  border-radius: $rad;
  transition: 1s;

  h3 {
      padding-bottom: $gap;
  }
}

.circle-boi {
  margin-top: 220px;
  animation: flyin 1s ease forwards, circle-shift 1s ease forwards 3.5s;
  transition: 2s;
}

.pass {
  color: $colorGreen;
  font-weight: bold;
}

.fail {
  color: $colorRed;
  font-weight: bold;
}

.final-percent {
  opacity: 0;
  animation: flyin 1s ease forwards 0.5s;
  font-size: 64px;
  font-weight: normal;
  margin-bottom: $gap;
  margin-top: 0px;
  transition: 300ms;
}

.juice-progress {
  height: 12px;
  width: 0%;
  background: white;
  border-radius: $rad;
  animation: progress 2s ease forwards 1s;
}

.juice {
  position: absolute;
  //background: rgba(0,0,0,0.15);
  height: 12px;
  width: 285px;
  margin-left: auto;
  margin-right: auto;
  border-radius: $rad;
  left: 0;
  right: 0;
  margin-top: 6px;
  //z-index: 9999;
}

.juice-backdrop-container {
  //background: red;
  width: 100%;
  height: 24px;
  border-radius: $rad;
  display: flex;

  .juice-empty {
    background: $colorGray2;
    width: 85%;
    border-radius: $rad 0px 0px $rad;
  }

  .pass-marker {
    background: $colorGreen;
    width: 15%;
    border-radius: 0px $rad $rad 0px;
  }
}

.score-bar {
  //background: gray;
  width: 300px;
  height: 24px;
  border-radius: $rad;
  opacity: 0;
  animation: flyin 0.6s ease forwards 1s;
}

.modal-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: $colorBackdrop;
  z-index: 999;
  animation: flyin 600ms ease forwards;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 60%;
  height: 80%;
  border-radius: $rad;
  box-shadow: $softerShadow;
  z-index: 999;
}

.score-circle {
  opacity: 0;
  animation: flyin 1s forwards ease 1s;
}

.quiz-light {
  .quiz-container {
    background: $colorBackdrop !important;
  }
}

.quiz-dark {
  .btn1 {
    background: $colorGreen;
  }

  .btn2, .btn3 {
    background: $colorDarkMid;
  }

  .modal-container {
    background: $colorDarkMid;
  }

  .modal {
    background: $colorDarkLight;
  }

  .arrows, .primary-btn, .bottom-actions {
    filter: invert(1);
  }

  #logo {
    filter: invert(1);
  }

  .quiz-container {
    background: $colorDarkMid !important;
  }
  
  .quiz-card {
    background: $colorDarkLight;
  }

  .answer {
    background: $colorDarkMid !important;
  }

  .letter-container {
    background: black !important;
    //opacity: 0.6 !important;
  }

  .clickable {
    border: 2px solid white !important;
    color: white !important;
    pointer-events: all;
    opacity: 1;

    &:hover {
      background: white !important;
      color: black !important;
    }
  }
}

.non-clickable {
  pointer-events: none;
  opacity: 0.2;
}

.begin-button {
  margin-top: 48px;
  width: 100px !important;
  animation: flyup 1s ease forwards 2.5s;
  opacity: 0;
}

.score-button {
  background: black;
  color: white;
  border: solid 2px black;
  cursor: pointer;
  transition: 300ms;
  width: 180px;
  padding: 12px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 90px;

  &:hover {
    background: transparent;
    color: black;
  }
}

.section {
  height: 100vh;
}

.correct {
  background-color: green !important;
  color: white !important;

  .letter-container {
    background: darkgreen !important;
  }
}

.bottom-actions {
  margin-top: 60px;
  margin-bottom: 24px;
  background: transparent;
  border: 2px black solid;
  border-radius: $rad;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  color: black;
  font-weight: bold;
  padding: 6px 3px;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background: black;
    color: white;
  }
}

.answer-selected {

  span {
    font-weight: bold;
  }

  .letter-container {
    width: 110px !important;
    background: $colorOrange !important;
  }
}

$answerHeight: 60px;
$answerRad: 200px;

.answer {
  background: $colorBackdrop;
  margin-bottom: $gap;
  height: $answerHeight;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  border-radius: $answerRad;;
  display: flex;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    //background:rgba(0, 0, 0, 0.04);
    .letter-container {
      width: $answerHeight * 1.4;
    }
  }

.answer-dark {
    background: $colorDarkMid;
    margin-bottom: $gap;
    height: $answerHeight;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    border-radius: $answerRad;
    display: flex;
    cursor: pointer;
    transition: 300ms;

    .letter-container {
      background: green;
    }

    &:hover {
      //background:rgba(0, 0, 0, 0.04);
      .letter-container {
        width: $answerHeight * 1.4;
      }
    }
  }

  span {
    line-height: $answerHeight;
    font-size: 14px;
    margin-left: $gap / 1.5;
  }

  .letter-container {
    width: $answerHeight;
    color: white;
    border-radius: $answerRad;
    line-height: $answerHeight;
    font-weight: bold;
    font-size: 18px;
    transition: 300ms;
  }
}

.letter-container {
    background: $colorGray3;
}

.answer3 .letter-container {
  //background: $colorBlue;
  //background: $colorGray3;
}

.answer2 .letter-container {
  //background: $colorLightBlue;
  //background: $colorGray3;
}

.answer1 .letter-container {
  //background: $colorGreen;
  //background:$colorGray3;
}

.answer4 .letter-container {
  //background: $colorDarkBlue;
  //background: $colorGray3;
}

.question-title {
  margin-top: $gap;
  margin-bottom: $gap;
}

#fullpage {
    //background: $colorGreen;
}

.quiz-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: $colorBackdrop;
}

.draw-intro {
  cursor: pointer;
}

// ---------- intro animation stuff ----------

#logo {
  animation: fill 1s ease forwards 1.8s;
  transition: 300ms;
  margin-left: 52px !important;
  //animation: shiftLogo 1s ease forwards 4s; 
}

#logo path:nth-child(1) {
  stroke-dasharray: 315;
  stroke-dashoffset: 315;
  animation: line-animate 2s ease-in forwards;
}
#logo path:nth-child(2) {
  stroke-dasharray: 194;
  stroke-dashoffset: 194;
  animation: line-animate 2s ease-in forwards 0.3s;
}
#logo path:nth-child(3) {
  stroke-dasharray: 127;
  stroke-dashoffset: 127;
  animation: line-animate 2s ease-in forwards 0.6s;
}
#logo path:nth-child(4) {
  stroke-dasharray: 178;
  stroke-dashoffset: 178;
  animation: line-animate 2s ease-in forwards 0.9s;
}
#logo path:nth-child(5) {
  stroke-dasharray: 188;
  stroke-dashoffset: 188;
  animation: line-animate 2s ease-in forwards 1.2s;
}

// ---------- intro 2 ----------

#logo2 {
  height: 400px;
  transition: 300ms;
  //margin-left: 72px;
  //transform: translateY(-400px);
  margin-left: 52px !important;
}

#logo2 path:nth-child(1) {
  animation: rise 1s ease-in forwards;
  opacity: 0;
}
#logo2 path:nth-child(2) {
  animation: rise 1s ease-in forwards 0.3s;
  opacity: 0;
}
#logo2 path:nth-child(3) {
  animation: rise 1s ease-in forwards 0.6s;
  opacity: 0;
}
#logo2 path:nth-child(4) {
  animation: rise 1s ease-in forwards 0.9s;
  opacity: 0;
}
#logo2 path:nth-child(5) {
  animation: rise 1s ease-in forwards 1.2s;
  opacity: 0;
}

// ---------- intro 3 ----------

#logo3 {
  transition: 300ms;
  margin-left: 52px !important;
  //margin-left: 72px;
}

#logo3 path:nth-child(1) {
  animation: grow 1s ease-in forwards;
  opacity: 0;
}
#logo3 path:nth-child(2) {
  animation: grow 1s ease-in forwards 0.3s;
  opacity: 0;
}
#logo3 path:nth-child(3) {
  animation: grow 1s ease-in forwards 0.6s;
  opacity: 0;
}
#logo3 path:nth-child(4) {
  animation: grow 1s ease-in forwards 0.9s;
  opacity: 0;
}
#logo3 path:nth-child(5) {
  animation: grow 1s ease-in forwards 1.2s;
  opacity: 0;
}

// --------- arrow things ----------

  .arrows {
    position: absolute;
    width: 30px;
    height: 30px;
    transform: translate(50%, 50%) scale(0.6);
    left: -30px;
    right: 0px;
    margin: auto;
    bottom: 112px;
    opacity: 0;
    animation: appear 2s ease forwards 3s;
  }
  
  .arrows:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
    border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
    transform: translate(26.66667px, 106.66667px) rotate(-45deg);
    animation: arrows 3s linear infinite;
  }
  
  .arrows:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
    border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
    transform: translate(53.33333px, 0px) rotate(-45deg);
    animation: arrows 3s linear infinite -1.5s;
  }
  
  @keyframes arrows {
    0% {
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
      transform: translate(-13.33333px, -53.33333px) rotate(-45deg);
    }
    10%, 90% {
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
    50% {
      border-left: 10px solid black;
      border-bottom: 10px solid black;
      transform: translate(-13.33333px, 0px) rotate(-45deg);
    }
    100% {
      border-left: 26.66667px solid transparent;
      border-bottom: 26.66667px solid transparent;
      transform: translate(-13.33333px, 53.33333px) rotate(-45deg);
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes progress {
    0% {
      width: 0%;
    }
  }

  @keyframes circle-shift {
    to {
      transform: scale(0.75);
      margin-top: -60px;
    }
  }

</style>