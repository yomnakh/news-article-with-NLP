// // js files
// import { handleSubmit } from './js/formHandler'
// import { validateUrl } from './js/nameChecker'



//  alert("I EXIST")
// // console.log("CHANGE!!");

import { handleSubmit } from './js/formHandler';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
