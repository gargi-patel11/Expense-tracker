
const validateEmail = (email)=>{
    let regex1 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex1.test(email);
};

export {validateEmail};