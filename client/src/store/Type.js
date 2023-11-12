const exercisesData = {
  "elementary-physics": {
    "exercise01": {
      "key": "exercise01",
      "name": "Interpretação de uma Interação Forçada",
      "question": "Dois veículos idênticos, posicionados próximos um do outro em uma pista retilínea de baixo atrito, foram submetidos a um experimento no qual um deles (Veículo A) foi impulsionado em direção ao outro (Veículo B) com uma força constante e uniforme. Qual foi o resultado dessa interação?",
      "options": [
        "Veículo A parou imediatamente, e Veículo B permaneceu parado.", 
        "Veículo A parou imediatamente, e Veículo B foi empurrado na direção oposta.", 
        "Ambos os veículos pararam imediatamente.", 
        "Veículo A continuou a se mover na direção oposta a Veículo B."
      ],
      "answer": "Veículo A parou imediatamente, e Veículo B foi empurrado na direção oposta.",
      "completed": true,
      "groupKey": "elementary-physics",
      "imgPath": "/img/sim1.png"
    },
    "exercise02": {
      "key": "exercise02",
      "name": "Pêndulo Simples: Propriedades Básicas",
      "question": "Um pêndulo simples é composto por uma massa presa a uma corda de comprimento L. Quando o pêndulo é afastado de sua posição de equilíbrio e liberado, ele oscila para frente e para trás. Qual das seguintes afirmações é verdadeira?",
      "options": [
        "O período de oscilação do pêndulo não depende do comprimento da corda.", 
        "O período de oscilação do pêndulo é inversamente proporcional à amplitude dos movimentos.", 
        "O período de oscilação do pêndulo é maior quando a massa da extremidade da corda é maior.", 
        "O período de oscilação do pêndulo é maior quando a amplitude dos movimentos é maior."
      ],
      "answer": "O período de oscilação do pêndulo não depende do comprimento da corda.",
      "groupKey": "elementary-physics",
      "imgPath": "/img/sim2.png"
    },
    "exercise03": {
      "key": "exercise03",
      "name": "Corrida de Carros: Massa e Aceleração",
      "question": "Dois carros, A e B, estão competindo em uma corrida de arrancada em uma pista retilínea. No início, ambos os carros estão parados, e a corrida começa quando eles aceleram. O carro A tem uma massa maior que o carro B. Se ambos os carros aplicam a mesma força para acelerar, qual carro atingirá a velocidade máxima primeiro?",
      "options": [
        "Carro A.", 
        "Carro B.", 
        "Ambos atingirão a velocidade máxima ao mesmo tempo.", 
        "Depende do tamanho dos carros."
      ],
      "answer": "Carro B.",
      "groupKey": "elementary-physics",
      "imgPath": "/img/sim3.png"
    }
  }
};

const subjectData = {
  "elementary-physics": {
    "key": "elementary-physics",
    "name": "Física - Ensino Fundamental",
    "description": "Explore conceitos fundamentais da física em simulações 2D"
  },
  "highschool-physics": {
    "key": "highschool-physics",
    "name": "Física - Ensino Médio",
    "description": "Exercícios com conceitos de física aplicados em simulações 2D",
    "disabled": true
  },
  "college-physics": {
    "key": "college-physics",
    "name": "Física - Universidade",
    "description": "Exercícios envolvendo conteúdos avançados de física de nível universitário",
    "disabled": true
  },
  "elementary-math": {
    "key": "elementary-math",
    "name": "Matemática - Ensino Fundamental",
    "description": "Pratique conceitos fundamentais da matemática com exercícios práticos",
    "disabled": true
  },
  "highschool-math": {
    "key": "highschool-math",
    "name": "Matemática - Ensino Médio",
    "description": "Exercícios para práticar conceitos matemáticos da grade de ensino médio",
    "disabled": true
  }
}

const appCtxDefaultValue = {
  state: {
    app: null,
    subjectsData: subjectData,
    exerciseData: exercisesData,
  },
  setState: (state) => {},
};

export default appCtxDefaultValue;
