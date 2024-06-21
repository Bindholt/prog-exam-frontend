const calculateAge = (birthdayTimestamp:Date) => {
    const birthday = new Date(birthdayTimestamp);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    
    const monthDiff = today.getMonth() - birthday.getMonth();
    const dayDiff = today.getDate() - birthday.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    
    return age;
};

export { calculateAge }

