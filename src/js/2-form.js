const email = document.querySelector("input");
email.className = "email";

const message = document.querySelector("textarea");
message.className = "message";

const button = document.querySelector("button")
button.className = "submit"

const feedbackForm = document.querySelector(".js-feedback-form");
let formData = {
    email: '',
    message: '',
};

const fillFormFields = () => {
     try {
        const storedData = localStorage.getItem('feedback-form-state');
        if (!storedData) {
            return;
        }

        const formDataFromLS = JSON.parse(storedData);

        formData = { ...formData, ...formDataFromLS };

        for (const key in formDataFromLS) {
            if (feedbackForm.elements[key]) {
                feedbackForm.elements[key].value = formDataFromLS[key];
            }
        }
    } catch (err) {
        console.log(err);
    }
};

fillFormFields();

const fieldChange = event => {
    const { target: formFieldEl } = event;
    const fieldValue = formFieldEl.value;
    const fieldName = formFieldEl.name;

    if (!fieldName) return;

    formData[fieldName] = fieldValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
        alert("Fill please all fields");
        return;
    }
    console.log(formData)
    
    const { currentTarget: formEl } = event;
    formEl.reset();

    FormData.email = '';
    FormData.message = '';
    
    localStorage.removeItem('feedback-form-state');
};

feedbackForm.addEventListener('input', fieldChange);
feedbackForm.addEventListener('submit', onFormSubmit);