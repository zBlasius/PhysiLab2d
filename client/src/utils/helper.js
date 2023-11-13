const helper = {
  
  calcPercentage(listItems) {
    let totalExercises = listItems.length;
    let exercisesDone = listItems.filter((item) => item.completed).length;
    let calc01 = exercisesDone * 100;
    return (calc01 / totalExercises).toFixed(0);
  }

};

export default helper;
