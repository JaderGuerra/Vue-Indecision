const indecision = Vue.component("indecision", {
  /* html */
  template: `
      <div>
			<img v-if="image" :src="image"/>
			<div class="bg-dark"></div>

			<div class="indecision-container">
			<div class="question">
				<input v-model.trim="question" placeholder="Hazme una pregunta" type="text">
				<p >
				Recuerda terminar con un signo de interrogacion (?) 
				</p>
			</div>
				<div v-if="isValidQuestion" class="question">
					<h2>{{question}}</h2>
					<h1>{{translate}}</h1>
				</div>
			</div>
      </div>
   `,
  data() {
    return {
      question: null,
      answer: null,
      image: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      this.answer = "Pensando...";
      const data = await fetch("https://yesno.wtf/api");
      const { answer, image } = await data.json();
      this.image = image;
      this.answer = answer;
      this.isValidQuestion = true;
    },
  },
  watch: {
    question(value, oldvalue) {
      if (!value.includes("?")) return;
      this.getAnswer();
    },
  },
  computed: {
    translate() {
      return this.answer === "Yes" ? "Si" : "No";
    },
  },
});
export default indecision;
