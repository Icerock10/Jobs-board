'use client';
import styles from './Listing.module.scss';
import { Input } from '@/_components/FormInput/Input';
import { Select } from '@/_components/Select/Select';
import { experienceLevelOptions, newListingsInputFields, typeOptions } from '@/_utils/mocks/options';
import { TextArea } from '@/_components/TextArea/TextArea';
import React, { useCallback, useEffect } from 'react';
import { FormButton } from '@/_components/Button/FormButton/FormButton';
import { Preview } from '@/_components/ListingPreview/Preview';
import { useRouter } from 'next/navigation';
import { DefaultButton } from '@/_components/Button/DefaultButton/DefaultButton';
import { Modal } from '@/_components/Modal/Modal';
import { useVisibility } from '@/_hooks/useVisibility';
import { IListing } from '@/_utils/types/types';
import { useClientActions } from '@/_hooks/useClientActions';
import { useForm } from 'react-hook-form';

export const Listing = ({ listingFromDb }: { listingFromDb?: IListing }) => {
  const router = useRouter();
  const { isPreviewShown, togglePreview } = useVisibility();
  const { createOrUpdateListing } = useClientActions();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    watch,
    register,
    setValue,
  } = useForm<IListing>({
    defaultValues: {
      type: listingFromDb ? listingFromDb.type : typeOptions[0],
      experienceLevel: listingFromDb ? listingFromDb.experienceLevel : experienceLevelOptions[0],
      ...listingFromDb || '',
      salary: listingFromDb?.salary || 0,
    },
  });
  
  useEffect(() => {
    return () => {
      togglePreview();
    };
  }, [togglePreview]);
  
  const watchListingFields = useCallback(() => watch(), [watch]);
  
  return (
    <React.Fragment>
      <form
        className={styles.form}
        onSubmit={handleSubmit((formData) => createOrUpdateListing(formData, listingFromDb?._id))}
      >
        {newListingsInputFields.map(([labelText, fieldName], index: number) => {
          const isSalaryField = fieldName === 'salary';
          const isUrlField = fieldName === 'url';
          return (
            <div key={index}>
              <Input register={register} name={fieldName} labelText={labelText}
                     type={isSalaryField ? 'number' : 'text'} />
              {isSalaryField && <p className={styles.salary}>In USD</p>}
              {isUrlField && <p className={styles.salary}>Only Valid URL</p>}
            </div>
          );
        })}
        <div>
          <Select isDbField={listingFromDb?.type} setValue={setValue} register={register} options={typeOptions}
                  fieldName='type' />
        </div>
        <div>
          <Select isDbField={listingFromDb?.experienceLevel} setValue={setValue} register={register}
                  options={experienceLevelOptions} fieldName='experienceLevel' />
        </div>
        <TextArea register={register} fieldName='shortDescription' labelText='Short Description' />
        <TextArea register={register} fieldName='fullDescription' labelText='Full Description' />
        <div className={styles.button_group}>
          <DefaultButton handleClick={router.back}>Cancel</DefaultButton>
          <DefaultButton handleClick={togglePreview}>Show Preview</DefaultButton>
          <FormButton isValid={isValid} isSubmitting={isSubmitting}>{listingFromDb ? 'Edit' : 'Submit'}</FormButton>
        </div>
      </form>
      <Modal>
        <Preview listing={watchListingFields()} isModalPreview={true} />
      </Modal>
      {isPreviewShown && <Preview listing={watchListingFields()} />}
    </React.Fragment>
  );
};
