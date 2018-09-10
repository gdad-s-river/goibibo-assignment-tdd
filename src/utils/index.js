// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// https://vincent.billey.me/pure-javascript-immutable-array/
function immutableSort(arr, compareFunction) {
  return [...arr].sort(compareFunction);
}

const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase(); // case insensitive compare
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0; // names must be equal
};

export { shuffleArray, immutableSort, sortByName };
