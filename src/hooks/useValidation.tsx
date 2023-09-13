import { useEffect, useState } from 'react';

export const useValidation = (isRegister?: boolean) => {
  const [isValid, setIsValid] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const { email, password, confirm } = fieldStates;
  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldStates(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    if (Boolean(email.length) && Boolean(password.length)) {
      const EMAIL_PATTERN = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = EMAIL_PATTERN.test(email);
      if (!isValidEmail) return setIsValid(false);
      if (isRegister) {
        if (password === confirm) {
          return setIsValid(true);
        }
        return setIsValid(false);
      }
      return setIsValid(true);
    }
    setIsValid(false);
  }, [email, password, confirm, isRegister]);

  return {
    isValid,
    handleFieldChange,
  };
};
