/**
 * Напишите функцию capitalize(input), возвращающую копию строки input,
 * в которой каждое слово начинается с заглавной буквы.
 *
 * "Слово" в данном контексте - последовательность юникод-символов из группы "letters".
 * В целях упрощения в тестовых кейсах будут использоваться только строки из латинских букв
 * и кириллицы. Слова с дефисами ("Что-то", "кто-либо" и т.д.) считаются одним словом.
 *
 * capitalize('А роза упала на лапу Азора') === 'А Роза Упала На Лапу Азора'
 * capitalize('Use the force, Luke') === 'Use The Force, Luke'
 *
 * @param {string} input строка с произвольным предложением.
 * @return {string}
 */
function capitalize(input) {
    let elems = input.split(' ');
    let result = [];

    for(let i = 0; i< elems.length; i++) {
      let word =  elems[i].split('')[0].toUpperCase() + elems[i].slice(1,elems[i].split('').length);
      result.push(word);
    }
    console.log(result.join(' '));
}

capitalize('А роза упала на лапу Азора');