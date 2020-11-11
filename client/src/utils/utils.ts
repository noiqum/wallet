type TypeValidate = {
    valid: boolean;
    msg: string;
};

export const inputValidate = (value: string, name: string): TypeValidate => {
    if (name === 'email') {
        if (value === '') {
            return { valid: false, msg: 'email is required' };
        } else if (value !== '') {
            if (
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value,
                )
            ) {
                return { valid: false, msg: 'invalid email' };
            } else {
                return {
                    valid: true,
                    msg: '',
                };
            }
        } else {
            return {
                valid: true,
                msg: '',
            };
        }
    }
    if (name === 'password') {
        if (value === '') {
            return { valid: false, msg: 'password is required' };
        } else if (value !== '') {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value)) {
                return { valid: false, msg: 'invalid password' };
            } else {
                return { valid: true, msg: '' };
            }
        }
    } if(name ==='userName'){
        if(value ===''){
            return{valid:false,msg:'username is required'}
        }else if( value !== ''){
            if(value.length >= 3){
                return { valid:true,msg:''}
            }else{
                return { valid:false,msg:'min 3 characters long'}
            }
        }
    }
    
    else {
        return {
            valid: true,
            msg: '',
        };
    }
};

export const valueExistanceValidate=(name:string,value:number | string):{field:string,valid:boolean}=>{

    if(name === 'name'|| name === 'date' || name === 'frequency'){
       return  value !== '' || null ? {field:name,valid:true} : {field:name ,valid :false}
    }
    if(name=== 'price'){
        return value > 0 ? {field:name,valid:true} : {field:name,valid:false}
    }
}