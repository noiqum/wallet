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

type TypeModalFormData={
    name:string,
    category:string,
    price:number,
    frequency:string,
    date:string
}

export const modalFormValidate=(data:TypeModalFormData):{field:string,msg:string}=>{
    const result={field:'all',msg:'done'}
    if(data.name === ''){
        result.field='name';
        result.msg='name is required'
        return result;
    }else if(data.category === ''){
        result.msg='chose a category';
        result.field='category';
        return result;
    }else if(data.frequency === ''){
        result.field='frequency';
        result.msg='chose a frequency';
        return result;
    }else if(data.date === ''){
        result.msg='date is required';
        result.field='date';
        return result;
    }else if(data.price <= 0 ){
        data.price ===0 ? result.msg='enter a price' : result.msg="price can't be negative";
        result.field='price';
        return result;

    }else{
        return result
    }
    
    
}