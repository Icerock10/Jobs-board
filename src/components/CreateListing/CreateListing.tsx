'use client';
import styles from './CreateListing.module.scss';
import { Input } from '@/components/FormInput/Input';
import { Select } from '@/components/Select/Select';
import { experienceLevelOptions, newListingsInputFields, typeOptions } from '@/utils/mocks/options';
import { TextArea } from '@/components/TextArea/TextArea';
import { useState } from 'react';
export const CreateListing = () => {
  const [fieldValuePairs, setFieldValuePairs] = useState({});
  const handleChange = (field:string, value:string) => {
    const newFieldValuePair = { field, value };
    setFieldValuePairs((prevFieldValues) => ({
      ...prevFieldValues,
      [field]: value,
    }));
  }
  console.log(fieldValuePairs);
  return (
    <form
      className={styles.form}
      action={formData => {
        const { title, type, location, url, company, level, salary,description, short } = Object.fromEntries(formData);
        console.log(title, type, location, url, company, level, salary, description, short);
      }}
    >
      {newListingsInputFields.map(([labelText, fieldName], index: number) => {
        const isSalaryField = fieldName === 'salary';
        return (
          <div key={index}>
            <Input handleChange={handleChange} labelText={labelText} type={isSalaryField ? 'number' : 'text'} name={fieldName} />
            {isSalaryField && <p className={styles.salary}>In USD</p>}
          </div>
        )
      })}
      <div>
        <Select options={typeOptions} name="type" />
      </div>
      <div>
        <Select options={experienceLevelOptions} name="level" />
      </div>
      <TextArea fieldName='shortDescription' labelText='Short Description' />
      <TextArea fieldName='fullDescription' labelText='Full Description' />
      <div>
      <button onClick={e => e.preventDefault()}>Show Preview</button>
      <button type="submit">Submit</button>
    </div>
    </form>
  );
};
