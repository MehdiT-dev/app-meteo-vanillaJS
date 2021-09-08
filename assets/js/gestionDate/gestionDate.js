const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let d = new Date();
let options = {weekday: 'long'};
let currentDay = d.toLocaleDateString('fr-FR', options);
currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let sortedWeekDays = weekDays.slice(weekDays.indexOf(currentDay)).concat(weekDays.slice(0, weekDays.indexOf(currentDay)));

export default sortedWeekDays;