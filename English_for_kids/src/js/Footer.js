export class Footer {
    static init() {
        const fragment = document.createDocumentFragment();
        const footer = document.createElement('footer');
        const container = document.createElement('div');
        const logo = document.createElement('a');
        const yearOfWork = document.createElement('p');
        const linkToAcc = document.createElement('a');

        yearOfWork.textContent = '2020';
        logo.href = 'https://rs.school/js/';
        linkToAcc.href = 'https://github.com/SadBamsi';
        linkToAcc.textContent = 'SadBamsi';


        footer.className = 'footer';
        logo.className = 'footer_logo';
        linkToAcc.className = 'footer_link'
        yearOfWork.className = 'footer_year';
        container.className = 'container';

        container.append(linkToAcc, yearOfWork, logo )
        footer.append(container);
        fragment.append(footer);
        return fragment
    }
}