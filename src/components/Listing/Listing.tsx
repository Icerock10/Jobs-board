'use client';
import styles from './Listing.module.scss';
import { Input } from '@/components/FormInput/Input';
import { Select } from '@/components/Select/Select';
import { experienceLevelOptions, newListingsInputFields, typeOptions } from '@/utils/mocks/options';
import { TextArea } from '@/components/TextArea/TextArea';
import React, { useEffect } from 'react';
import { resetListingAndClosePreview } from '@/store/preview/previewSlice';
import { FormButton } from '@/components/Button/FormButton/FormButton';
import { Preview } from '@/components/ListingPreview/Preview';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import { DefaultButton } from '@/components/Button/DefaultButton/DefaultButton';
import { Modal } from '@/components/Modal/Modal';
import { useVisibility } from '@/hooks/useVisibility';
import { IListing } from '@/utils/types/types';
import { useClientActions } from '@/hooks/useClientActions';

export const Listing = ({ listingFromDb }: { listingFromDb?: IListing }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isPreviewShown, togglePreview } = useVisibility();
  const { collectListingsData, createOrUpdateListing } = useClientActions();
   useEffect(() => {
    listingFromDb ? dispatch(resetListingAndClosePreview(listingFromDb)) : dispatch(resetListingAndClosePreview());
    return () => {
      dispatch(resetListingAndClosePreview()); // reset on unMount
    };
  }, [listingFromDb, dispatch]);
  
  return (
    <React.Fragment>
      <form
        className={styles.form}
        action={formData => createOrUpdateListing(formData, listingFromDb?._id)}
      >
        {newListingsInputFields.map(([labelText, fieldName], index: number) => {
          const isSalaryField = fieldName === 'salary';
          const isUrlField = fieldName === 'url';
          return (
            <div key={index}>
              <Input
                handleChange={collectListingsData}
                labelText={labelText}
                type={isSalaryField ? 'number' : 'text'}
                name={fieldName}
                value={listingFromDb ? listingFromDb[fieldName] : ''}
              />
              {isSalaryField && <p className={styles.salary}>In USD</p>}
              {isUrlField && <p className={styles.salary}>Only Valid URL</p>}
            </div>
          );
        })}
        <div>
          <Select listingFromDb={listingFromDb} handleChange={collectListingsData} options={typeOptions} name='type' />
        </div>
        <div>
          <Select listingFromDb={listingFromDb} handleChange={collectListingsData} options={experienceLevelOptions}
                  name='experienceLevel' />
        </div>
        <TextArea listingFromDb={listingFromDb} handleChange={collectListingsData} fieldName='shortDescription'
                  labelText='Short Description' />
        <TextArea listingFromDb={listingFromDb} handleChange={collectListingsData} fieldName='fullDescription'
                  labelText='Full Description' />
        <div className={styles.button_group}>
          <DefaultButton handleClick={router.back}>Cancel</DefaultButton>
          <DefaultButton handleClick={togglePreview}>Show Preview</DefaultButton>
          <FormButton isValid={true}>{listingFromDb ? 'Edit' : 'Submit'}</FormButton>
        </div>
      </form>
      <Modal>
        <Preview isModalPreview={true} />
      </Modal>
      {isPreviewShown && <Preview />}
    </React.Fragment>
  );
};
