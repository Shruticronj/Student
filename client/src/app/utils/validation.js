export function isAllAlphabets(value) {
   if (!/^[a-zA-Z]*$/g.test(value)) {
       return true;
   }
   return false ;
}

export function isValidEmail(value) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
        return true;
    }
    return false;
}

export function isValidPassword(value) {
    if(value.length >= 6){
        return true;
    }
    return false;
}

export function isPasswordMatched(newPassword,confirmPassword){
    if(newPassword === confirmPassword){
        return true;   
    }
    return false;
}

export function isEmpty(value){
   if(value.trim()=="")
       return true;
   return false ;
}

export function isLengthInvalid(value, min, max){
	value= value.trim();
	if(value.length<min || value.length>max)
		return true;
	return false;
}

