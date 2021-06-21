let input = null,
  label = null;

window.addEventListener('load', () => {
  DOM.loadInputs();
  DOM.addEvents();
});

const DOM = {
  loadInputs() {
    input = document.querySelector('#temperatureInput');
    label = document.querySelector('#temperatureLabel');
  },

  addEvents() {
    input.addEventListener('change', DOM.handleInputChange);
  },

  handleInputChange(event) {
    thermometre.checkTemperature(event.target.value);
  },

  temperatureResult: {
    className: null,
    update(message, name) {
      if (this.className) {
        label.classList.remove(this.className);
      }
      this.className = name;
      label.classList.add(this.className);
      label.innerText = message;
    }
  }
};

const thermometre = {
  checkTemperature(temperature) {
    const normal = 36,
      mild = 37.1,
      fever = 38.5,
      min = 32,
      max = 45;
    try {
      if (temperature > max || temperature < min) {
        throw new Error('Enter a value between 32 and 45');
      } else if (temperature < (normal - 1)) {
        DOM.temperatureResult.update('Temperature indicates hypothermia', 'hypothermia');
      } else if (temperature >= fever) {
        console.log('fever');
        DOM.temperatureResult.update('Temperature indicates fever', 'fever');
      } else if (temperature >= mild) {
        DOM.temperatureResult.update('Temperature indicates mild fever', 'mild');
      } else {
        DOM.temperatureResult.update('Temperature is normal', 'normal');
      }
    } catch (error) {
      console.log(error.message);
      DOM.temperatureResult.update(error.message, 'error',);
    }
  }
};