document.addEventListener('DOMContentLoaded',() => {
let data = [
    {
        "name": "Jennifer",
        "img": "./../../assets/images/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "./../../assets/images/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "./../../assets/images/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "./../../assets/images/pets-scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "./../../assets/images/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "./../../assets/images/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "./../../assets/images/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "./../../assets/images/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]
    /* Burger */
    let headerOverlay = document.querySelector('.header_overlay');
    let logo = document.querySelector('.logo');
    let mobileBtn = document.querySelector('.menu_mobile-btn');
    let overlay = document.querySelector('.overlay');
    let menu = document.querySelector('.top_menu')
    mobileBtn.addEventListener('click', () => {
        logo.classList.toggle('active');
        headerOverlay.classList.toggle('opened')
        mobileBtn.classList.toggle('opened');
        menu.classList.toggle('shower');
        overlay.classList.toggle('opened');
        overlay.onclick = () => {
            logo.classList.toggle('active');
            headerOverlay.classList.toggle('opened')
            mobileBtn.classList.toggle('opened');
            menu.classList.toggle('shower');
            overlay.classList.toggle('opened');
            document.body.classList.toggle('no-scroll');
        }
        document.body.classList.toggle('no-scroll')
    });

    /*  Rrsize document */

    let point;
    function checkWidth() {
      let width = document.body.clientWidth;
      if (width >= 320 && width < 601) {
        return point = 16;
      } else if ( width >= 768 && width < 1280 ) {
        return point = 8;
      } else {
        return point = 6;
      }
    }
    checkWidth()
    window.addEventListener('resize', checkWidth);

    /*  */

    /* Slider */


    let slider = document.querySelector('.carousel');
    

    let petCards = document.querySelectorAll('.card');
    let petNames = document.querySelectorAll('.card_name');
    let petAvatars = document.querySelectorAll('.card_photo');

    slider.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel_control')) {
          picturesZone.classList.add('hidden');
          setTimeout((e) => {
            drowSlider(8);
            picturesZone.classList.remove('hidden')
          }, 1000);
        }
        /* Popup */
        else if (e.target.classList.contains('card')) {
          popup.classList.remove('hidden');
          document.body.classList.add('no-scroll');
          let id = e.target.dataset.id;
          drowPopup(data[id]);
            closePopupBtn.onclick = () =>{
          document.body.classList.add('no-scroll');
              popup.classList.add('hidden');
              document.body.classList.remove('no-scroll');
            };
            popup.onclick = (e) => { 
              if (e.target.classList.contains('popup_overlay')) {
                popup.classList.add('hidden');
                document.body.classList.remove('no-scroll');
              }
            }
          }
      })

    
    /* Popup */
    let popup = document.querySelector('.popup_overlay');
    let popupName = document.querySelector('.popup_pet-name');
    let popupImage = document.querySelector('.popup_avatar');
    let popupPetType = document.querySelector('.popup_pet-type');
    let popupPetDescription = document.querySelector('.popup_pet-description');
    let popupPetAge = document.querySelector('.property_age');
    let popupPetInoculations = document.querySelector('.property_inoculations');
    let popupPetDiseases = document.querySelector('.property_diseases');
    let popupPetParasites = document.querySelector('.property_parasites');
    let closePopupBtn = document.querySelector('.popup_close-btn');

    function drowPopup(item) {
      popupImage.style.backgroundImage = `url(${item.img})`;
      popupName.textContent = item.name;
      popupPetType.textContent = `${item.type} - ${item.breed}`;
      popupPetDescription.textContent = item.description;
      popupPetAge.textContent = item.age;
      popupPetInoculations.textContent = item.inoculations;
      popupPetDiseases.textContent = item.diseases;
      popupPetParasites.textContent = item.parasites;
    }



    /* Draw Slider */

    let copyData = Array.from(data);
    function createdNewListImagesToSlider(breakpoint) {
      let listSliderImage = new Set();
      while(listSliderImage.size < breakpoint) {
        copyData = copyData.length > 0 ? copyData : Array.from(data);
        let index = Math.floor(Math.random() * copyData.length)
        let item = copyData.splice(index,1);
        item[0].index = data.indexOf(item[0]);
        listSliderImage.add(item[0])
      }
      return Array.from(listSliderImage);
    }

    function drowSlider(breakpoint) {
        slider.classList.add('hidden')
      let arr = createdNewListImagesToSlider(breakpoint);
      setTimeout(() => {
        for (let i = 0; i < petAvatars.length; i++) {
            petAvatars[i].src = arr[i].img;
            petNames[i].textContent = arr[i].name;
            petCards[i].dataset.id = arr[i].index;
          }
          slider.classList.remove('hidden')
      }, 500)
    }
    drowSlider(8)



    /* Pagination */

    let buttonMin = document.querySelector('#min');
    let buttonPrev = document.querySelector('#prev');
    let buttonNext = document.querySelector('#next');
    let buttonMax = document.querySelector('#max');
    let currentPositionElement = document.querySelector('#numberOfASlide');
    let position = 1;

    buttonMin.addEventListener('click', () => {
        position = 1;
        currentPositionElement.textContent = position;
        drowSlider(8);
        buttonMin.classList.add('carousel_control--disabled');
        buttonPrev.classList.add('carousel_control--disabled');
        buttonMax.classList.remove('carousel_control--disabled');
        buttonNext.classList.remove('carousel_control--disabled');
    })

    buttonNext.addEventListener('click', () => {
        if (buttonMin.classList.contains('carousel_control--disabled')) {
            buttonMin.classList.remove('carousel_control--disabled');
            buttonPrev.classList.remove('carousel_control--disabled');
        }
        position += 1;
        if (position == point) {
            buttonNext.classList.add('carousel_control--disabled');
            buttonMax.classList.add('carousel_control--disabled');
        }
        currentPositionElement.textContent = position;
        drowSlider(8);

    })

    buttonPrev.addEventListener('click', () => {
        if (buttonMax.classList.contains('carousel_control--disabled')) {
            buttonMax.classList.remove('carousel_control--disabled');
            buttonNext.classList.remove('carousel_control--disabled');
        }
        position -= 1;
        if (position == 1) {
            buttonMin.classList.add('carousel_control--disabled');
            buttonPrev.classList.add('carousel_control--disabled');
        }
        currentPositionElement.textContent = position;
        drowSlider(8);

    })

    buttonMax.addEventListener('click', () => {
        position = point;
        currentPositionElement.textContent = position;
        drowSlider(8);
        buttonMax.classList.add('carousel_control--disabled');
        buttonNext.classList.add('carousel_control--disabled');
        buttonMin.classList.remove('carousel_control--disabled');
        buttonPrev.classList.remove('carousel_control--disabled');
    })

})