'use client';
import styles from './CreateListing.module.scss';
import { Input } from '@/components/FormInput/Input';
import { Select } from '@/components/Select/Select';
import { experienceLevelOptions, newListingsInputFields, typeOptions } from '@/utils/mocks/options';
import { TextArea } from '@/components/TextArea/TextArea';
import React, { useCallback, useEffect } from 'react';
import { fillListings, resetListing } from '@/store/preview/previewSlice';
import { FormButton } from '@/components/Button/FormButton/FormButton';
import { Preview } from '@/components/ListingPreview/Preview';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import { DefaultButton } from '@/components/Button/DefaultButton/DefaultButton';
import { Modal } from '@/components/Modal/Modal';

export const CreateListing = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isStateReset } = useAppSelector(state => state.preview)
  
  useEffect(() => {
    dispatch(resetListing())
    return () => {
      dispatch(resetListing()) // reset on unMount
    }
  }, [dispatch])
  
  const collectListingsData = useCallback((field: string, value: string) => {
    if(!isStateReset) return;
    const newFieldValuePair = { field, value };
    dispatch(fillListings(newFieldValuePair));
  }, [dispatch, isStateReset]);
  
  return (
    <React.Fragment>
      <form
        className={styles.form}
        action={formData => {
          const { title, type, location, url, company, level, salary, description, short } =
            Object.fromEntries(formData);
          console.log(title, type, location, url, company, level, salary, description, short);
        }}
      >
        {newListingsInputFields.map(([labelText, fieldName], index: number) => {
          const isSalaryField = fieldName === 'salary';
          return (
            <div key={index}>
              <Input
                handleChange={collectListingsData}
                labelText={labelText}
                type={isSalaryField ? 'number' : 'text'}
                name={fieldName}
              />
              {isSalaryField && <p className={styles.salary}>In USD</p>}
            </div>
          );
        })}
        <div>
          <Select handleChange={collectListingsData} options={typeOptions} name='type' />
        </div>
        <div>
          <Select handleChange={collectListingsData} options={experienceLevelOptions} name='experienceLevel' />
        </div>
        <TextArea handleChange={collectListingsData} fieldName='shortDescription' labelText='Short Description' />
        <TextArea handleChange={collectListingsData} fieldName='fullDescription' labelText='Full Description' />
        <div className={styles.button_group}>
          <DefaultButton handleClick={router.back}>Cancel</DefaultButton>
          <DefaultButton>Show Preview</DefaultButton>
          <FormButton isValid={true}>Submit</FormButton>
        </div>
      </form>
      <Modal>
        <Preview isModalPreview={true} />
      </Modal>
      <Preview />
    </React.Fragment>
  );
};
