<template>
<div class="quiz-container">
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">
      <div class="draw-intro" v-on:click="() => { (ani == 3 ? ani = 1 : ani++) }">
        <svg v-if="ani == 1" id="logo" width="204" height="66" viewBox="0 0 204 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="p1" d="M10.9 28.36C10.9 31.216 11.284 33.784 12.052 36.064C12.82 38.32 13.912 40.24 15.328 41.824C16.768 43.384 18.496 44.584 20.512 45.424C22.552 46.264 24.844 46.684 27.388 46.684C29.932 46.684 32.212 46.264 34.228 45.424C36.268 44.584 37.996 43.384 39.412 41.824C40.828 40.24 41.92 38.32 42.688 36.064C43.456 33.784 43.84 31.216 43.84 28.36C43.84 25.504 43.456 22.948 42.688 20.692C41.92 18.412 40.828 16.48 39.412 14.896C37.996 13.312 36.268 12.1 34.228 11.26C32.212 10.42 29.932 10 27.388 10C24.844 10 22.552 10.42 20.512 11.26C18.496 12.1 16.768 13.312 15.328 14.896C13.912 16.48 12.82 18.412 12.052 20.692C11.284 22.948 10.9 25.504 10.9 28.36ZM56.44 64.576H48.448C47.296 64.576 46.252 64.42 45.316 64.108C44.404 63.796 43.564 63.22 42.796 62.38L35.164 53.956C33.94 54.292 32.68 54.544 31.384 54.712C30.112 54.88 28.78 54.964 27.388 54.964C23.452 54.964 19.864 54.304 16.624 52.984C13.384 51.64 10.6 49.78 8.272 47.404C5.968 45.028 4.18 42.22 2.908 38.98C1.636 35.716 1 32.176 1 28.36C1 24.544 1.636 21.016 2.908 17.776C4.18 14.512 5.968 11.692 8.272 9.316C10.6 6.94 13.384 5.092 16.624 3.772C19.864 2.428 23.452 1.756 27.388 1.756C30.028 1.756 32.512 2.068 34.84 2.692C37.168 3.292 39.304 4.156 41.248 5.284C43.192 6.388 44.932 7.744 46.468 9.352C48.028 10.936 49.348 12.712 50.428 14.68C51.508 16.648 52.324 18.784 52.876 21.088C53.452 23.392 53.74 25.816 53.74 28.36C53.74 30.688 53.5 32.92 53.02 35.056C52.54 37.168 51.844 39.148 50.932 40.996C50.044 42.844 48.952 44.548 47.656 46.108C46.36 47.644 44.884 49 43.228 50.176L56.44 64.576Z" stroke="#38814D" stroke-width="2" mask="url(#path-1-outside-1)"/>
            <path id="p2" d="M92.1363 17.452V54.388H86.7002C85.5242 54.388 84.7803 53.848 84.4683 52.768L83.8563 49.816C82.3443 51.352 80.6762 52.6 78.8522 53.56C77.0282 54.496 74.8802 54.964 72.4082 54.964C70.3922 54.964 68.6043 54.628 67.0443 53.956C65.5083 53.26 64.2122 52.288 63.1562 51.04C62.1003 49.792 61.2963 48.316 60.7443 46.612C60.2163 44.884 59.9523 42.988 59.9523 40.924V17.452H68.8443V40.924C68.8443 43.18 69.3603 44.932 70.3923 46.18C71.4483 47.404 73.0203 48.016 75.1083 48.016C76.6443 48.016 78.0843 47.68 79.4283 47.008C80.7723 46.312 82.0443 45.364 83.2443 44.164V17.452H92.1363Z" stroke="#38814D" stroke-width="2" mask="url(#path-1-outside-1)"/>
            <path id="p3" d="M110.169 17.452V54.388H101.241V17.452H110.169ZM111.393 6.688C111.393 7.456 111.237 8.176 110.925 8.848C110.613 9.52 110.193 10.108 109.665 10.612C109.161 11.116 108.561 11.524 107.865 11.836C107.169 12.124 106.425 12.268 105.633 12.268C104.865 12.268 104.133 12.124 103.437 11.836C102.765 11.524 102.177 11.116 101.673 10.612C101.169 10.108 100.761 9.52 100.449 8.848C100.161 8.176 100.017 7.456 100.017 6.688C100.017 5.896 100.161 5.152 100.449 4.456C100.761 3.76 101.169 3.16 101.673 2.656C102.177 2.152 102.765 1.756 103.437 1.468C104.133 1.156 104.865 1 105.633 1C106.425 1 107.169 1.156 107.865 1.468C108.561 1.756 109.161 2.152 109.665 2.656C110.193 3.16 110.613 3.76 110.925 4.456C111.237 5.152 111.393 5.896 111.393 6.688Z" stroke="#38814D" stroke-width="2" mask="url(#path-1-outside-1)"/>
            <path id="p4" d="M145.766 21.124C145.766 21.748 145.658 22.36 145.442 22.96C145.226 23.56 144.938 24.052 144.578 24.436L127.046 47.548H145.226V54.388H116.714V50.68C116.714 50.272 116.81 49.792 117.002 49.24C117.194 48.664 117.482 48.124 117.866 47.62L135.578 24.256H117.758V17.452H145.766V21.124Z" stroke="#38814D" stroke-width="2" mask="url(#path-1-outside-1)"/>
            <path id="p5" d="M202.727 47.728V54.388H173.927V47.728H184.475V17.38C184.475 16.18 184.511 14.944 184.583 13.672L177.095 19.936C176.663 20.272 176.231 20.488 175.799 20.584C175.391 20.656 174.995 20.656 174.611 20.584C174.251 20.512 173.927 20.392 173.639 20.224C173.351 20.032 173.135 19.828 172.991 19.612L170.183 15.76L186.059 2.26H193.367V47.728H202.727Z" stroke="#38814D" stroke-width="2" mask="url(#path-1-outside-1)"/>
        </svg>
        <svg v-if="ani == 2" id="logo2" width="203" height="65" viewBox="0 0 203 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6363 27.9721C10.6363 30.8281 11.0203 33.3961 11.7883 35.6761C12.5563 37.9321 13.6483 39.8521 15.0643 41.4361C16.5043 42.9961 18.2323 44.1961 20.2483 45.0361C22.2883 45.8761 24.5803 46.2961 27.1243 46.2961C29.6683 46.2961 31.9483 45.8761 33.9643 45.0361C36.0043 44.1961 37.7323 42.9961 39.1483 41.4361C40.5643 39.8521 41.6563 37.9321 42.4243 35.6761C43.1923 33.3961 43.5763 30.8281 43.5763 27.9721C43.5763 25.1161 43.1923 22.5601 42.4243 20.3041C41.6563 18.0241 40.5643 16.0921 39.1483 14.5081C37.7323 12.9241 36.0043 11.7121 33.9643 10.8721C31.9483 10.0321 29.6683 9.61206 27.1243 9.61206C24.5803 9.61206 22.2883 10.0321 20.2483 10.8721C18.2323 11.7121 16.5043 12.9241 15.0643 14.5081C13.6483 16.0921 12.5563 18.0241 11.7883 20.3041C11.0203 22.5601 10.6363 25.1161 10.6363 27.9721ZM56.1763 64.1881H48.1843C47.0323 64.1881 45.9883 64.0321 45.0523 63.7201C44.1403 63.4081 43.3003 62.8321 42.5323 61.9921L34.9003 53.5681C33.6763 53.9041 32.4163 54.1561 31.1203 54.3241C29.8483 54.4921 28.5163 54.5761 27.1243 54.5761C23.1883 54.5761 19.6003 53.9161 16.3603 52.5961C13.1203 51.2521 10.3363 49.3921 8.00833 47.0161C5.70433 44.6401 3.91633 41.8321 2.64433 38.5921C1.37233 35.3281 0.736328 31.7881 0.736328 27.9721C0.736328 24.1561 1.37233 20.6281 2.64433 17.3881C3.91633 14.1241 5.70433 11.3041 8.00833 8.92806C10.3363 6.55206 13.1203 4.70406 16.3603 3.38406C19.6003 2.04006 23.1883 1.36806 27.1243 1.36806C29.7643 1.36806 32.2483 1.68006 34.5763 2.30406C36.9043 2.90406 39.0403 3.76806 40.9843 4.89606C42.9283 6.00006 44.6683 7.35606 46.2043 8.96406C47.7643 10.5481 49.0843 12.3241 50.1643 14.2921C51.2443 16.2601 52.0603 18.3961 52.6123 20.7001C53.1883 23.0041 53.4763 25.4281 53.4763 27.9721C53.4763 30.3001 53.2363 32.5321 52.7563 34.6681C52.2763 36.7801 51.5803 38.7601 50.6683 40.6081C49.7803 42.4561 48.6883 44.1601 47.3923 45.7201C46.0963 47.2561 44.6203 48.6121 42.9643 49.7881L56.1763 64.1881Z" fill="#38814D"/>
            <path d="M91.8726 17.0641V54.0001H86.4366C85.2606 54.0001 84.5166 53.4601 84.2046 52.3801L83.5926 49.4281C82.0806 50.9641 80.4126 52.2121 78.5886 53.1721C76.7646 54.1081 74.6166 54.5761 72.1446 54.5761C70.1286 54.5761 68.3406 54.2401 66.7806 53.5681C65.2446 52.8721 63.9486 51.9001 62.8926 50.6521C61.8366 49.4041 61.0326 47.9281 60.4806 46.2241C59.9526 44.4961 59.6886 42.6001 59.6886 40.5361V17.0641H68.5806V40.5361C68.5806 42.7921 69.0966 44.5441 70.1286 45.7921C71.1846 47.0161 72.7566 47.6281 74.8446 47.6281C76.3806 47.6281 77.8206 47.2921 79.1646 46.6201C80.5086 45.9241 81.7806 44.9761 82.9806 43.7761V17.0641H91.8726Z" fill="#38814D"/>
            <path d="M109.905 17.0641V54.0001H100.977V17.0641H109.905ZM111.129 6.30006C111.129 7.06806 110.973 7.78806 110.661 8.46006C110.349 9.13206 109.929 9.72006 109.401 10.2241C108.897 10.7281 108.297 11.1361 107.601 11.4481C106.905 11.7361 106.161 11.8801 105.369 11.8801C104.601 11.8801 103.869 11.7361 103.173 11.4481C102.501 11.1361 101.913 10.7281 101.409 10.2241C100.905 9.72006 100.497 9.13206 100.185 8.46006C99.8972 7.78806 99.7532 7.06806 99.7532 6.30006C99.7532 5.50806 99.8972 4.76406 100.185 4.06806C100.497 3.37206 100.905 2.77206 101.409 2.26806C101.913 1.76406 102.501 1.36806 103.173 1.08006C103.869 0.768059 104.601 0.612061 105.369 0.612061C106.161 0.612061 106.905 0.768059 107.601 1.08006C108.297 1.36806 108.897 1.76406 109.401 2.26806C109.929 2.77206 110.349 3.37206 110.661 4.06806C110.973 4.76406 111.129 5.50806 111.129 6.30006Z" fill="#38814D"/>
            <path d="M145.502 20.7361C145.502 21.3601 145.394 21.9721 145.178 22.5721C144.962 23.1721 144.674 23.6641 144.314 24.0481L126.782 47.1601H144.962V54.0001H116.45V50.2921C116.45 49.8841 116.546 49.4041 116.738 48.8521C116.93 48.2761 117.218 47.7361 117.602 47.2321L135.314 23.8681H117.494V17.0641H145.502V20.7361Z" fill="#38814D"/>
            <path d="M202.463 47.3401V54.0001H173.663V47.3401H184.211V16.9921C184.211 15.7921 184.247 14.5561 184.319 13.2841L176.831 19.5481C176.399 19.8841 175.967 20.1001 175.535 20.1961C175.127 20.2681 174.731 20.2681 174.347 20.1961C173.987 20.1241 173.663 20.0041 173.375 19.8361C173.087 19.6441 172.871 19.4401 172.727 19.2241L169.919 15.3721L185.795 1.87206H193.103V47.3401H202.463Z" fill="#38814D"/>
        </svg>
        <svg v-if="ani == 3" id="logo3" width="203" height="65" viewBox="0 0 203 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6363 27.9721C10.6363 30.8281 11.0203 33.3961 11.7883 35.6761C12.5563 37.9321 13.6483 39.8521 15.0643 41.4361C16.5043 42.9961 18.2323 44.1961 20.2483 45.0361C22.2883 45.8761 24.5803 46.2961 27.1243 46.2961C29.6683 46.2961 31.9483 45.8761 33.9643 45.0361C36.0043 44.1961 37.7323 42.9961 39.1483 41.4361C40.5643 39.8521 41.6563 37.9321 42.4243 35.6761C43.1923 33.3961 43.5763 30.8281 43.5763 27.9721C43.5763 25.1161 43.1923 22.5601 42.4243 20.3041C41.6563 18.0241 40.5643 16.0921 39.1483 14.5081C37.7323 12.9241 36.0043 11.7121 33.9643 10.8721C31.9483 10.0321 29.6683 9.61206 27.1243 9.61206C24.5803 9.61206 22.2883 10.0321 20.2483 10.8721C18.2323 11.7121 16.5043 12.9241 15.0643 14.5081C13.6483 16.0921 12.5563 18.0241 11.7883 20.3041C11.0203 22.5601 10.6363 25.1161 10.6363 27.9721ZM56.1763 64.1881H48.1843C47.0323 64.1881 45.9883 64.0321 45.0523 63.7201C44.1403 63.4081 43.3003 62.8321 42.5323 61.9921L34.9003 53.5681C33.6763 53.9041 32.4163 54.1561 31.1203 54.3241C29.8483 54.4921 28.5163 54.5761 27.1243 54.5761C23.1883 54.5761 19.6003 53.9161 16.3603 52.5961C13.1203 51.2521 10.3363 49.3921 8.00833 47.0161C5.70433 44.6401 3.91633 41.8321 2.64433 38.5921C1.37233 35.3281 0.736328 31.7881 0.736328 27.9721C0.736328 24.1561 1.37233 20.6281 2.64433 17.3881C3.91633 14.1241 5.70433 11.3041 8.00833 8.92806C10.3363 6.55206 13.1203 4.70406 16.3603 3.38406C19.6003 2.04006 23.1883 1.36806 27.1243 1.36806C29.7643 1.36806 32.2483 1.68006 34.5763 2.30406C36.9043 2.90406 39.0403 3.76806 40.9843 4.89606C42.9283 6.00006 44.6683 7.35606 46.2043 8.96406C47.7643 10.5481 49.0843 12.3241 50.1643 14.2921C51.2443 16.2601 52.0603 18.3961 52.6123 20.7001C53.1883 23.0041 53.4763 25.4281 53.4763 27.9721C53.4763 30.3001 53.2363 32.5321 52.7563 34.6681C52.2763 36.7801 51.5803 38.7601 50.6683 40.6081C49.7803 42.4561 48.6883 44.1601 47.3923 45.7201C46.0963 47.2561 44.6203 48.6121 42.9643 49.7881L56.1763 64.1881Z" fill="#38814D"/>
            <path d="M91.8726 17.0641V54.0001H86.4366C85.2606 54.0001 84.5166 53.4601 84.2046 52.3801L83.5926 49.4281C82.0806 50.9641 80.4126 52.2121 78.5886 53.1721C76.7646 54.1081 74.6166 54.5761 72.1446 54.5761C70.1286 54.5761 68.3406 54.2401 66.7806 53.5681C65.2446 52.8721 63.9486 51.9001 62.8926 50.6521C61.8366 49.4041 61.0326 47.9281 60.4806 46.2241C59.9526 44.4961 59.6886 42.6001 59.6886 40.5361V17.0641H68.5806V40.5361C68.5806 42.7921 69.0966 44.5441 70.1286 45.7921C71.1846 47.0161 72.7566 47.6281 74.8446 47.6281C76.3806 47.6281 77.8206 47.2921 79.1646 46.6201C80.5086 45.9241 81.7806 44.9761 82.9806 43.7761V17.0641H91.8726Z" fill="#38814D"/>
            <path d="M109.905 17.0641V54.0001H100.977V17.0641H109.905ZM111.129 6.30006C111.129 7.06806 110.973 7.78806 110.661 8.46006C110.349 9.13206 109.929 9.72006 109.401 10.2241C108.897 10.7281 108.297 11.1361 107.601 11.4481C106.905 11.7361 106.161 11.8801 105.369 11.8801C104.601 11.8801 103.869 11.7361 103.173 11.4481C102.501 11.1361 101.913 10.7281 101.409 10.2241C100.905 9.72006 100.497 9.13206 100.185 8.46006C99.8972 7.78806 99.7532 7.06806 99.7532 6.30006C99.7532 5.50806 99.8972 4.76406 100.185 4.06806C100.497 3.37206 100.905 2.77206 101.409 2.26806C101.913 1.76406 102.501 1.36806 103.173 1.08006C103.869 0.768059 104.601 0.612061 105.369 0.612061C106.161 0.612061 106.905 0.768059 107.601 1.08006C108.297 1.36806 108.897 1.76406 109.401 2.26806C109.929 2.77206 110.349 3.37206 110.661 4.06806C110.973 4.76406 111.129 5.50806 111.129 6.30006Z" fill="#38814D"/>
            <path d="M145.502 20.7361C145.502 21.3601 145.394 21.9721 145.178 22.5721C144.962 23.1721 144.674 23.6641 144.314 24.0481L126.782 47.1601H144.962V54.0001H116.45V50.2921C116.45 49.8841 116.546 49.4041 116.738 48.8521C116.93 48.2761 117.218 47.7361 117.602 47.2321L135.314 23.8681H117.494V17.0641H145.502V20.7361Z" fill="#38814D"/>
            <path d="M202.463 47.3401V54.0001H173.663V47.3401H184.211V16.9921C184.211 15.7921 184.247 14.5561 184.319 13.2841L176.831 19.5481C176.399 19.8841 175.967 20.1001 175.535 20.1961C175.127 20.2681 174.731 20.2681 174.347 20.1961C173.987 20.1241 173.663 20.0041 173.375 19.8361C173.087 19.6441 172.871 19.4401 172.727 19.2241L169.919 15.3721L185.795 1.87206H193.103V47.3401H202.463Z" fill="#38814D"/>
        </svg>
      </div>
      <div class="arrows"></div>
    </div>
    <div class="section">
      <div class="quiz-card">
        <h3 class="question-title">Question 1 example</h3>
          <div class="answers-container">
            <div v-on:click="handleAns(1)" :class="ans == 1 ? 'answer-selected' : ''" class="answer answer1"><div class="letter-container">A</div><span>Answer 1</span></div>
            <div v-on:click="handleAns(2)" :class="ans == 2 ? 'answer-selected' : ''" class="answer answer2"><div class="letter-container">B</div><span>Answer 2</span></div>
            <div v-on:click="handleAns(3)" :class="ans == 3 ? 'answer-selected' : ''" class="answer answer3"><div class="letter-container">C</div><span>Answer 3</span></div>
            <div v-on:click="handleAns(4)" :class="ans == 4 ? 'answer-selected' : ''" class="answer answer4"><div class="letter-container">D</div><span>Answer 4</span></div>
          </div>
          <div class="bottom-actions">
            Continue
          </div>
      </div>
    </div>
    <div class="section">
        <div class="quiz-card">
          <h3 class="question-title">Question 2 example</h3>
          <div class="answers-container">
            <div v-on:click="handleAns(1)" :class="ans == 1 ? 'answer-selected' : ''" class="answer answer1"><div class="letter-container">A</div><span>Answer 1</span></div>
            <div v-on:click="handleAns(2)" :class="ans == 2 ? 'answer-selected' : ''" class="answer answer2"><div class="letter-container">B</div><span>Answer 2</span></div>
            <div v-on:click="handleAns(3)" :class="ans == 3 ? 'answer-selected' : ''" class="answer answer3"><div class="letter-container">C</div><span>Answer 3</span></div>
            <div v-on:click="handleAns(4)" :class="ans == 4 ? 'answer-selected' : ''" class="answer answer4"><div class="letter-container">D</div><span>Answer 4</span></div>
          </div>
          <div class="bottom-actions">
            Continue
          </div>
        </div>
    </div>
    <div class="section">

    </div>
  </full-page>
