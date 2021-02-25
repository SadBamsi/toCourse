export class Menu {
    constructor(data, func) {
        this.height = '100vh';
        this.width = '250px';
        this.data = data;
        this.func = func;
    }

/*     showMenu(target, target2) {
        target.classList.toggle('opened');
        target2.classList.toggle('opened');
        document.body.classList.toggle('no-scroll');
    }
    closeMenu(target, target2) {
        target.classList.remove('opened')
        target2.classList.remove('opened');
        document.body.classList.remove('no-scroll');

    } */

    init() {
        let fragment = document.createDocumentFragment();
        let menu = document.createElement('div');
        let wrapper = document.createElement('div');
        wrapper.className = 'overlay';
        menu.className= 'menu';

        // button to close/open menu
/*         let menuBtn = document.createElement('button');
        let burger = document.createElement('div');
        burger.className = 'menu_burger';
        menuBtn.className = 'menu_btn';
        menuBtn.addEventListener('click', (target) => this.showMenu(wrapper,menu)); */

        let menuFragment = document.createDocumentFragment();
        let menuList = document.createElement('div');
        menuList.className = 'menu_list';  
        
        for (let item of this.data) {
            let menuItem = document.createElement('button');
            menuItem.textContent = item.theme;
            menuItem.className = menuItem.textContent == 'Main Page' ? 'menu_item menu_item--active' : 'menu_item';
             menuItem.dataset.id = item.theme;
            menuItem.addEventListener('click', () => {
                document.querySelectorAll('.menu_item').forEach((item) => item.classList.remove('menu_item--active'));
                menuItem.classList.add('menu_item--active');
            })
            menuItem.addEventListener('click', this.func);
    
            menuFragment.append(menuItem);
        }


        /* menuBtn.append(burger); */
        menu.append(menuFragment);
        fragment.append(wrapper, menu);
        document.body.append(fragment);
    }
}