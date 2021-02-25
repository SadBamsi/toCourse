const Keyboard = {
    elements: {
        keyboard: null,
        keys: [],
        main: null,
        audio: null,
        recognition: null,
    },
    eventHandlers: {
        oninput: false,
        onclose: false
    },
    properties: {
        value: '',
        capsLock: false,
        lang: false,
        shift: false,
        speechOn: false,
        mute: false
    },

    keyLayoutEN: [
        '`', "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", '{', '}', "enter",
        "a", "s", "d", "f", "g", "h", "j", "k", "l", ';', "done",
         "caps","z", "x", "c", "v", "b", "n", "m", ",", ".", "?", 'shift',
        'mic', "space", 'left', 'right', 'lang', 'mute'
    ],
    keyLayoutRu: [
        "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'enter',
        "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'done',
        "caps","я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", 'shift',
        'mic', "space", 'left', 'right', 'lang', 'mute'
    ],
    keyLayoutShift: [
        "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", 'enter',
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', 'done',
        "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", 'shift',
        'mic', 'space', 'left', 'right', 'lang', 'mute'
    ],
    keyLayoutShiftRU: [
        "~", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'enter',
        "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'done',
        "caps","я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", 'shift',
        'mic', 'space', 'left', 'right', 'lang', 'mute'
    ],

    init() {
        this.elements.main = document.createElement('div');
        this.elements.keyboard = document.createElement('div');
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keyboard.classList.add('keyboard__keys');
        this.elements.keyboard.appendChild(this._createKeys())
        this.elements.main.insertAdjacentElement('beforeend', this.elements.keyboard)
        document.body.insertAdjacentElement('beforeend', this.elements.main);
        this.elements.audio = document.querySelectorAll('audio');
        this._RealKeyboardListener()

        document.querySelectorAll('.use-keyboard-input').forEach((el) => {
            el.addEventListener('focus', () => {
                this.open(el.value, (currentValue) => {
                    el.value = currentValue;
                })
            })
        })
    },

    _createKeys() {
        let data;
        data = this.properties.lang ?
            this.properties.shift ?
                this.keyLayoutShiftRU : this.keyLayoutRu
            : this.properties.shift ?
                this.keyLayoutShift : this.keyLayoutEN;
        const innerIcon = (icon_name) => {
            return `<i class="material-icons">${icon_name}<i>`
        }
        let fragment = document.createDocumentFragment();
        data.forEach((key) => {
            let button = document.createElement('button');
            let keyName = document.createElement('span');
            const insertLinearBreak = ['backspace', 'enter', 'done', 'shift'].indexOf(key) !== -1;
            button.setAttribute('type', 'button');
            button.classList.add('keyboard__key');
            switch(key) {
                case 'space':
                    button.classList.add('keyboard__key--extra-wide')
                    button.innerHTML = innerIcon('space_bar');
                    button.setAttribute('data-id', ' ');
                    button.addEventListener('click', () => {
                        let area = document.querySelector('.use-keyboard-input');
                        let pos = this._getCaretPosition(area);
                        if (pos != this.properties.value.length) {
                            let currentVal = this.properties.value.split('').slice(0, pos).join('');
                            let end = this.properties.value.split('').slice(pos, this.properties.value.length).join('');
                            currentVal += ' ';
                            this.properties.value = currentVal + end;
                        } else {
                            this.properties.value += ' ';
                        }   
                        this.properties.mute ? this._playAudio(key) : false;
                        this._thiggerEventHandler('oninput');
                        this._setCaretPosition(area, pos + 1);
                        area.focus();
                    })
                    break
                case 'backspace' :
                    button.classList.add('keyboard__key--wide');
                    button.innerHTML = innerIcon(key);
                    button.setAttribute('data-id', 'Backspace');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio(key) : false;
                        let area = document.querySelector('.use-keyboard-input')
                        let pos = this._getCaretPosition(area) - 1;
                        this.properties.value = this.properties.value.split('').map((el, i) => { if (i !== pos) return el }).join('');
                        this._thiggerEventHandler('oninput');
                        this._setCaretPosition(area, pos);
                        if (this.IsSound) playSound(true)
                        document.querySelector('.use-keyboard-input').focus()
                    })

                    break;
                case 'caps': 
                    button.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    button.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    button.innerHTML = innerIcon('keyboard_capslock');
                    button.setAttribute('data-id', 'CapsLock');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('shift') : false;
                        this._toggleCapsLock();
                    })
                    break;
                case 'shift':
                    button.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    button.classList.toggle('keyboard__key--active', this.properties.shift);
                    keyName.textContent = key;
                    button.innerHTML = innerIcon('arrow_upward');
                    button.insertAdjacentElement('beforeend', keyName);
                    button.setAttribute('data-id', 'Shift');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio(key) : false;
                        this._toggleShift();
                        button.classList.toggle('keyboard__key--active', this.properties.shift);
                    })
                    break
                case 'enter': 
                    button.classList.add('keyboard__key--wide');
                    button.innerHTML = innerIcon('keyboard_return');
                    button.setAttribute('data-id', 'Enter');


                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('space') : false;
                        this.properties.value += "\n";
                        this._thiggerEventHandler('oninput');
                        document.querySelector('.use-keyboard-input').focus()
                    }) 
                    break;
                case 'done': 
                    button.classList.add('keyboard__key--wide');
                    button.innerHTML = innerIcon('check_circle');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('shift') : false;
                        this.close();
                        this._thiggerEventHandler('onclose');
                    })
                    break;
                case 'lang':
                    keyName.textContent = this.properties.lang ? 'ru' : 'en';
                    button.innerHTML = innerIcon('language');
                    button.classList.add('keyboard__key--wide');
                    button.insertAdjacentElement('beforeend', keyName);
                    
                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('lang') : false;
                        this._changeLang();
                    })
                    break;
                case 'mic': 
                    button.innerHTML = this.properties.speechOn ? innerIcon('mic') : innerIcon('mic_none') ;

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('shift') : false;
                        this._controlMicrophone();
                    })
                    break;
                case 'mute': 
                    button.innerHTML = this.properties.mute ? innerIcon('volume_up') : innerIcon('volume_off');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('lang') : false;
                        this._changeMute();
                    })
                    break;
                case 'left': 
                    button.innerHTML = innerIcon('arrow_back');
                    button.setAttribute('data-id', 'ArrowLeft');

                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('backspace') : false;
                        let area = document.querySelector('.use-keyboard-input')
                        let pos = this._getCaretPosition(area) - 1;
                        this._setCaretPosition(area, pos)
                        if (this.IsSound) playSound(true)
                        document.querySelector('.use-keyboard-input').focus()
                    })
                    break;
                case 'right': 
                    button.innerHTML = innerIcon('arrow_forward');
                    button.setAttribute('data-id', 'ArrowRight');


                    button.addEventListener('click', () => {
                        this.properties.mute ? this._playAudio('backspace') : false;
                        let area = document.querySelector('.use-keyboard-input')
                        let pos = this._getCaretPosition(area) + 1;
                        this._setCaretPosition(area, pos)
                        if (this.IsSound) playSound(true)
                        document.querySelector('.use-keyboard-input').focus();
                    })
                    break;
                default: 
                    button.textContent = this.properties.capsLock ? key.toUpperCase() : key ;
                    button.addEventListener('click', () => {
                        this.properties.mute ? this.properties.lang ? this._playAudio('en') : this._playAudio('ru') :  false;
                        let area = document.querySelector('.use-keyboard-input');
                        let pos = this._getCaretPosition(area);
                        if (pos != this.properties.value.length) {
                            let currentVal = this.properties.value.split('').slice(0, pos).join('');
                            let end = this.properties.value.split('').slice(pos, this.properties.value.length).join('');
                            currentVal += this.properties.capsLock ? key.toUpperCase() : key;
                            this.properties.value = currentVal + end;
                        } else {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key;
                        }
                        this._thiggerEventHandler('oninput');
                        this._setCaretPosition(area, pos + 1);
                        area.focus();
                    })
                
            }
            fragment.appendChild(button)
            insertLinearBreak ?  fragment.appendChild(document.createElement('br')) : false;
        })
        return fragment;
    },

    _thiggerEventHandler(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName] (this.properties.value)
        }
    },

    _getCaretPosition(target) {
        let CaretPos = 0;
        if (document.selection) {
            target.focus();
            let selection = document.selection.createRange();
            selection.moveStart('character', -target.value.length);
            CaretPos = selection.text.length;
        }
        else if (target.selectionStart || target.selectionStart == '0') {
            CaretPos = target.selectionStart;
        }
        return CaretPos;
    },

    _setCaretPosition(target, pos) {
        if (target.setSelectionRange) {
            // target.focus();
            target.setSelectionRange(pos, pos);
        } else if (target.createTextRange) {
            let range = target.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this._removeEl()
    },

    _changeLang () {
        this.properties.lang =  !this.properties.lang;
        this._removeEl()
    },

    _removeEl() {
        this.elements.keyboard.innerHTML = '';
        this.elements.keyboard.appendChild(this._createKeys())
        this._RealKeyboardListener();
    },


    _changeMute() {
        this.properties.mute = !this.properties.mute;
        this._removeEl()
    },

    _controlMicrophone () {
        this.properties.speechOn = !this.properties.speechOn;
        this._removeEl();
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        this._removeEl()
    },

    _playAudio(item) {
        let audio;
        for (let sound of this.elements.audio) {
           sound.dataset.id == item ? audio = sound : false;
        }
        audio.currentTime = 0;
        audio.play();
    },

    _RealKeyboardListener() {
        let buttons = document.querySelectorAll('.keyboard__key');
        document.addEventListener('keydown', (e) => {
            let key = e.key;
            console.log(key);
            buttons.forEach((button) => {
                if (button.dataset.id == key) {
                    button.classList.add('keyboard__key--active')
                } else if (button.textContent.toLowerCase() == key ) {
                    button.classList.add('keyboard__key--active')
                }
            })
        })
        document.addEventListener('keyup', (e) => {
            let key = e.key;
            buttons.forEach((button) => {
                if (button.dataset.id == key) {
                    button.classList.remove('keyboard__key--active')
                } else if (button.textContent.toLowerCase() == key ) {
                    button.classList.remove('keyboard__key--active')
                }
            })
        })
    },

    open(initialValue = '', oninput, onclose) {
        this.properties.value = initialValue;
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden')
    },
    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden')
    }
}


document.addEventListener("DOMContentLoaded", () => {
    Keyboard.init();
})