</div>
</template>

<script>
export default {
    data() {
        return {
            ani: 1,
            ans: null,
            options: {
                scrollingSpeed: 1400,
                fadingEffect: true
            },
        }
    },
    mounted() {
      if(this.ani == 1) {
        for(let i = 0; i < 5; i++) {
            console.log(document.getElementById('p'+(i+1)).getTotalLength());
        }
      }
    },
    methods: {
      handleAns(choice) {
        console.log('picked: ' + choice);
        this.ans = choice;
      }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

.quiz-card {
  padding: $gap;

  h3 {
      padding-bottom: $gap;
  }
}

.bottom-actions {
  margin-top: 42px;
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
    width: 120px !important;
    background: $colorOrange !important;
  }
}

.answer {
  background: white;
  margin-bottom: $gap;
  height: 80px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: $rad;
  display: flex;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    //background:rgba(0, 0, 0, 0.04);
    .letter-container {
      width: 100px;
    }
  }

  span {
    line-height: 80px;
    font-size: 18px;
    margin-left: $gap;
  }

  .letter-container {
    width: 80px;
    color: white;
    border-radius: $rad 0px 0px $rad;
    line-height: 80px;
    font-weight: bold;
    font-size: 18px;
    transition: 300ms;
  }
}

.answer3 .letter-container {
  //background: $colorBlue;
  background: $colorGray3;
}

.answer2 .letter-container {
  //background: $colorLightBlue;
  background: $colorGray3;
}

.answer1 .letter-container {
  //background: $colorGreen;
  background:$colorGray3;
}

.answer4 .letter-container {
  //background: $colorDarkBlue;
  background: $colorGray3;
}

.question-title {

}

#fullpage {
    //background: $colorGreen;
}

.quiz-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.draw-intro {
  cursor: pointer;
}

// ---------- intro animation stuff ----------

#logo {
  animation: fill 1s ease forwards 3.2s;
  transition: 300ms;
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
  //transform: translateY(-400px);
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

@keyframes line-animate {
  to {
      stroke-dashoffset: 0;
  }
}

@keyframes fill {
  from {
    fill: transparent;
  }
  to {
    fill: #38814D;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes grow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// --------- arrow things ----------

  .arrows {
    position: absolute;
    width: 30px;
    height: 30px;
    transform: translate(50%, 50%) scale(0.6);
    left: 0px;
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
      border-left: 10px solid $colorGreen;
      border-bottom: 10px solid $colorGreen;
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

  .quiz-card {
    background:#f7f7f7;
    border-radius: $rad;
    width: 70%;
    height: 600px;
    margin: auto;
    margin-top: 60px;
  }

</style>