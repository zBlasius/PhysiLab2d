const appCtxDefaultValue = {
  state: {
    app: null,
    subjectsData: {
      "elementary-physics": {
        key: "elementary-physics",
        name: "Física - Ensino Fundamental",
        image: "physics.jpeg",
      },
      "highschool-physics": {
        key: "highschool-physics",
        name: "Física - Ensino Médio",
        image: "physics.jpeg",
        disabled: true,
      },
      "college-physics": {
        key: "college-physics",
        name: "Física - Universidade",
        image: "physics.jpeg",
        disabled: true,
      },
    },
    exerciseData: {
      "elementary-physics": {
        exercise01: {
          key: "exercise01",
          name: "",
          question: "",
          options: [],
          answer: "",
          completed: true,
        },
      },
    },
  },
  setState: (state) => {},
};

export default appCtxDefaultValue;
