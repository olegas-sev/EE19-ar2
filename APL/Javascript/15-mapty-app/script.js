'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Qs's
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)
    constructor(coords, distance, duration) {
        this.coords = coords // [lat, lng]
        this.distance = distance // in km
        this.duration = duration // in min
        this.calcPace()
    }
    calcPace() {
        // min/km
        this.pace = this.duration / this.distance
        return this.pace
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.calcSpeed()
    }
    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}
class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain
    }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const cycling1 = new Cycling([39, -12], 27, 95, 523)
// console.log(run1);
// console.log(cycling1);

////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
    // Private instances
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();


        form.addEventListener('submit', this._newWorkout.bind(this));


        inputType.addEventListener('change', this._toggleElevationField)
    }

    _getPosition() {
        // Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Since you declined sharing your position the map will not work!')
                }
            );
        }
    }

    _loadMap(position) {
        console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude, longitude);
        const coords = [latitude, longitude]
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

        this.#map = L.map('map').setView(coords, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Handle on map click
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        e.preventDefault()

        // Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''

        const { lat, lng } = this.#mapEvent.latlng
        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: ['running-popup']
            }))
            .setPopupContent('Workout').openPopup();
    }

}

const app = new App();